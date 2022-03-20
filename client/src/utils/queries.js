import { gql } from "@apollo/client";

export const GQL_QUERY_USERS = gql`
  {
    username
    friends {
      username
    }
    activeGames {
      ActiveGame {
        gameName
        participants {
          User {
            username
          }
        }
      }
    }
  }
`;
// could add more to this ^

export const GQL_GET_GAME = gql`
  query getGame($gameId: ID!) {
    getGame(gameId: $gameId) {
      _id
			gameName
      participants {
        username
      }
    }
  }
`;

export const GQL_GET_PROFILE = gql`
  query getProfile($userId: ID!) {
    getProfile(userId: $userId) {
      username
			_id
      friends {
        _id
				username
      }
      activeGames {
        _id
				gameName
				isComplete
      }
      scores {
				totalGames
				tetris {
					playedGames
					rowsCleared
					bestScore
				}
			}
    }
  }
`;

export const GQL_GET_JOINABLE_GAMES = gql`
  {
    gameName
    participants {
      User {
        username
      }
    }
  }
`;

export const GET_MESSAGES = gql`
	subscription{
		messages {
			_id
			username
			text
		}
	}
`