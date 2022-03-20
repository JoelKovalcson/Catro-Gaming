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
							<button className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
								Aces
							</button>
						</div>
						<div>
							<button className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
								Twos
							</button>
						</div>
						<div>
							<button className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
								Threes
							</button>
						</div>
						<div>
							<button className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
								Fours
							</button>
						</div>
						<div>
							<button className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
								Fives
							</button>
						</div>
						<div>
							<button className="pl-1 text-left rounded border border-light-blue mt-0.5 w-full bg-dark-blue/50 hover:bg-dark-blue ease-in-out transition duration-150">
								Sixes
							</button>
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
					{props.players.map((player, index) => {
						return (
							<section key={`${player.name}--${index}`} className={`flex-col text-center flex ml-0.5 ${(index+1 === props.playerNum) ? 'bg-light-blue/20 rounded' : ''}`}>
								<div className="font-bold rounded border border-light-blue p-1">
									{(index+1 === props.playerNum) ? 'You' : `P${index+1}`}
								</div>
								{player.upperScore.map((value, index) => {
									return (
										<div key={`${value}---${index}`} className="rounded border border-light-blue mt-0.5">
											{(value) ? value : <br></br>}
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

export default Upperscore