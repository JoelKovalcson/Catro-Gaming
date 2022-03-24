import React from 'react';
// import apollo
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route, Redirect, Routes} from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';


import Footer from './components/Footer';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Tetris from './pages/Tetris';
import Singleplayer from './pages/Singleplayer';
import Multiplayer from './pages/Multiplayer';
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
				<div className='grid content-between h-screen'>
					<div>
						<Header/>
					</div>
					<div>
						<Routes>
							<Route path="/" element={<SignUp/>}/>
							<Route path="/homepage" element={<Homepage/>}/>
							<Route path="/profile" element={<Profile/>}>
								<Route path=":username" element={<Profile/>}/>
							</Route>
							<Route path="/tetris" element={<Tetris/>}/>
							<Route path="/singleplayer" element={<Singleplayer/>}/>
							<Route path="/multiplayer" element={<Multiplayer/>}/>
							<Route path="/yahtzee" element={<Yahtzee/>}/>
							<Route path="/*" element={<Homepage/>}/>
						</Routes>
					</div>
					<div>
						<Footer/>
					</div>
				</div>
			</Router>
		</ApolloProvider>
  );
}

export default App;