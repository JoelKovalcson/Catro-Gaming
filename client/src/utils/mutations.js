import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
			user {
				_id
			}
		}
	}
`;

export const UPDATE_LAST_LOGIN = gql`
	mutation updateLastLogin($userId: ID!){
		updateLastLogin(userId: $userId){
			token
			user {
				_id
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $password: String!) {
		addUser(username: $username, password: $password)
		{
			token
			user {
				_id
				username
			}
		}
	}
`;

export const START_GAME = gql`
	mutation startGame($gameType: String!){
		startGame(gameType: $gameType){
			ActiveGame {
				_id
				gameName
			}
		}
	}
`;

export const END_GAME = gql`
	mutation endGame($gameType: String!){
		endGame(gameType: $gameType){
			ActiveGame {
				_id
				gameName
			}
		}
	}
`;

export const UPDATE_GAME_STATE = gql`
	mutation updateGameState($gameId: ID!, $gameState: String!){
		updateGameState(gameId: $gameId, gameState: $gameState){
			ActiveGame {
				_id
				gameName
				gameState
			}
		}
	}
`;

