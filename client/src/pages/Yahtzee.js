import React from 'react';
import Lowerscore from '../components/game/yahtzee/Lowerscore';
import Rolldice from '../components/game/yahtzee/Rolldice';
import Upperscore from '../components/game/yahtzee/Upperscore';

const Yahtzee = () => {
	return (
		<>
<<<<<<< HEAD
			<div className='flex flex-wrap justify-evenly'>
				<Upperscore/>
				<Lowerscore/>
<<<<<<< HEAD
				<div className='flex flex-wrap flex-row sm:flex-row md:flex-col lg:flex-col justify-center m-4'>
					<Dice/>
=======
				<div className='flex flex-row sm:flex-row md:flex-col lg:flex-col justify-center m-4'>
=======
			<div className='flex flex-row flex-wrap justify-center m-4'>
>>>>>>> yahtzee
					<Rolldice/>
					<Rolldice/>
					<Rolldice/>
					<Rolldice/>
					<Rolldice/>
					<Rolldice/>
<<<<<<< HEAD
>>>>>>> yahtzee
				</div>	
=======
>>>>>>> yahtzee
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