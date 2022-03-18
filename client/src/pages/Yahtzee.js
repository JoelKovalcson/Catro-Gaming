import React from 'react';
import Lowerscore from '../components/game/yahtzee/Lowerscore';
import Upperscore from '../components/game/yahtzee/Upperscore';
import Dice from '../components/game/yahtzee/Dice';

const Yahtzee = () => {
	return (
		<>
			<div className='flex justify-around'>
				<Upperscore/>
				<Lowerscore/>
				<Dice/>
			</div>
		</>
	)
}

export default Yahtzee;