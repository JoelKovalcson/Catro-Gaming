import {randomBlock, tetrisConfig, defaultBoard} from '../utils/tetris/tetrisHelpers';
import React, {useState} from 'react';
import Grid from '../components/Grid';
import Score from '../components/Score';
import '../utils/tetris/tetris.css';


const Tetris = () => {
	const [gameState, setGameState] = useState({
		score: 0, 
		board: defaultBoard(), 
		shape: null, 
		rotation: 0, 
		x: tetrisConfig.cols/2, 
		y: -4, 
		nextShape: randomBlock(), 
		isRunning: false, 
		// speed: 1000, To implement later
		gameOver: false
	});

	console.log(gameState);

	return (
		<>
			<div className='flex flex-wrap justify-center'>
				<div className='flex flex-wrap justify-around w-3/4 md:w-4/5 lg:w-3/5'>
					<div>
						<Grid gridPadding={'mr-1'} gridInfo={gameState.board} name={'Tetris'} rows={tetrisConfig.grid.rows} cols={tetrisConfig.grid.cols} classInfo={'h-4 w-4 sm:h-6 sm:w-6 ml-1 mt-1'}/>
						<div className='w-full mt-5'>
							<div className='grid justify-center text-center text-3xl'>
								<div className='mb-1'>
									<button className='bg-slate-300 rounded-lg w-10 px-1 mr-1'>
										↺
									</button>
									<button className='bg-slate-300 rounded-lg w-10 px-1 ml-1'>
										↻
									</button>
								</div>
								<div>
									<button className='bg-slate-300 rounded-lg w-10 px-1 mr-1'>
										⇦
									</button>
									<button className='bg-slate-300 rounded-lg w-10 px-1 mr-1'>
										⇩
									</button>
									<button className='bg-slate-300 rounded-lg w-10 px-1'>
										⇨
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className='grid content-center text-center'>
						<Score score={gameState.score}/>
						<span className='mt-2 sm:mt-16'>Next Block</span>
						<Grid gridInfo={gameState.nextShape} name={'NextBlock'} rows={tetrisConfig.nextBlock.rows} cols={tetrisConfig.nextBlock.cols} classInfo={'h-4 w-4 sm:h-6 sm:w-6 ml-1 mt-1'}/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Tetris;