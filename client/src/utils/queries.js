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

export const GQL_GET_GAME_DETAILS = gql`
  query getGame($gameId: ID!) {
    getGame(gameId: $gameId) {
			_id
			turn
      participants {
        username
				_id
      }
			isComplete
			scores
			gameState
			maxPlayers
    }
  }
`;

export const GQL_GET_PROFILE = gql`
  query getProfile($username: String!) {
    getProfile(username: $username) {
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
				yahtzee {
					playedGames
					bestScore
				}
			}
    }
  }
`;

export const GQL_GET_JOINABLE_GAMES = gql`
  query getJoinableGames{
		getJoinableGames{
			_id
			maxPlayers
			gameName
			participants {
				username
			}
		}
  }
`;

export const GQL_GET_ACTIVE_GAMES = gql`
	query getActiveGames {
		getActiveGames {
			gameName
			_id
			maxPlayers
			participants {
				username
			}
			turn
		}
	}
`;