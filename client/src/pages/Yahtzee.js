import React from 'react';
import Lowerscore from '../components/game/yahtzee/Lowerscore';
import Rolldice from '../components/game/yahtzee/Rolldice';
import Upperscore from '../components/game/yahtzee/Upperscore';

const Yahtzee = () => {
	return (
		<>
			<div className='flex flex-wrap justify-evenly'>
				<Upperscore/>
				<Lowerscore/>
				<div className='flex flex-row sm:flex-row md:flex-col lg:flex-col justify-center m-4'>
					<Rolldice/>
					<Rolldice/>
					<Rolldice/>
					<Rolldice/>
					<Rolldice/>
					<Rolldice/>
				</div>	
			</div>
			<div className='flex justify-center'>
				<button className='w-1/4 h-12 m-4 rounded bg-pastel-purple text-black'>Roll Dice</button>	
			</div>
		</>
	)
}

export default Yahtzee;