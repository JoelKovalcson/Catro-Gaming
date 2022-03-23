import { gql } from '@apollo/client';

export const GQL_LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
			user {
				_id
			}
		}
	}
`;

export const GQL_UPDATE_LAST_LOGIN = gql`
	mutation updateLastLogin($userId: ID!){
		updateLastLogin(userId: $userId){
			token
			user {
				_id
			}
		}
	}
`;

export const GQL_ADD_USER = gql`
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

export const GQL_START_GAME = gql`
	mutation startGame($gameType: String!, $maxPlayers: Int){
		startGame(gameType: $gameType, maxPlayers: $maxPlayers){
			_id
		}
	}
`;

export const GQL_END_GAME = gql`
	mutation endGame($gameId: ID!){
		endGame(gameId: $gameId) {
			_id
		}
	}
`;

export const GQL_UPDATE_GAME_STATE = gql`
	mutation updateGameState($gameId: ID!, $gameState: String!, $nextTurn: Boolean, $score: Int){
		updateGameState(gameId: $gameId, gameState: $gameState, nextTurn: $nextTurn, score: $score){
			_id
		}
	}
`;

export const GQL_JOIN_GAME = gql`
	mutation joinGame($gameId: ID!) {
		joinGame(gameId: $gameId) {
			_id
		}
	}
`;