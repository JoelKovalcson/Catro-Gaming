import React from 'react';

const Stats = (props) => {
	return (
		<>
			<div className='flex flex-col border-4 border-double border-pastel-purple m-4 p-2 rounded'>
				<h4 className='self-center text-lg font-semibold'>Tetris</h4>
					<p>Total games played:{props.tetrisgames}</p>
					<p>Total rows cleared:{props.tetrisrows}</p>
					<p>Highscore:{props.tetrishighscore}</p>
			</div>
			<div className='flex flex-col border-4 border-double border-pastel-purple m-4 p-2 rounded'>
				<h4 className='self-center text-lg font-semibold'>Yahtzee</h4>
						<p>Total games played: 1</p>
						<p>Highscore: 100</p>
			</div>
		</>
	)
}

export default Stats;