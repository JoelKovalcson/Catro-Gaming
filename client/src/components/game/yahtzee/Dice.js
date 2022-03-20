import React from 'react'

function Dice(props) {
		return (
			<div className={`${(props.selected) ? 'border-2 border-light-blue' : 'p-0.5'} m-0.5 rounded`}>
				<button onClick={() => props.toggleSelect(props.index)} className={`border-2 border-dark-blue rounded m-1 w-14 h-14 bg-cover bg-center bg-dice${props.num}`}></button>
			</div>
		)
}

export default Dice