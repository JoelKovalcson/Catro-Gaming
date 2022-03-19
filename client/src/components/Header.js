import React from 'react';
import Navigator from './Navigator';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Arcatro_logo_4.png'
import auth from '../utils/auth'



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
				<Navigator/>
			</header>
		)
	}
}

export default Header;