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
				const game = await ActiveGame.findById(args.gameId).populate('participants').select('-__v -password');
				return game;
			}
			throw new AuthenticationError('You must be logged in to check for an active game!')
		},
		getProfile: async(_, args, context) => {
			if(context.user) {
				const profile = await User.findOne({username:args.username}).select('-password -__v');
				return profile;
			}
			throw new AuthenticationError('You must be logged in to search for a users profile!')
		},
		getJoinableGames: async (_, __, context) => {
			// get all games where user isn't already a participant
			let games = await ActiveGame.find(
				{
					isComplete: false,
					// Doesn't work with free atlas
					//$where: "this.participants.length<this.maxPlayers",
					participants: {
						$nin: [context.user._id]
					},
					maxPlayers: {
						$not: {
							$eq: 1
						}
					}
				}
			).populate('participants', '-password -__v');
			// Doing this instead of where clause
			games = games.filter((game) => {
				if (game.participants.length < game.maxPlayers) return true;
				else return false;
			})
			// if there are no games give an empty array
			if(!games){
				return [];
			} 

			return games;
			
		},
		getActiveGames: async(_, __, context) => {
			const games = await ActiveGame.find(
				{
					isComplete: false,
					participants: context.user._id
				}
			).populate('participants', '-password -__v');
			if (!games) {
				return [];
			}
			return games;
		}
	},
	Mutation: {
		addUser: async (_, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			return {token, user};
		},
		joinGame: async (_, args, context) => {
			if(context.user) {

				let game = await ActiveGame.findOne({
					_id: args.gameId,
					participants: {
						$nin: [context.user._id]
					},
					isComplete: false
				}).populate('participants', '-password -__v');
				
				if (game.participants.length >= game.maxPlayers) game = null;
				else {
					const participants = game.participants;
					const scores = game.scores;
					participants.push(context.user._id);
					scores.push(0);
					game.set({
						participants: participants,
						scores: scores
					});
					game.save();
				}
				
				if(!game) {
					throw new ForbiddenError('Game is full or you are already in it!');
				}
				return game;
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		startGame: async (_, args, context) => {
			// Make sure user is logged in
			if(context.user) {
				// Make a game type of their choosing with that user having the first turn
				const game = await ActiveGame.create({
					gameName: args.gameType,
					turn: 0,
					participants: [context.user._id],
					maxPlayers: (args.maxPlayers ? args.maxPlayers : 1),
					$push: {scores: 0}
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
						participants: context.user._id,
						isComplete: false
					},
					// Update
					{
						isComplete: true
					}
				);
				// If the game exists, score and return the game id
				if(game) {
					// TODO: SET ARRAY OF USERS FROM PARTICIPANTS AND GET THEIR SCORES

					const gameState = JSON.parse(game.gameState);
					const user = await User.findOne({_id: context.user._id});
					const scores = user.get('scores');
					
					scores.set({totalGames: scores.totalGames+1});

					switch(game.get('gameName')) {
						case 'tetris':
							let {rowsCleared, score, level} = gameState;

							const tetris = scores.get('tetris');
							tetris.set({
								rowsCleared: tetris.rowsCleared+rowsCleared,
								bestScore: (tetris.bestScore < score) ? score : tetris.bestScore,
								playedGames: tetris.playedGames + 1,
								highestLevel: (tetris.highestLevel < level) ? level : tetris.highestLevel
							});
							scores.set({tetris:tetris});

							break;
						case 'yahtzee':
							const {players} = gameState;
							const player = players.find(player => player.name === user.username);
							const yahtzee = scores.get('yahtzee');

							yahtzee.set({
								bestScore: yahtzee.bestScore < player.score ? player.score : yahtzee.bestScore,
								playedGames: yahtzee.playedGames + 1
							});
							scores.set({yahtzee: yahtzee});

							break;
						default: 
							throw new ForbiddenError('This is an invalid game type (How did this get here?)');
					}
					
					user.set({scores: scores});
					user.save();
					
					return game;
				}
				// Else the user wasn't part of that game or it is over
				throw new ForbiddenError('You are not part of that game or the game is over!');
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
				
				// Set score if score passed in
				if (args.score) {
					let scores = game.get('scores');
					scores[index] = args.score;
					game.set({
						scores: scores
					});
				}

				if (args.nextTurn) {
					game.set({
						turn: ++turn
					});
				}

				// Update game state and turn count
				game.set({
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