import React, { useState } from 'react'

function Dice(props) {
    const [locked, setLocked] = useState()

    if(props.roll === 1){
        return (
					<div className='border-2 border-light-blue rounded'>
						<button onClick={() => setLocked(locked)} className='border-2 border-dark-blue rounded m-1 w-14 h-14 bg-cover bg-center bg-dice1'></button>
					</div>
				)
    }
    else if(props.roll === 2){
        return <button onClick={() => setLocked(locked)} className='rounded m-1 w-14 h-14 bg-cover bg-center bg-dice2'></button>
    }
    else if(props.roll === 3){
        return <button onClick={() => setLocked(locked)} className='rounded m-1 w-14 h-14 bg-cover bg-center bg-dice3'></button>
    }
    else if(props.roll === 4){
        return <button onClick={() => setLocked(locked)} className='rounded m-1 w-14 h-14 bg-cover bg-center bg-dice4'></button>
    }
    else if(props.roll === 5){
        return <button onClick={() => setLocked(locked)} className='rounded m-1 w-14 h-14 bg-cover bg-center bg-dice5'></button>
    }
    else if(props.roll === 6){
        return <button onClick={() => setLocked(locked)} className='rounded m-1 w-14 h-14 bg-cover bg-center bg-dice6'></button>
    }
}

export default Dice