import React from 'react';
import Lowerscore from '../components/game/yahtzee/Lowerscore';
import Rolldice from '../components/game/yahtzee/Rolldice';
import Upperscore from '../components/game/yahtzee/Upperscore';

const Yahtzee = () => {
	return (
		<>
			<div className='flex flex-row flex-wrap justify-center m-4'>
					<Rolldice/>
					<Rolldice/>
					<Rolldice/>
					<Rolldice/>
					<Rolldice/>
					<Rolldice/>
			</div>
			<div className='flex justify-center'>
					<button className='text-light-blue p-2  w-1/4 m-auto rounded border-4 border-double border-pastel-purple hover:bg-dark-blue text-center'>Roll Dice</button>	
			</div>	
			<div className='flex flex-wrap justify-evenly'>	
				<Upperscore/>
				<Lowerscore/>
			</div>
		</>
	)
}

export default Yahtzee;