import React, { useState } from "react";
import { Link } from "react-router-dom";
import {MULTIPLAYER_GAMES} from '../utils/homepage/games';

const Multiplayer = () => {

	const [gameSelection, setGameSelection] = useState({game: 'yahtzee', maxPlayers: 2, showModal: false, gameId: '', MIN: 1, MAX: 5});
	const [joinGameArr, setJoinGameArr] = useState([]);
	
	const handleFormSubmit = (event) => {
		event.preventDefault();
	}

	const handleChange = (event) => {
		event.preventDefault();
		if(event.target.name === 'background') {
			setGameSelection({
				...gameSelection,
				showModal: false
			})
			return;
		}
		else {
			console.log(event.target)
		}
		setGameSelection({
			...gameSelection,
			[event.target.name]: event.target.value
		});
	}

	const createGame = (event) => {
		event.preventDefault();
		console.log(MULTIPLAYER_GAMES);
	}

	return (
		<>
			{/* Modal */}
			<a href="#0" onClick={handleChange} name="background" className={`${(gameSelection.showModal) ? "visible" : "invisible"} grid z-40 bg-background/[.85] fixed top-0 bottom-0 right-0 left-0 justify-center items-center overflow-y-auto overflow-x-hidden h-modal md:h-full md:inset-0`}>
				<form onSubmit={handleFormSubmit} className="p-5 bg-light-background rounded-lg max-w-sm border-4 border-double border-pastel-purple">
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
						
						<label htmlFor="maxPlayers" className="text-center inline-block mb-2 text-light-blue">
							Max Players ({`${gameSelection.MIN}-${gameSelection.MAX}`})
						</label>
						<input name="maxPlayers" min={gameSelection.MIN} max={gameSelection.MAX} type="number" onChange={handleChange} value={gameSelection.maxPlayers} className="form-control
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
							mb-6" 
							id="maxPlayers"
							placeholder="1"/>
						<button type="submit"  className="
							w-full
							px-6
							py-2.5
							bg-light-background
							border-4
							border-double
							border-light-blue
							text-light-blue
							font-medium
							text-sm
							font-bold
							leading-tight
							uppercase
							rounded
							shadow-md
							hover:bg-dark-blue hover:shadow-lg
							focus:bg-dark-blue focus:shadow-lg focus:outline-none focus:ring-0
							active:bg-blue-800 active:shadow-lg
							transition
							duration-150
							ease-in-out"
						>
							Create Game
						</button>
					</div>
					
					
				</form>
			</a>
			
			{/* Game Selection */}
			<section>
				<div className="text-center text-3xl mb-10">
					CREATE GAME
				</div>
				<div className="flex flex-wrap justify-center w-screen">
					{
						MULTIPLAYER_GAMES.map((game) => {
							return (
								<a key={game.name} name={game.name} data-min-players={game.minPlayers} data-max-players={game.maxPlayers} data-route={game.route} onClick={createGame} href="#0" className="card-image flex flex-col justify-center mx-4 mt-4 h-48 w-48 rounded bg-cover bg-center bg-chuck-norris">    
									<div className="card-text self-center text-bold text-xl">{game.name}</div>
								</a>
							)
						})
					}
				</div>
			</section>
			{/* Join Game Listings */}
			<div className="border-t-4 my-10"/>
			<section className="">
				<div>

				</div>
				<div className="flex flex-wrap justify-center w-screen">
					Content
				</div>
			</section>
			
		</>
	)
}

export default Multiplayer