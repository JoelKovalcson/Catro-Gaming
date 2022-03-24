import React from 'react';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
 



const Header = () => {

	return (
		<header className='flex flex-col md:border-b-4 md:border-double md:border-pastel-purple md:flex-row md:justify-between h-96 md:h-48'>
			<Link to={Auth.loggedIn() ? '/homepage' : '/'} className={`sm:w-full border-b-4 border-double md:w-3/5 border-pastel-purple md:border-none h-96 md:h-48 bg-logo bg-center bg-contain bg-no-repeat md:bg-right lg:bg-left lg:w-1/2 text-center p-4`}>
			</Link>
			<div className='invisible 2xl:visible xl:bg-filler xl:bg-bottom bg-auto bg-no-repeat 2xl:w-3/4 z-50'></div>
			<div className='flex justify-center md:justify-end lg:hidden w-full sm:mt-0 md:w-1/5 md:ml-24 border-b-4 md:border-none border-double border-pastel-purple p-4'>
				<button id='dropdownbutton' data-dropdown-toggle='dropdown' className='text-4xl m-auto lg:invisible hover:text-dark-blue hover:shadow-lg
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
				<div id='dropdown' className='hidden z-50 py-4 flex justify-center sm:justify-end sm:p-0 w-full divide-y'>
					<Dropdown/>
				</div>
			</div>	
			{/* <Link to='/' className='sm:w-full h-48 bg-logo bg-center bg-contain bg-no-repeat text-center border-b-4 border-double border-pastel-purple p-4 '></Link>
			<Dropdown/> */} 
			<div className='invisible lg:visible h-full w-0 lg:w-1/2'>
				<Navbar/>
			</div>
		</header>
	)
	
}



export default Header;