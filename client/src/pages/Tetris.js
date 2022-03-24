import React from 'react';
import '../utils/tetris/tetris.css';
import { TetrisProvider } from '../utils/tetris/TetrisState';
import TetrisGame from '../components/game/tetris/TetrisGame';
import Auth from '../utils/auth';

const Tetris = () => {
	
	// Wrap the game in a provider to maintain global state for the game
	if(!Auth.loggedIn()) {
		window.location.assign('/');
		return <></>
	}
	return (
		<>
			<TetrisProvider>
				<div className='flex flex-wrap justify-center py-12'>
					<TetrisGame/>
				</div>
			</TetrisProvider>
		</>
	)
}

export default Tetris;