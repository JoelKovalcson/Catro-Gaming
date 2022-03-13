const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/USer');


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
			return {user};
		}
	}
}

module.exports = resolvers;