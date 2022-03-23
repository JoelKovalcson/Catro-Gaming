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
						{
							(props.players.length && !props.players[props.playerNum-1].lowerScore[0])
							?
								(
									<button onClick={props.scoreClickHandler} name="lower-0" className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
										3 of a Kind
									</button>
								)
							:
								(
									<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
										3 of a Kind
									</div>
								)
						}
					</div>
					<div>
						{
							(props.players.length && !props.players[props.playerNum-1].lowerScore[1])
							?
								(
									<button onClick={props.scoreClickHandler} name="lower-1" className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
										4 of a Kind
									</button>
								)
							:
								(
									<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
										4 of a Kind
									</div>
								)
						}
					</div>
					<div>
						{
							(props.players.length && !props.players[props.playerNum-1].lowerScore[2])
							?
								(
									<button onClick={props.scoreClickHandler} name="lower-2" className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
										Full House
									</button>
								)
							:
								(
									<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
										Full House
									</div>
								)
						}
					</div>
					<div>
						{
							(props.players.length && !props.players[props.playerNum-1].lowerScore[3])
							?
								(
									<button onClick={props.scoreClickHandler} name="lower-3" className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
										SM Straight
									</button>
								)
							:
								(
									<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
										SM Straight
									</div>
								)
						}
					</div>
					<div>
						{
							(props.players.length && !props.players[props.playerNum-1].lowerScore[4])
							?
								(
									<button onClick={props.scoreClickHandler} name="lower-4" className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
										LG Straight
									</button>
								)
							:
								(
									<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
										LG Straight
									</div>
								)
						}
					</div>
					<div>
						{
							(props.players.length && !props.players[props.playerNum-1].lowerScore[5])
							?
								(
									<button onClick={props.scoreClickHandler} name="lower-5" className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
										Yahtzee
									</button>
								)
							:
								(
									<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
										Yahtzee
									</div>
								)
						}
					</div>
					<div>
						{
							(props.players.length && !props.players[props.playerNum-1].lowerScore[6])
							?
								(
									<button onClick={props.scoreClickHandler} name="lower-6" className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
										Chance
									</button>
								)
							:
								(
									<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
										Chance
									</div>
								)
						}
					</div>
					<div>
						{
							(props.players.length && props.players[props.playerNum-1].lowerScore[5] && props.players[props.playerNum-1].possibleLower[7])
							?
								(
									<button onClick={props.scoreClickHandler} name="lower-7" className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
										Yahtzee Bonus
									</button>
								)
							: 
								(
									<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
										Yahtzee Bonus
									</div>
								)
						}
					</div>
					<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
						Lower Total
					</div>
				</section>
				{
					(!props.players) 
					? // If players doesn't exist yet, we have maxplayers from location
						Array(props.maxPlayers).map( (_, playerIndex) =>
							(
								<section key={`${playerIndex}--Lowerscore`}className="flex-col text-center flex ml-0.5">
									<div className="font-bold rounded border border-light-blue p-1">
										P1
									</div>
									{Array(9).map( (_, scoreIndex) =>
										(
											<div key={`${playerIndex}--${scoreIndex}--Lowerscore`} className='rounded border border-light-blue mt-0.5'>
												<br/>
											</div>
										)
									)}
								</section>
							)	
						)
					: // When players does exist, render this instead
						props.players.map((player, playerIndex) => {
							return (
								<section key={`${player.name}--${playerIndex}`} className={`flex-col text-center flex ml-0.5 ${(playerIndex+1 === props.playerNum) ? 'bg-light-blue/20 rounded' : ''}`}>
									<div className="font-bold rounded border border-light-blue p-1">
										{(playerIndex+1 === props.playerNum) ? 'You' : `P${playerIndex+1}`}
									</div>
									{player.lowerScore.map((value, scoreIndex) => {
										return (
											<div key={`${value}---${scoreIndex}`} className={`${(value) ? '' : 'text-slate-400'} rounded border border-light-blue mt-0.5`}>
												{(value) ? value : ((playerIndex+1===props.playerNum && scoreIndex !==8 ) ? ((scoreIndex === 7 && !(player.lowerScore[5])) ? <br/> : player.possibleLower[scoreIndex]) : <br/>)}
											</div>
										)
									})}
								</section>
							)
						})
				}
			</section>        
		 </> 
    )
}

export default Lowerscore