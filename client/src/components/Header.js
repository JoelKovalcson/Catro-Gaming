import React from 'react';
import Navigator from './Navigator';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
 



const Header = () => {
	if(!auth.loggedIn) {
		return (
			<header className='flex-col h-24 sm:flex sm:flex-row sm:h-1/3'>
				<Link to='/' className='sm:w-full text-center bg-logo border-b p-4'>
				
                
            	
				</Link>
			</header>


		)
	}
	else {
		return (
			<header className='flex flex-col sm:flex sm:flex-row sm:h-48'>
				<Link to='/' className='sm:w-full h-48 bg-logo bg-center bg-contain bg-no-repeat text-center border-b p-4 '></Link>
				<div className='flex border justify-center w-full sm:w-1/12'>
					<button className='text-4xl m-auto hover:text-dark-blue hover:shadow-lg
						focus:text-dark-blue focus:shadow-lg focus:outline-none focus:ring-0
						active:text-blue-800 active:shadow-lg
						transition
						duration-150
						ease-in-out'
						onClick={() => {
							console.log("click");
							displayNavbar();

						}} >
						<FontAwesomeIcon icon={faBars} />
					</button>
				</div>	
				{/* <Navigator/> */}
			</header>
		)
	}
}

const displayNavbar = () => {
	return (
		// <Navigator/>
		console.log('Hey')
	)
}


export default Header;