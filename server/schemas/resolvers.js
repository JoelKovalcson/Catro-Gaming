const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const { User, ActiveGame, Message } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		users: async () => {
			return User.find()
			.select('-__v -password')
			.populate('friends');
		},
		getGame: async (_, args, context) => {
			if(context.user) {
				const game = await ActiveGame.findById(args.gameId)
				return game
			}
			throw new AuthenticationError('You must be logged in to check for an active game!')
		},
		getProfile: async(_, args, context) => {
			if(context.user) {
				const profile = await User.findById(args.userId);
				return profile;
			}
			throw new AuthenticationError('You must be logged in to search for a users profile!')
		},
		getJoinableGames: async () => {
			// get all games where user isn't already a participant
			const games = await ActiveGame.find(
				{},
				{},
				{}
			)
			// if there are no games throw error
			if(!games){
				throw new ForbiddenError('No joinable games')
			} else {
				// filter through games and find joinable games
				games.filter()
			}
		},
		getAllMessage: async (_, args, context) => {
			// check if user is logged in
			if(context.user) {
				// get list of user's conversations
			const messages = await Message.find(
				// find messages where user is either sender or recipient
				{},
				// include User model and id/ username
				{},
				// is raw = true work in graphql?
				// sort messages in descending order by ID so that most recent is first
				{}
			)
			}
			
		}
		
	},
	Mutation: {
		addUser: async (_, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			return {token, user};
		},
		startGame: async (_, args, context) => {
			// Make sure user is logged in
			if(context.user) {
				console.log('start game');
				// Make a game type of their choosing with that user having the first turn
				const game = await ActiveGame.create({
					gameName: args.gameType,
					turn: 0,
					participants: [context.user._id],
					maxPlayers: (args.maxPlayers ? args.maxPlayers : 1)
				});

				return game;
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		endGame: async (_, args, context) => {
			// Make sure user is logged in
			if(context.user) {
				// Make sure user is in the game
				const game = await ActiveGame.findOneAndUpdate(
					// Filters
					{
						_id: args.gameId,
						participants: context.user._id
					},
					// Update
					{
						isComplete: true
					}
				);
				// If the game exists, score and return the game id
				if(game) {
					// TODO: Insert scoring logic based on the game type here

					const gameState = JSON.parse(game.gameState);
					const user = await User.findOne({_id: context.user._id});
					const scores = user.get('scores');
					
					scores.set({totalGames: scores.totalGames+1});

					switch(game.get('gameName')) {
						case 'tetris':
							const {rowsCleared, score} = gameState;

							const tetris = scores.get('tetris');
							tetris.set({
								rowsCleared: tetris.rowsCleared+rowsCleared,
								bestScore: (tetris.bestScore < score) ? score : tetris.bestScore,
								playedGames: tetris.playedGames + 1
							});
							scores.set({tetris:tetris});

							break;
						default: 
							throw new ForbiddenError('This is an invalid game type (How did this get here?)');
					}
					
					user.set({scores: scores});
					user.save();
					console.log(user);
					
					return game;
				}
				// Else the user wasn't part of that game
				throw new ForbiddenError('You are not part of that game!');
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		login: async (_, args) => {
			const user = await User.findOne({username: args.username});

			if(!user) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const correctPw = await user.isCorrectPassword(args.password);

			if(!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const token = signToken(user);
			return {token, user};
		},
		updateLastLogin: async (_, args, context) => {
			// check to see if user is logged in
			if(!context.user) {
				throw new ForbiddenError('You must be logged in!')
			}
			// find user in db by _id
			let user = await User.findOneAndUpdate(
				{_id: args.user._id},
				// Set lastLogin to now
				{lastLogin: Date.now()},
				// return _ID of user that logged out
				{ new: true }
			)
			return user.get('_id');
		},
		updateGameState: async(_, args, context) => {
			if(context.user) {
				// Get the game
				let game = await ActiveGame.findOne({
					_id: args.gameId
				});
				
				if (!game) {
					throw new ForbiddenError('Game not found');
				}

				// Get turn information
				let participants = game.get('participants');
				let turn = game.get('turn');
				let maxPlayers = game.get('maxPlayers');
				let index = turn % maxPlayers;

				// Throw error if not their turn
				if(!participants[index].equals(context.user._id)) {
					throw new ForbiddenError('It is not your turn!');
				}
				
				// Update game state and turn count
				game.set({
					turn: ++turn,
					gameState: args.gameState
				});

				// Save changes to the database
				await game.save();

				// Return updated game
				return game;
			}
		}
	}
}

module.exports = resolvers;