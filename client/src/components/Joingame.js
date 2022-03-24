import React from "react";

const Joingame = (props) => {
	
	return (
		<>
			
			<h3 className="self-center text-xl font-bold">Active Games</h3>
			<ul>
				{
					(props.games?.getActiveGames) 
						?
							<>
								{props.games.getActiveGames.map((game, index) => {
									return (
										<li key={`game-${index}`}className="border-4 border-double border-pastel-purple m-4 p-2 rounded">
											<div className="flex flex-col items-center">
												<h4 className="text-lg font-semibold">{game.gameName[0].toUpperCase() + game.gameName.slice(1)}</h4>
												<h5>Host: {game.participants[0].username}</h5>
												<h5>Player: {game.participants.length}/{game.maxPlayers}</h5>
												<button name={game.gameName} data-cur-players={game.participants.length} data-max-players={game.maxPlayers} data-game-id={game._id} onClick={props.joinGame} className="rounded bg-pastel-purple hover:bg-opacity-80 text-dark-blue py-1 px-3 my-2 mx-1">Rejoin Game</button>
											</div>
										</li>
									)
								})}
							</>
						:
							<div className="mt-4 text-center">
								No Active Games
							</div>
				}
			</ul>
		</>
	)
}

export default Joingame;