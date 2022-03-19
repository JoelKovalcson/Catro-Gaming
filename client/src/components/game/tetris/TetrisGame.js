import { useMutation } from '@apollo/client';
import React, {useEffect, useRef} from 'react';
import { GQL_END_GAME, GQL_START_GAME, GQL_UPDATE_GAME_STATE } from '../../../utils/mutations';
import { MOVE_LEFT, MOVE_DOWN, MOVE_RIGHT, ROTATE_CCW, ROTATE_CW, START_GAME, END_GAME } from '../../../utils/tetris/actions';
import { tetrisConfig } from '../../../utils/tetris/tetrisHelpers';
import { useTetrisContext } from '../../../utils/tetris/TetrisState';
import Grid from '../Grid';
import Score from '../Score';

const TetrisGame = () => {
	// Use the game's context
	const [gameState, dispatch] = useTetrisContext();
	// Variables to store information that does not cause render updates
	const renderBoardTick = useRef();
	const curTimeRef = useRef(0);
	const prevTimeRef = useRef(0);

	const [startGame] = useMutation(GQL_START_GAME);
	const [endGame] = useMutation(GQL_END_GAME);
	const [updateGame] = useMutation(GQL_UPDATE_GAME_STATE);
	
	// Sets the game to start if it's not started, and end the game if it was running
	const toggleRunning =  () => {
		if(gameState.isRunning) {
			dispatch({type: END_GAME});
			updateGame({
				variables: {
					gameId: gameState.gameId,
					gameState: JSON.stringify(gameState)
				}
			})
			.then(response => {
				console.log(response);
				endGame({
					variables: {
						gameId: gameState.gameId
					}
				})
				.then(response => {
					console.log(response);
					// Tell the user their stats were saved
				})
				.catch(err => {
					// Do something if there's an error
					console.log(err);
				})
			})
			.catch(err => {
				// Do something if there's an error
				console.log(err);
			})
			
			
		} else {
			startGame({
				variables: {
					gameType: 'tetris'
				}
			})
				.then(response => {
					dispatch({type: START_GAME, gameId: response.data.startGame._id});
				})
				.catch(error => {
					// Do something to the page if there's an error starting a game
				});
		}
	}

	// Overlay the block on the grid
	const gameBoard = gameState.board.map((rowArr, row) => {
		return rowArr.map((block, col) => {
			// Get possible index into shape array
			const shapeX = col - gameState.x;
			const shapeY = row - gameState.y;
			// Check if the shape is drawn at this location, if so replace the empty string with the block's string
			if(shapeX >= 0 && shapeX < tetrisConfig.nextBlock.cols && shapeY >= 0 && shapeY < tetrisConfig.nextBlock.rows) {
				return (gameState.shape[gameState.rotation][shapeY][shapeX]) ? gameState.shape[gameState.rotation][shapeY][shapeX] : block;
			}
			// Else return the default grid
			else return block;
		});
	});

	// Game tick processing
	const gameTick = (time) => {
		// Setup next render tick call
		renderBoardTick.current = requestAnimationFrame(gameTick);
		// If the game isn't running or is over, do nothing
		if (!gameState.isRunning || gameState.gameOver) {
			return;
		}
		// If there is no previous time yet, set it to current time
		if (!prevTimeRef.current) {
			prevTimeRef.current = time;
		}
		// Get difference between now and previous time by summing up differences
		curTimeRef.current += time - prevTimeRef.current;
		// If that time exceeds the game update speed (default 1000ms)
		if(curTimeRef.current > gameState.speed) {
			// Move the block down
			dispatch({type: MOVE_DOWN});
			// Reset timer
			curTimeRef.current = 0;
		}
		// Set prev time to cur time
		prevTimeRef.current = time;
	}

	// Register the game tick
	useEffect(() => {
		renderBoardTick.current = requestAnimationFrame(gameTick);
		return () => cancelAnimationFrame(renderBoardTick.current);
	}, [gameState.isRunning]);

	return (
		<div className='flex flex-wrap justify-around w-3/4 md:w-4/5 lg:w-3/5'>
			<div>
				<Grid gridPadding={'mr-1'} gridInfo={gameBoard} name={'Tetris'} rows={tetrisConfig.grid.rows} cols={tetrisConfig.grid.cols} classInfo={'h-4 w-4 sm:h-6 sm:w-6 ml-1 mt-1'}/>
				<div className='w-full mt-3'>
					<div className='grid justify-center text-center text-4xl'>
						<div>
							<button disabled={gameState.gameOver} onClick={toggleRunning} className='bg-dark-blue rounded-lg mb-4 text-2xl w-full'>
								{
									(gameState.gameOver) ? ('Game Over') : (gameState.isRunning ? 'End Game' : 'Start Game' )
								}
							</button>
						</div>
						<div className='mb-3'>
							<button onClick={() => dispatch({type: ROTATE_CCW})} className='bg-dark-blue rounded-lg w-12 px-1 mr-2'>
								↺
							</button>
							<button onClick={() => dispatch({type: ROTATE_CW})} className='bg-dark-blue rounded-lg w-12 px-1 ml-2'>
								↻
							</button>
						</div>
						<div>
							<button onClick={() => dispatch({type: MOVE_LEFT})} className='bg-dark-blue rounded-lg w-12 px-1 mr-2'>
								⇦
							</button>
							<button onClick={() => dispatch({type: MOVE_DOWN})} className='bg-dark-blue rounded-lg w-12 px-1 mr-2'>
								⇩
							</button>
							<button onClick={() => dispatch({type: MOVE_RIGHT})} className='bg-dark-blue rounded-lg w-12 px-1'>
								⇨
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='grid content-center text-center'>
				<Score score={gameState.score} rowsCleared={gameState.rowsCleared} gameType={'tetris'}/>
				<span className='mt-2 sm:mt-16'>Next Block</span>
				<Grid gridInfo={gameState.nextShape[gameState.nextRotation]} name={'NextBlock'} rows={tetrisConfig.nextBlock.rows} cols={tetrisConfig.nextBlock.cols} classInfo={'h-4 w-4 sm:h-6 sm:w-6 ml-1 mt-1'}/>
			</div>
		</div>
	)
}

export default TetrisGame;