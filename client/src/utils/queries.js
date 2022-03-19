import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
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

export const GET_GAME = gql`
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

export const GET_PROFILE = gql`
  query getProfile($user: ID!) {
    getProfile(user: $user) {
      Username
			_id
      friends {
        User {
          username
					_id
        }
      }
      activeGames {
        ActiveGame {
          gameName
        }
      }
      scores
    }
  }
`;

export const GET_JOINABLE_GAMES = gql`
  {
    gameName
    participants {
      User {
        username
      }
    }
  }
`;
