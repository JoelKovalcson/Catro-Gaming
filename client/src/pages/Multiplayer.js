import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {MULTIPLAYER_GAMES} from '../utils/homepage/games';
import { GQL_JOIN_GAME, GQL_START_GAME } from "../utils/mutations";
import { GQL_GET_JOINABLE_GAMES } from "../utils/queries";

const Multiplayer = () => {

	const [gameSelection, setGameSelection] = useState({game: '', maxPlayers: '2', showModal: false, gameId: '', MIN: 1, MAX: 4, curPlayers: 1});

	const {loading, data: joinableGamesQuery, refetch: refetchJoinableGames} = useQuery(GQL_GET_JOINABLE_GAMES);
	const [joinGameQuery] = useMutation(GQL_JOIN_GAME);
	const [startGame] = useMutation(GQL_START_GAME);
	
	const handleFormSubmit = (event) => {
		event.preventDefault();
	}

	const closeModal = (event) => {
		event.preventDefault();
		
		setGameSelection({
			...gameSelection,
			showModal: false
		});
	}

	const handleChange = (event) => {
		setGameSelection({
			...gameSelection,
			[event.target.name]: Number.parseInt(event.target.value)
		});
	}

	const openModal = (event) => {
		event.preventDefault();
		let curElement = event.target;
		// Go up til we hit the anchor element for the game
		while (curElement.tagName.toLowerCase() !== 'a') {
			curElement = curElement.parentElement;
		}

		// Open modal with information
		setGameSelection({
			...gameSelection,
			showModal: true,
			MIN: curElement.getAttribute('data-min-players') ? curElement.getAttribute('data-min-players') : 1,
			MAX: curElement.getAttribute('data-max-players') ? curElement.getAttribute('data-max-players') : 4,
			maxPlayers: curElement.getAttribute('data-min-players') ? curElement.getAttribute('data-min-players') : 2,
			game: curElement.name,
			gameId: ''
		});

		
	}

	const createGame = async (event) => {
		event.target.setAttribute('disabled', '');
		event.target.textContent = 'Making game...';
		const response = await startGame({
			variables: {
				gameType: gameSelection.game.toLowerCase(),
				maxPlayers: Number.parseInt(gameSelection.maxPlayers)
			}
		});
		setGameSelection({
			...gameSelection,
			gameId: response.data.startGame._id,
			MAX: gameSelection.maxPlayers,
			maxPlayers: 1,
			curPlayers: 1
		});
	}

	const joinGame = async (event) => {

		event.preventDefault();
		let curElement = event.target;
		// Go up til we hit the anchor element for the game
		while (curElement.tagName.toLowerCase() !== 'a') {
			curElement = curElement.parentElement;
		}
		// data-game-id, data-max-players, data-cur-players

		await joinGameQuery({
			variables: {
				gameId: curElement.getAttribute('data-game-id')
			}
		});

		setGameSelection({
			...gameSelection,
			gameId: curElement.getAttribute('data-game-id'),
			showModal: true,
			MAX: Number.parseInt(curElement.getAttribute('data-max-players')),
			maxPlayers: Number.parseInt(curElement.getAttribute('data-max-players')),
			curPlayers: Number.parseInt(curElement.getAttribute('data-cur-players')) + 1,
			game: curElement.getAttribute('data-game-name').charAt(0).toUpperCase() + curElement.getAttribute('data-game-name').slice(1)
		});

		refetchJoinableGames();
	}

	return (
		<>
			{/* Modal */}


			

			<div className={`${(gameSelection.showModal) ? "" : "hidden"} grid z-40 bg-background/[.85] fixed top-0 bottom-0 right-0 left-0 justify-center items-center overflow-y-auto overflow-x-hidden h-modal md:h-full md:inset-0`}>
				<form onSubmit={handleFormSubmit} className="relative z-50 p-5 bg-light-background rounded-lg max-w-sm border-4 border-double border-pastel-purple">
					<button type="button" className="absolute top-1 right-1 transition ease-in-out duration-150 border border-pastel-purple text-light-blue bg-background hover:bg-dark-blue text-right rounded-lg text-sm p-1.5  items-center" onClick={closeModal}>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
					</button>
					<div className="grid mt-5">
						<div className="text-center inline-block mb-2 text-light-blue border-b border-pastel-purple">
							Game Selected
						</div>
						<div className="
							text-center
							text-xl
							block
							w-full
							px-3
							py-1.5
							font-normal
							text-blue-500
							bg-light-background bg-clip-padding
							rounded
							transition
							ease-in-out
							m-0
							mb-6"
						>
							{gameSelection.game.charAt(0).toUpperCase() + gameSelection.game.slice(1)}
						</div>
						{ // Only show this for when you're creating a game
						gameSelection.gameId ?
						 	<></> :
							<label htmlFor="maxPlayers" className={`${(gameSelection.showModal && gameSelection.MIN !== gameSelection.MAX) ? '' : 'hidden'} text-center inline-block mb-2 text-light-blue`}>
								Max Players ({`${gameSelection.MIN}-${gameSelection.MAX}`})
							</label>}
						{gameSelection.gameId ? (<></>) : <input name="maxPlayers" min={gameSelection.MIN} max={gameSelection.MAX} type="number" onChange={handleChange} value={gameSelection.maxPlayers} 
						  className={`${(gameSelection.showModal && gameSelection.MIN !== gameSelection.MAX) ? '' : 'hidden'} 
							form-control
							text-center
							px-3
							py-1.5
							font-normal
							text-blue-500
							bg-light-background bg-clip-padding
							border border-solid border-light-blue
							rounded
							transition
							ease-in-out
							m-0
							focus:outline-none
							mb-6`}
							id="maxPlayers"
							placeholder="1"/>}
						{ // If we have a gameId from creating or joining, render a link to go there
						gameSelection.gameId ? (
							<>
								<Link to={{pathname: `/${gameSelection.game.toLowerCase()}`, state: gameSelection}}
									className="
									w-full px-6 py-2.5 bg-light-background border-4 border-double border-light-blue
									text-light-blue text-sm font-bold leading-tight uppercase rounded shadow-md
									hover:bg-dark-blue hover:shadow-lg
									focus:bg-dark-blue focus:shadow-lg focus:outline-none focus:ring-0
									active:bg-blue-800 active:shadow-lg
									transition duration-150 ease-in-out
								">
									Join Game
								</Link>
								<div className="mt-2 text-center">
									Game ready to join!
								</div>
								<div className="mt-2 text-center">
									{gameSelection.curPlayers}/{gameSelection.MAX} players
								</div>
							</>
						) : 
						(<button type="submit" onClick={createGame} className="
							w-full px-6 py-2.5 bg-light-background border-4 border-double border-light-blue
							text-light-blue text-sm font-bold leading-tight uppercase rounded shadow-md
							hover:bg-dark-blue hover:shadow-lg
							focus:bg-dark-blue focus:shadow-lg focus:outline-none focus:ring-0
							active:bg-blue-800 active:shadow-lg
							transition duration-150 ease-in-out"
						>
							Create Game
						</button>)
						}
					</div>
				</form>
			</div>
			
			{/* Game Selection */}
			<section>
				<div className="text-center text-3xl mb-6 text-light-blue">
					CREATE GAME
				</div>
				<div className="flex flex-wrap justify-center w-screen">
					{
						MULTIPLAYER_GAMES.map((game) => {
							return (
								<a key={game.name} name={game.name} data-min-players={game.minPlayers} data-max-players={game.maxPlayers} data-route={game.route} onClick={openModal} href="#0" 
									className={`card-image flex flex-col justify-center mx-4 mt-4 h-48 w-48 rounded bg-cover bg-center bg-${game.name.toLowerCase()}`}>    
									<div className="card-text self-center text-bold text-xl">{game.name}</div>
								</a>
							)
						})
					}
				</div>
			</section>

			<div className="border-t-4 my-10 border-pastel-purple border-double mx-20"/>

			{/* Join Game Listings */}
			<section className="">
				<div className="text-center text-3xl mb-6 text-light-blue">
					JOIN GAME
				</div>
				<div className="flex flex-wrap justify-center w-screen">
					{ // When loading joinable games
						(loading) ? 
						<div className="text-blue-500 h-48 mx-4 mt-4 text-xl">
							Loading Games...
						</div>
						// Else they are loaded
						:
						joinableGamesQuery.getJoinableGames.map((game) => {
							return (
								<a href="#0" onClick={joinGame} key={game._id} data-game-id={game._id} data-game-name={game.gameName} data-max-players={game.maxPlayers} data-cur-players={game.participants.length}
									className="card-image flex flex-col justify-center mx-4 mt-4 h-48 w-48 rounded bg-cover bg-center bg-chuck-norris">    
									<div className="card-text self-center text-bold text-xl">{game.gameName.charAt(0).toUpperCase() + game.gameName.slice(1)}</div>
									<div className="text-light-blue card-text self-center text-bold text-l">Host: {game.participants[0].username}</div>
									<div className="text-light-blue card-text self-center text-bold text-l">{game.participants.length}/{game.maxPlayers} Players</div>
								</a>
							)
						})
						
					}
				</div>
			</section>
		</>
	)
}

export default Multiplayer