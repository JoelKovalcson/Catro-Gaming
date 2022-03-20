import React, { useState } from 'react';
import Lowerscore from '../components/game/yahtzee/Lowerscore';
import Rolldice from '../components/game/yahtzee/Rolldice';
import Upperscore from '../components/game/yahtzee/Upperscore';

const Yahtzee = (props) => {

	const [diceSelected, setDiceSelected] = useState([true, true, true, true, true]);

	console.log(props.location.state);



	const tmpPlayers = [
		{
			name: 'Rick',
			upperScore: [0, 0, 0, 0, 0, 0, 0, 0, 0],
			lowerScore: [0, 0, 0, 0, 0, 0, 0, 0, 0],
			score: 0
		},
		{
			name: 'Jerry',
			upperScore: [0, 0, 0, 0, 0, 0, 0, 0, 0],
			lowerScore: [0, 0, 0, 0, 0, 0, 0, 0, 0],
			score: 0
		},
		{
			name: 'Morty',
			upperScore: [0, 0, 0, 0, 0, 0, 0, 0, 0],
			lowerScore: [0, 0, 0, 0, 0, 0, 0, 0, 0],
			score: 0
		},
		{
			name: 'Mee6',
			upperScore: [0, 0, 0, 0, 0, 0, 0, 0, 0],
			lowerScore: [0, 0, 0, 0, 0, 0, 0, 0, 0],
			score: 0
		}
	];
	const tmpPlayerNum = 2;



	return (
		<>
			<div className='flex flex-wrap justify-around text-xl'>
				<div className='flex-row flex-wrap justify-center m-4'>
						<div className='flex flex-wrap justify-center'>
							{diceSelected.map((value, index) => {
								return (
									<Rolldice key={`dice-${index}`} setSelect={setDiceSelected} selected={value} num={index}/>
								);
							})}
						</div>
						<div className='mt-2 flex flex-row justify-center'>
							<button className='text-light-blue p-2 min-w-60 m-auto rounded border-4 border-double border-pastel-purple hover:bg-dark-blue text-center'>Roll Dice</button>	
						</div>
				</div>
				<table className='rounded border border-light-blue border-separate p-0.5 m-1'>
					<thead>
						<tr className='text-center'>
							<th className='border-b border-light-blue px-1'>
								Player Name
							</th>
							<th className='border-b border-light-blue px-1'>
								Total Score
							</th>
						</tr>
					</thead>
					<tbody>
						{tmpPlayers.map((player) => {
							return (
								<tr key={`${player.name}-${player.score}`}>
									<td className='border-r border-light-blue'>
										{player.name}
									</td>
									<td className='border-l border-light-blue text-center'>
										{player.score}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
				
			<div className='flex flex-wrap justify-evenly mb-4'>	
				<Upperscore players={tmpPlayers} playerNum={tmpPlayerNum}/>
				<Lowerscore players={tmpPlayers} playerNum={tmpPlayerNum}/>
			</div>
		</>
	)
}

export default Yahtzee;