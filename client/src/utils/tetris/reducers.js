import { useReducer } from "react";
import { 
	MOVE_LEFT,
	MOVE_RIGHT,
	MOVE_DOWN,
	ROTATE_CW,
	ROTATE_CCW,
	START_GAME,
	END_GAME
} from "./actions";
import {
	canMove, mergeBlock, randomBlock, tetrisConfig, scoreBoard
} from "./tetrisHelpers";


export const reducer = (state, action) => {
	const {
		board,
		shape,
		rotation,
		x,
		y,
		gameOver,
		isRunning,
		nextShape,
		nextRotation,
		score,
		rowsCleared
	} = state;

	switch(action.type) {
		case MOVE_LEFT:
			// If the game isn't running or it's game over, don't let the controls work
			if (!isRunning || gameOver) return state;
			// Check if you can move left
			if ( canMove(board, shape, rotation, x-1, y) ) {
				return {
					...state,
					x: x - 1
				};
			}
			return state;
		case MOVE_RIGHT:
			if (!isRunning || gameOver) return state;
			// Check if you can move right
			if ( canMove(board, shape, rotation, x+1, y) ) {
				return {
					...state,
					x: x + 1
				};
			}
			return state;
		case MOVE_DOWN:
			if (!isRunning || gameOver) return state;
			// Check if you can move down
			if ( canMove(board, shape, rotation, x, y+1) ) {
					return {
					...state,
					y: y + 1
				};
			}
			
			// Merge the block since you can't move it down
			if(mergeBlock(board, shape, rotation, x, y)) {
				return {
					...state,
					gameOver: true
				}
			}

			// Get a new random shape
			const [newShape, newRotation] = randomBlock();

			const [points, newBoard, rowCount] = scoreBoard(board);

			return {
				...state,
				// If the user scored, there is a new board and an amount of points to add to score
				score: (points) ? points + score : score,
				board: (newBoard) ? newBoard : board,
				// Set cur shape to next shape
				shape: nextShape,
				rotation: nextRotation,
				// Reset x and y
				x: Math.floor(tetrisConfig.grid.cols/2) - Math.floor(tetrisConfig.nextBlock.cols/2),
				y: -4,
				// Set next shape to the new shape
				nextShape: newShape,
				nextRotation: newRotation,
				rowsCleared: rowsCleared + rowCount
			};
		case ROTATE_CW:
			if (!isRunning || gameOver) return state;
			// Check if you can rotate cw
			if ( canMove(board, shape, (rotation+1) % shape.length, x, y) ) {
				return {
					...state,
					rotation: (rotation+1) % shape.length
				};
			}
			return state;
		case ROTATE_CCW:
			if (!isRunning || gameOver) return state;
			// Check if you can rotate ccw
			if ( canMove(board, shape, ((rotation-1 < 0) ? shape.length-1 : rotation-1), x, y )) {
					return {
					...state,
					rotation: (rotation-1 < 0) ? shape.length-1 : rotation-1
				};
			}
			return state;
		case START_GAME:
			return {
				...state,
				isRunning: true,
				gameId: action.gameId
			};
		case END_GAME:
			return {
				...state,
				isRunning: false,
				gameOver: true
			};
		default: 
			return state;
	}
}

export function useTetrisReducer(initialState) {
	return useReducer(reducer, initialState);
}