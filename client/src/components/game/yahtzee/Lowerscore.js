import React from "react";

const Lowerscore = (props) => {
    return (
			<>
			<section className="flex m-0.5 sm:m-4 text-lg text-pastel-purple rounded border border-light-blue border-separate p-0.5">
				{/* Labels */}
				<section className="flex-col">
					<div className="whitespace-nowrap text-center font-bold rounded border border-light-blue p-1 w-full">
							Lower Section
					</div>
					<div>
						<button className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
							3 of a Kind
						</button>
					</div>
					<div>
						<button className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
							4 of a Kind
						</button>
					</div>
					<div>
						<button className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
							Full House
						</button>
					</div>
					<div>
						<button className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
							SM Straight
						</button>
					</div>
					<div>
						<button className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
							LG Straight
						</button>
					</div>
					<div>
						<button className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
							Yahtzee
						</button>
					</div>
					<div>
						<button className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
							Chance
						</button>
					</div>
					<div>
						<button className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
							Yahtzee Bonus
						</button>
					</div>
					<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
						Lower Total
					</div>
				</section>
				{props.players.map((player, playerIndex) => {
						return (
							<section key={`${player.name}--${playerIndex}`} className={`flex-col text-center flex ml-0.5 ${(playerIndex+1 === props.playerNum) ? 'bg-light-blue/20 rounded' : ''}`}>
								<div className="font-bold rounded border border-light-blue p-1">
									{(playerIndex+1 === props.playerNum) ? 'You' : `P${playerIndex+1}`}
								</div>
								{player.lowerScore.map((value, scoreIndex) => {
									return (
										<div key={`${value}---${scoreIndex}`} className={`${(value) ? '' : 'text-slate-400'} rounded border border-light-blue mt-0.5`}>
											{(value) ? value : ((playerIndex+1===props.playerNum) ? player.possibleLower[scoreIndex] : <br/>)}
										</div>
									)
								})}
							</section>
						)
					})}
			</section>        
		 </> 
    )
}

export default Lowerscore