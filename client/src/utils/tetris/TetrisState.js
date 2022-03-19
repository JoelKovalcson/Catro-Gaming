import React, {createContext, useContext} from 'react';
import { useTetrisReducer } from './reducers';
import { defaultBoard, randomBlock, tetrisConfig } from './tetrisHelpers';

const TetrisContext = createContext();
const {Provider} = TetrisContext;

const TetrisProvider = ({ value = [], ...props}) => {
	const [shape, rotation] = randomBlock();
	const [nextShape, nextRotation] = randomBlock();
	const [gameState, dispatch] = useTetrisReducer({
		score: 0, 
		board: defaultBoard(), 
		shape: shape, 
		rotation: rotation, 
		x: Math.floor(tetrisConfig.grid.cols/2) - Math.floor(tetrisConfig.nextBlock.cols/2), 
		y: -4, 
		nextShape: nextShape, 
		nextRotation: nextRotation,
		isRunning: false,
		gameOver: false,
		speed: 1000,
		rowsCleared: 0,
		gameId: null
	});

	return <Provider value={[gameState, dispatch]} {...props}/>;
}

const useTetrisContext = () => {
	return useContext(TetrisContext);
}

export {TetrisProvider, useTetrisContext};