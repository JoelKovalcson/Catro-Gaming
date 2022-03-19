import React from 'react';

const Score = (props) => {

	return(
		<>
			<div className='text-xl'>
				Score: {props.score}
				{ // If there are any rows cleared (we are playing tetris), render a new line showing the count
				(props.gameType === 'tetris') ? (
					<>
						<br/> Rows Cleared: {props.rowsCleared}
					</>
				): ''}
			</div>
		</>
	);
}

export default Score;