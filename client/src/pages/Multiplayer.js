import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {MULTIPLAYER_GAMES} from '../utils/homepage/games';
import { GQL_START_GAME } from "../utils/mutations";
import { GQL_GET_JOINABLE_GAMES } from "../utils/queries";

const Multiplayer = () => {

	const [gameSelection, setGameSelection] = useState({game: '', maxPlayers: '2', showModal: false, gameId: '', MIN: 1, MAX: 4, curPlayers: 1});

	const {loading, data: joinableGamesQuery} = useQuery(GQL_GET_JOINABLE_GAMES);
	const [startGame] = useMutation(GQL_START_GAME);
	
	const handleFormSubmit = (event) => {
		event.preventDefault();
	}

	const closeModal = (event) => {
		event.preventDefault();
		if(event.target.name === 'background') {
			setGameSelection({
				...gameSelection,
				showModal: false
			});
		
		}
	}

	const handleChange = (event) => {
		setGameSelection({
			...gameSelection,
			[event.target.name]: event.target.value
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
			gameId: response.data.startGame._id
		});
		
		event.target.textContent = 'Join Game';
		event.target.removeAttribute('disabled');
	}

	const joinGame = (event) => {
		event.preventDefault();
		let curElement = event.target;
		// Go up til we hit the anchor element for the game
		while (curElement.tagName.toLowerCase() !== 'a') {
			curElement = curElement.parentElement;
		}
		// data-game-id, data-max-players, data-cur-players
		setGameSelection({
			...gameSelection,
			gameId: curElement.getAttribute('data-game-id'),
			showModal: true,
			MAX: curElement.getAttribute('data-max-players'),
			maxPlayers: curElement.getAttribute('data-cur-players'),
			game: curElement.getAttribute('data-game-name').charAt(0).toUpperCase() + curElement.getAttribute('data-game-name').slice(1)
		});
	}

	return (
		<>
			{/* Modal */}
			<a href="#0" onClick={closeModal} name="background" className={`${(gameSelection.showModal) ? "" : "hidden"} grid z-40 bg-background/[.85] fixed top-0 bottom-0 right-0 left-0 justify-center items-center overflow-y-auto overflow-x-hidden h-modal md:h-full md:inset-0`}>
				<form onSubmit={handleFormSubmit} className="z-50 p-5 bg-light-background rounded-lg max-w-sm border-4 border-double border-pastel-purple">
					<div className="grid">
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
						<label htmlFor="maxPlayers" className={`${(gameSelection.showModal && gameSelection.MIN !== gameSelection.MAX) ? '' : 'hidden'} text-center inline-block mb-2 text-light-blue`}>
							Max Players ({`${gameSelection.MIN}-${gameSelection.MAX}`})
						</label>
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
						{gameSelection.gameId ? (
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
			</a>
			
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
									className="card-image flex flex-col justify-center mx-4 mt-4 h-48 w-48 rounded bg-cover bg-center bg-chuck-norris">    
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
						:
						joinableGamesQuery.getJoinableGames.map((game) => {
							return (
								<a href="#0" onClick={joinGame} key={game._id} data-game-id={game._id} data-game-name={game.gameName} data-max-players={game.maxPlayers} data-cur-players={game.participants.length}
									className="card-image flex flex-col justify-center mx-4 mt-4 h-48 w-48 rounded bg-cover bg-center bg-chuck-norris">    
									<div className="card-text self-center text-bold text-xl">{game.gameName.charAt(0).toUpperCase() + game.gameName.slice(1)}</div>
									<div className="text-light-blue card-text self-center text-bold text-l">Host: {game.participants[0].username}</div>
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