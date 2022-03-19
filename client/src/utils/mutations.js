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
	mutation startGame(gameType: String!){
		startGame(gameType: $gameType){
			activeGame
		}
	}
`