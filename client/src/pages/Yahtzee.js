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
	const [gameState, setGameState] = useState({
		players: []
	});
	const [updateGame] = useMutation(GQL_UPDATE_GAME_STATE);

	const {loading, data: gameData} = useQuery(GQL_GET_GAME_DETAILS, {
		variables: {
			gameId: props.location?.state?.gameId
		},
		onCompleted: (data) => {
			// If there is no existing game state and the host joined, initialize it and send a update to the server
			if(!data.getGame.gameState && Auth.getProfile().data._id === data.getGame.participants[0]._id) {
				
				const playerArr = [];

				for(let i = 0; i < data.getGame.maxPlayers; i++) {
					playerArr.push({
						name: '',
						upperScore: [0,0,0,0,0,0,0,0,0],
						possibleUpper: [0,0,0,0,0,0,0,0,0],
						lowerScore: [0,0,0,0,0,0,0,0,0],
						possibleLower: [0,0,0,0,0,0,0,0,0],
						rollsLeft: 3,
						score: 0,
						currentDice: [1, 1, 1, 1, 1]
					});
				}
				console.log({players: playerArr});
				// Send the new game data to the server, where the else below will catch on update and set state
				updateGame({
					variables: {
						gameId: data.getGame._id,
						gameState: JSON.stringify({players: playerArr})
					}
				});
				return;
			}
			// Else we aren't the host, but the game isn't started yet
			else if (!data.getGame.gameState) {
				// Display a modal saying that you're waiting for the host to join
				console.log("Waiting on host to join...");
				return;
			}
			// There is a game state, so set current game state to the one just pulled
			else {
				const newState = JSON.parse(data.getGame.gameState);
				
				// Then check if the number of participants is maxPlayers to display a modal if the game isn't full yet
				if (data.getGame.participants.length < data.getGame.maxPlayers) {
					console.log("Waiting on more players to join...");
					return;
				}
				
				// Setup names for each player, and get current player index in participants array
				const playerArr = newState.players;
				let playerNum = 0;
				for (let i = 0; i < playerArr.length; i++) {
					console.log(data.getGame.participants[i].username, Auth.getProfile().data.username);
					if(data.getGame.participants[i].username === Auth.getProfile().data.username) playerNum = i+1;
					playerArr[i].name = data.getGame.participants[i].username;
				}
				
				setGameState({
					...newState,
					playerNum
				});
			}
		},
		pollInterval: 10000
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
		
	
	const scoreClickHandler = async (event) => {
		const [section, index] = event.target.name.split('-');
		const players = [...gameState.players];
		console.log(section, index);
		if (section === 'upper') {
			// Do a check to make sure value doesn't already exist
			players[gameState.playerNum-1].upperScore[index] = 1;//gameState.players[gameState.playerNum-1].possibleUpper[index];
		}
		else if (section === 'lower') {
			// Do a check to make sure value doesn't already exist
			players[gameState.playerNum-1].lowerScore[index] = 1;//gameState.players[gameState.playerNum-1].possibleLower[index];
		}
		else {
			// Should never happen
			console.error('scoreClickHandler called from invalid source');
			return;
		}
		
		await updateGame({
			variables: {
				gameId: gameData.getGame._id,
				gameState: JSON.stringify({...gameState, players: players}),
				nextTurn: true
			}
		});

		setGameState({
			...gameState,
			players: players
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
							<button disabled={(diceSelected.rolling) ? true : false} onClick={rollDice} 
								className='text-light-blue p-2 min-w-60 m-auto rounded border-4 border-double border-pastel-purple hover:bg-dark-blue text-center'>
									Roll Dice ({(gameState.players.length) ? gameState.players[gameState.playerNum-1].rollsLeft : 0})
							</button>	
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
				<Upperscore scoreClickHandler={scoreClickHandler} maxPlayers={props.location.state.maxPlayers} players={gameState.players} playerNum={gameState.playerNum}/>
				<Lowerscore scoreClickHandler={scoreClickHandler} maxPlayers={props.location.state.maxPlayers} players={gameState.players} playerNum={gameState.playerNum}/>
			</div>
		</>
	)
}

export default Yahtzee;