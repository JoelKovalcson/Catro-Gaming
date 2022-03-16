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
	canMove, getNextRotation
} from "./tetrisHelpers";


export const reducer = (state, action) => {
	const {
		board,
		shape,
		rotation,
		x,
		y
	} = state;
	switch(action.type) {
		case MOVE_LEFT:
			// Check if you can move left
			if ( canMove() ) {
				return {
					...state,
					x: x - 1
				};
			}
		case MOVE_RIGHT:
			// Check if you can move right
			if ( canMove() ) {
				return {
					...state,
					x: x + 1
				};
			}
		case MOVE_DOWN:
			// Check if you can move down
			if ( canMove() ) {
					return {
					...state,
					y: y + 1
				};
			}
		case ROTATE_CW:
			// Check if you can rotate
			if ( canMove() ) {
				return {
					...state,
					rotation: (rotation+1) % shape.length
				};
			}
		case ROTATE_CCW:
			// Get the next rotation

			// Check if you can rotate
			if ( canMove() ) {
					return {
					...state,
					rotation: (rotation-1 < 0) ? shape.length-1 : rotation-1
				};
			}
		case START_GAME:
			return {
				...state,
				isRunning: true
			};
		case END_GAME:
			return {
				...state,
				isRunning: false
			};
		default: 
			return state;
	}
}

export function useTetrisReducer(initialState) {
	return useReducer(reducer, initialState);
}