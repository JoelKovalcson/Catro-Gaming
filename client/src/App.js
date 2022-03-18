import React from 'react';
// import apollo
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';


import Footer from './components/Footer';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Tetris from './pages/Tetris';
import Singleplayer from './components/Singleplayer';
import Multiplayer from './components/Multiplayer';
import Yahtzee from './pages/Yahtzee';

const httpLink = createHttpLink({
	uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		}
	}
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
  return (
		<ApolloProvider client={client}>
			<Router>
				<Header/>
				<Switch>
					<Redirect from="/" to="/login" exact/>
					<Route exact path="/login" component={SignUp}/>
					<Route exact path="/homepage" component={Homepage}/>
					<Route exact path="/profile/:username?" component={Profile}/>
					<Route exact path="/tetris" component={Tetris}/>
					<Route exact path="/singleplayer" component={Singleplayer}/>
					<Route exact path="/multiplayer" component={Multiplayer}/>
					<Route exact path="/yahtzee" component={Yahtzee}/>

					<Route component={Homepage}/>
				</Switch>
				<Footer/>
			</Router>
		</ApolloProvider>
  );
}

export default App;