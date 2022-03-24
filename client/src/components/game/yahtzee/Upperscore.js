import React from "react";

const Upperscore = (props) => {

	// These will actually be from the players
	
    return (
       <>
				<section className="flex m-0.5 sm:m-4 text-lg text-pastel-purple rounded border border-light-blue border-separate p-0.5">
					{/* Labels */}
					<section className="flex-col">
						<div className="whitespace-nowrap text-center font-bold rounded border border-light-blue p-1 w-full">
								Upper Section
						</div>
						<div>
							{
								(props.players.length && !(props.players[props.playerNum-1].upperScore[0] >= 0))
								?
									(
										<button onClick={props.scoreClickHandler} name="upper-0" className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
											Aces
										</button>
									)
								:
									(
										<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
											Aces
										</div>
									)
							}
						</div>
						<div>
							{
								(props.players.length && !(props.players[props.playerNum-1].upperScore[1] >= 0))
								?
									(
										<button onClick={props.scoreClickHandler} name="upper-1" className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
											Twos
										</button>
									)
								:
									(
										<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
											Twos
										</div>
									)
							}
						</div>
						<div>
							{
								(props.players.length && !(props.players[props.playerNum-1].upperScore[2] >= 0))
								?
									(
										<button onClick={props.scoreClickHandler} name="upper-2" className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
											Threes
										</button>
									)
								:
									(
										<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
											Threes
										</div>
									)
							}
						</div>
						<div>
							{
								(props.players.length && !(props.players[props.playerNum-1].upperScore[3] >= 0))
								?
									(
										<button onClick={props.scoreClickHandler} name="upper-3" className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
											Fours
										</button>
									)
								:
									(
										<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
											Fours
										</div>
									)
							}
						</div>
						<div>
							{
								(props.players.length && !(props.players[props.playerNum-1].upperScore[4] >= 0))
								?
									(
										<button onClick={props.scoreClickHandler} name="upper-4" className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
											Fives
										</button>
									)
								:
									(
										<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
											Fives
										</div>
									)
							}
						</div>
						<div>
							{
								(props.players.length && !(props.players[props.playerNum-1].upperScore[5] >= 0))
								?
									(
										<button onClick={props.scoreClickHandler} name="upper-5" className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
											Sixes
										</button>
									)
								:
									(
										<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
											Sixes
										</div>
									)
							}
						</div>
						<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
							Total Score
						</div>
						<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
							Bonus
						</div>
						<div className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full">
							Upper Total
						</div>
					</section>
					{ 
					(!props.players)
					?
						Array(props.maxPlayers).map( (_, playerIndex) =>
							(
								<section key={`${playerIndex}--Upperscore`}className="flex-col text-center flex ml-0.5">
									<div className="font-bold rounded border border-light-blue p-1">
										P1
									</div>
									{Array(9).map( (_, scoreIndex) =>
										(
											<div key={`${playerIndex}--${scoreIndex}--Upperscore`} className='rounded border border-light-blue mt-0.5'>
												<br/>
											</div>
										)
									)}
								</section>
							)	
						)
					:
						props.players.map((player, playerIndex) => {
							return (
								<section key={`${player.name}--${playerIndex}`} className={`flex-col text-center flex ml-0.5 ${(playerIndex+1 === props.playerNum) ? 'bg-light-blue/20 rounded' : ''}`}>
									<div className="font-bold rounded border border-light-blue p-1">
										{(playerIndex+1 === props.playerNum) ? 'You' : `P${playerIndex+1}`}
									</div>
									{player.upperScore.map((value, scoreIndex) => {
										return (
											<div key={`${value}---${scoreIndex}`} className={`${(value >= 0) ? '' : 'text-slate-400'} rounded border border-light-blue mt-0.5`}>
												{(value >= 0) ? value : ((playerIndex+1===props.playerNum && scoreIndex !== 6 && scoreIndex !== 7 && scoreIndex !== 8) ? player.possibleUpper[scoreIndex] : <br/>)}
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

export default Upperscore