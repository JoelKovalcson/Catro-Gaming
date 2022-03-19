import React, { useEffect } from 'react';
import Lowerscore from '../components/game/yahtzee/Lowerscore';
import Upperscore from '../components/game/yahtzee/Upperscore';
import Dice from '../components/game/yahtzee/Dice';
import { useState } from 'react';

const Yahtzee = (props) => {
	const [roll, setRoll] = useState(1);
	let counter = 0;

	useEffect(() => {
		const interval = setInterval(() => {
			counter += 1;
			if(counter >= 7){
				clearInterval(interval);
			}
			setRoll(Math.floor(Math.random()*5)+1);
		}, 100);
	}, [props.isIsolated]);

	return (
		<>
			<div className='flex flex-wrap justify-evenly'>
				<Upperscore/>
				<Lowerscore/>
				<div className='flex flex-row sm:flex-row md:flex-col lg:flex-col justify-center m-4'>
					<Dice roll={roll}/>
					<Dice roll={roll}/>
				</div>	
			</div>
			<div className='flex justify-center'>
				<button className='w-1/4 h-12 m-4 rounded bg-pastel-purple text-black'>Roll Dice</button>	
			</div>
		</>
	)
}

export default Yahtzee;