import React from 'react';

const Stats = (props) => {
	return (
		<>
			<div className='flex flex-col border-4 border-double border-pastel-purple m-4 p-2 rounded'>
				<h4 className='self-center text-lg font-semibold'>Tetris</h4>
					<p>Total games played: {props.scores.tetris.playedGames}</p>
					<p>Total rows cleared: {props.scores.tetris.rowsCleared}</p>
					<p>Highscore: {props.scores.tetris.bestScore}</p>
			</div>
			<div className='flex flex-col border-4 border-double border-pastel-purple m-4 p-2 rounded'>
				<h4 className='self-center text-lg font-semibold'>Yahtzee</h4>
						<p>Total games played: {props.scores.yahtzee.playedGames}</p>
						<p>Highscore: {props.scores.yahtzee.bestScore}</p>
			</div>
		</>
	)
}

export default Stats;