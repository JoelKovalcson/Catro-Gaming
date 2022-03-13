const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		createdAt: String
		lastLogin: String
		friends: [User]
		activeGames: [ActiveGame]
		scores: Score
	}

	type ActiveGame {
		_id: ID
		gameName: String
		turn: [User]
		participants: [User]
		isComplete: Boolean
		scores: [Int]
		gameState: String
	}

	type Score {
		totalGame: Int
		${}
	}

	${}

	type Query {
		users: [User]
	}
`;

module.exports = typeDefs;