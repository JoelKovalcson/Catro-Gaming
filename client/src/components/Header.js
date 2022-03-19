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
				<Link to='/' className='sm:w-full text-center bg-logo border-b-4 border-double border-pastel-purple p-4'>
				
                
            	
				</Link>
			</header>


		)
	}
	else {
		return (
			<header className='flex flex-col sm:flex sm:flex-row sm:h-48'>
				<Link to='/' className='sm:w-full h-48 bg-logo bg-center bg-contain bg-no-repeat text-center border-b-4 border-double border-pastel-purple p-4 '></Link>
				<div className='flex justify-center w-full sm:w-1/12 border-b-4 border-double border-pastel-purple p-4'>
					<button id='dropdownbutton' data-dropdown-toggle='dropdown' className='text-4xl m-auto hover:text-dark-blue hover:shadow-lg
						focus:text-light-blue focus:shadow-lg focus:outline-none focus:ring-0
						active:text-blue-800 active:shadow-lg
						transition
						hover:text-light-blue
						hover:translate-y-1
						hover:scale-110
						duration-150
						ease-in-out'
					>
						<FontAwesomeIcon icon={faBars} />
					</button>
					<div id='dropdown' className='hidden z-50 py-4 flex justify-center sm:justify-end sm:p-0 w-full divide-y transition
						
						duration-450
						ease-in-out '>
						<Navigator/>

					</div>
				</div>	
				{/* <Link to='/' className='sm:w-full h-48 bg-logo bg-center bg-contain bg-no-repeat text-center border-b-4 border-double border-pastel-purple p-4 '></Link>
				<Navigator/> */} 
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