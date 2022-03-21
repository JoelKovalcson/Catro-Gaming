import React from 'react';
import { Link } from 'react-router-dom';
import '../utils/homepage/homepage.css';

const Homepage = () => {

	return (
		<>
			<div className='flex justify-center my-6'>
				<div className='flex flex-col items-center p-6 rounded border-4 border-double border-light-blue bg-light-background'>
					<h3 className='self-center text-xl'>Pick your category:</h3>
					<Link to="/singleplayer" className='text-center pt-2 text-light-blue self-center w-3/4 h-12 m-4 rounded bg-light-background border-4 border-double border-pastel-purple hover:bg-dark-blue'>Single Player</Link>
					<Link to="/multiplayer" className='text-center pt-2 text-light-blue self-center w-3/4 h-12 m-4 rounded bg-light-background border-4 border-double border-pastel-purple hover:bg-dark-blue'>Multiplayer</Link>	
				</div>
			</div>
		</>
	)
}

export default Homepage;