import React from 'react';
import { MOVE_LEFT, MOVE_DOWN, MOVE_RIGHT, ROTATE_CCW, ROTATE_CW, START_GAME, END_GAME } from '../../../utils/tetris/actions';
import { tetrisConfig } from '../../../utils/tetris/tetrisHelpers';
import { useTetrisContext } from '../../../utils/tetris/TetrisState';
import Grid from '../Grid';
import Score from '../Score';

const TetrisGame = () => {
	// Use the game's context
	const [gameState, dispatch] = useTetrisContext();
	
	const toggleRunning = () => {
		if(gameState.isRunning) {
			dispatch({type: END_GAME});
		} else {
			dispatch({type: START_GAME});
		}
	}

	// gameBoard has the existing board overlayed with the current falling shape
	const gameBoard = gameState.board.map((colArr, col) => {
		return colArr.map((block, row) => {
			// Get possible index into shape array
			const shapeX = col - gameState.x;
			const shapeY = row - gameState.y;
			// Check if the shape is drawn at this location, if so replace the empty string with the block's string
			if(shapeX >= 0 && shapeX < tetrisConfig.nextBlock.cols && shapeY >= 0 && shapeY < tetrisConfig.nextBlock.rows) {
				return (gameState.shape[gameState.rotation][shapeX][shapeY]) ? gameState.shape[gameState.rotation][shapeX][shapeY] : '';
			}
			// Else return the default grid
			else return block;
		});
	});

	return (
		<div className='flex flex-wrap justify-around w-3/4 md:w-4/5 lg:w-3/5'>
			<div>
				<Grid gridPadding={'mr-1'} gridInfo={gameBoard} name={'Tetris'} rows={tetrisConfig.grid.rows} cols={tetrisConfig.grid.cols} classInfo={'h-4 w-4 sm:h-6 sm:w-6 ml-1 mt-1'}/>
				<div className='w-full mt-3'>
					<div className='grid justify-center text-center text-4xl'>
						<div>
							<button onClick={toggleRunning} className='bg-slate-300 rounded-lg mb-4 text-2xl w-full'>{(gameState.isRunning) ? 'End Game' : 'Start Game'}</button>
						</div>
						<div className='mb-3'>
							<button onClick={() => dispatch({type: ROTATE_CCW})} className='bg-slate-300 rounded-lg w-12 px-1 mr-2'>
								↺
							</button>
							<button onClick={() => dispatch({type: ROTATE_CW})} className='bg-slate-300 rounded-lg w-12 px-1 ml-2'>
								↻
							</button>
						</div>
						<div>
							<button onClick={() => dispatch({type: MOVE_LEFT})} className='bg-slate-300 rounded-lg w-12 px-1 mr-2'>
								⇦
							</button>
							<button onClick={() => dispatch({type: MOVE_DOWN})} className='bg-slate-300 rounded-lg w-12 px-1 mr-2'>
								⇩
							</button>
							<button onClick={() => dispatch({type: MOVE_RIGHT})} className='bg-slate-300 rounded-lg w-12 px-1'>
								⇨
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='grid content-center text-center'>
				<Score score={gameState.score}/>
				<span className='mt-2 sm:mt-16'>Next Block</span>
				<Grid gridInfo={gameState.nextShape[gameState.nextRotation]} name={'NextBlock'} rows={tetrisConfig.nextBlock.rows} cols={tetrisConfig.nextBlock.cols} classInfo={'h-4 w-4 sm:h-6 sm:w-6 ml-1 mt-1'}/>
			</div>
		</div>
	)
}

export default TetrisGame;