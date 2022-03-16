import React from 'react';

const Score = (props) => {
	return(
		<>
			<div className='text-xl'>
				Score: {props.score}
			</div>
		</>
	);
}

export default Score;