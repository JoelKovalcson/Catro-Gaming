const { gql } = require('apollo-server-express');
const gameDictionary = require('../config/gameModels');

function generateScoreFields() {
	let fieldStr = '';
	// For every game
	for(let game in gameDictionary) {
		// Register a new field in Score document
		fieldStr += `${game}: ${game.charAt(0).toUpperCase() + game.slice(1)}\n`
	}
	console.log(fieldStr);
	return fieldStr;
}

function generateGameDocuments() {
	let gameStr = '';
	// For every game
	for(let game in gameDictionary) {
		// Setup a game document
		gameStr += `type ${game.charAt(0).toUpperCase() + game.slice(1)} {\n`;
		// For every tracker in that game
		for(let tracker in gameDictionary[game]) {
			// Register a field for that tracker
			// Assumption that all trackers are a number for now
			gameStr += `${tracker}: Int\n`
		}
		gameStr += '}\n'
	}
	console.log(gameStr);
	return gameStr;
}

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		password: String
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
		${generateScoreFields()}
	}

	${generateGameDocuments()}

	type Query {
		users: [User]
	}

	type Mutation {
		addUser(username: String!, password: String!): User
	}
`;

module.exports = typeDefs;