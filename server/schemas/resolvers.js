const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const { User, ActiveGame } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		users: async () => {
			return User.find()
			.select('-__v -password')
			.populate('friends');
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
				// Make a game type of their choosing with that user having the first turn
				const game = await ActiveGame.create({
					gameName: args.gameType,
					turn: context.user._id,
					$push: { participants: context.user._id }
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
					switch(game.gameName) {
						case 'tetris':

							break;
						default: 
							throw new ForbiddenError('This is an invalid game type (How did this get here?)');
					}

					return game._id;
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

			const correctPw = await user.isCorrectPassword(password);

			if(!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const token = signToken(user);
			return {token, user};
		}
	}
}

module.exports = resolvers;