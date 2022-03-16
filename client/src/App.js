import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Tetris from './pages/Tetris';

function App() {
  return (
		<Router>
			<Header/>
			<Switch>
				<Redirect from="/" to="/login" exact/>
				<Route exact path="/login" component={SignUp}/>
				<Route exact path="/homepage" component={Homepage}/>
				<Route exact path="/profile/:username?" component={Profile}/>
				<Route exact path="/tetris" component={Tetris}/>

				<Route component={Homepage}/>
			</Switch>
			<Footer/>
		</Router>
  );
}

export default App;