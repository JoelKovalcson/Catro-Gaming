const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/USer');


const resolvers = {
	Query: {
		users: async () => {
			return User.find()
			.select('-__v -password')
			.populate('friends');
		}
	}
}

module.exports = resolvers;