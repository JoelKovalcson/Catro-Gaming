import React, { useEffect, useState } from 'react';
import Lowerscore from '../components/game/yahtzee/Lowerscore';
import Dice from '../components/game/yahtzee/Dice';
import Upperscore from '../components/game/yahtzee/Upperscore';
import { GQL_UPDATE_GAME_STATE } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { GQL_GET_GAME_DETAILS } from '../utils/queries';
import Auth from '../utils/auth';

const Yahtzee = (props) => {

	// State to hold local data for game display
	const [diceSelected, setDiceSelected] = useState(
		{
			selectedArr: [false, false, false, false, false],
			valueArr: [1, 1, 1, 1, 1],
			rolling: false
		}
	);
	// State to hold data as it goes to and from the database
	const [gameState, setGameState] = useState({});
	const [updateGame] = useMutation(GQL_UPDATE_GAME_STATE);

	const {loading, data: gameData} = useQuery(GQL_GET_GAME_DETAILS, {
		variables: {
			gameId: props.location?.state?.gameId
		},
		onCompleted: (data) => {
			// If there is no existing game state, initialize it and send a update to the server
			if(!data.getGame.gameState && Auth.getProfile().data._id === data.getGame.participants[0]._id) {
				
				for(let i = 0; i < data.getGame.maxPlayers; i++) {
					
				}

				setGameState({
					
				});
			}
		},
		pollInterval: 2000
	});
	
	useEffect(() => {
		if(diceSelected.rolling) {
			let counter = 0;
			const interval = setInterval(() => {
				counter++;
				if (counter >= 20) {
					// Reset counter and clear interval
					clearInterval(interval);
					counter=0;

					// Stop rolling
					setDiceSelected((prevState) => {
						const newState = {...prevState};
						newState.rolling = false;
						return newState;
					});

					// Calculate possible scores
					

					return;
				}
				const newValues = [...(diceSelected.valueArr)].map((val, index) => {
					if (!diceSelected.selectedArr[index]) return Math.floor(Math.random()*5)+1;
					else return val;
				});
				setDiceSelected((prevState) => {
					const newState = {...prevState};
					newState.valueArr = newValues;
					return newState;
				});
			}, 100);
			return () => {
				clearInterval(interval);
			}
		}
	}, [diceSelected.rolling])

	const rollDice = () => {
		setDiceSelected({
			...diceSelected,
			rolling: true
		});		
	}
		
		
	

	const toggleSelect = (index) => {

		
		const newArr = [...(diceSelected.selectedArr)];
		newArr[index] = !newArr[index];
		setDiceSelected({
			...diceSelected,
			selectedArr: newArr
		});
	}

	const tmpPlayers = [
		{
			name: 'Rick',
			upperScore: [3, 0, 0, 0, 0, 0, 0, 0, 0],
			possibleUpper: [5, 5, 5, 5, 5, 5, 5, 5, 5],
			lowerScore: [2, 0, 0, 0, 0, 0, 0, 0, 0],
			possibleLower: [5, 5, 5, 5, 5, 5, 5, 5, 5],
			score: 0
		},
		{
			name: 'Jerry',
			upperScore: [3, 0, 0, 0, 0, 0, 0, 0, 0],
			possibleUpper: [5, 5, 5, 5, 5, 5, 5, 5, 5],
			lowerScore: [2, 0, 0, 0, 0, 0, 0, 0, 0],
			possibleLower: [5, 5, 5, 5, 5, 5, 5, 5, 5],
			score: 0
		},
		{
			name: 'Morty',
			upperScore: [3, 0, 0, 0, 0, 0, 0, 0, 0],
			possibleUpper: [5, 5, 5, 5, 5, 5, 5, 5, 5],
			lowerScore: [2, 0, 0, 0, 0, 0, 0, 0, 0],
			possibleLower: [5, 5, 5, 5, 5, 5, 5, 5, 5],
			score: 0
		},
		{
			name: 'Mee6',
			upperScore: [3, 0, 0, 0, 0, 0, 0, 0, 0],
			possibleUpper: [5, 5, 5, 5, 5, 5, 5, 5, 5],
			lowerScore: [2, 0, 0, 0, 0, 0, 0, 0, 0],
			possibleLower: [5, 5, 5, 5, 5, 5, 5, 5, 5],
			score: 0
		}
	];
	const tmpPlayerNum = 2;



	return (
		<>
			{/* Had to include the custom background images to trick tailwind into including them in the page's CSS */}
			<div className='hidden bg-dice1 bg-dice2 bg-dice3 bg-dice4 bg-dice5 bg-dice6'/>
			<div className='flex flex-wrap justify-around text-xl'>
				<div className='flex-row flex-wrap justify-center m-4'>
						<div className='flex flex-wrap justify-center'>
							{diceSelected.selectedArr.map((value, index) => {
								return (
									<Dice key={`dice-${index}`} toggleSelect={toggleSelect} selected={value} num={diceSelected.valueArr[index]} index={index}/>
								);
							})}
						</div>
						<div className='mt-2 flex flex-row justify-center'>
							<button disabled={(diceSelected.rolling) ? true : false} onClick={rollDice} className='text-light-blue p-2 min-w-60 m-auto rounded border-4 border-double border-pastel-purple hover:bg-dark-blue text-center'>Roll Dice</button>	
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