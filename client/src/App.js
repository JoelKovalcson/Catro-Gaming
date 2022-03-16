import React from 'react';
import { Router, Switch } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import SignUp from './pages/SignUp';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import Tetris from './pages/Tetris';

function App() {
  return (
		<Router>
			<Header/>
			<div className=''>
				<Switch>
					<Route exact path="/" component={SignUp}/>
					<Route exact path="/homepage" component={Homepage}/>
					<Route exact path="/profile/:username?" component={Profile}/>
					<Route exact path="/tetris" component={Tetris}/>
					
					<Route component={SignUp}/>
				</Switch>
			</div>
			<Footer/>
		</Router>
  );
}

export default App;