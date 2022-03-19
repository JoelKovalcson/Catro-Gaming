import React from 'react';
import { Link } from 'react-router-dom';
import '../utils/homepage/homepage.css';

const Homepage = () => {
	return (
		<>
			<div className='flex justify-center my-6'>
				<div className='flex flex-col items-center p-6 rounded border border-8 border-double border-pastel-purple bg-light-background'>
					<h3 className='self-center text-xl'>Pick your category:</h3>
					<button className='self-center w-3/4 h-12 m-4 rounded bg-pastel-purple'>
						<Link to="/singleplayer" className='text-black'>Single Player</Link>
					</button>
					<button className='self-center w-3/4 h-12 m-4 rounded bg-pastel-purple'>
						<Link to="/multiplayer" className='text-black'>Multiplayer</Link>
					</button>	
				</div>
			</div>
		</>
	)
}

export default Homepage;