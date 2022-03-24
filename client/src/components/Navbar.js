import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar = () => {

    return (
            <nav className={`invisible lg:visible flex justify-end bg-background border-pastel-purple mt-32`}>
        
            <Link to="/Homepage" className='text-light-blue p-2 text-lg 2xl:text-2xl mr-8 rounded hover:bg-dark-blue text-center hover:text-light-blue hover:shadow-lg
                            focus:text-light-blue focus:shadow-lg focus:outline-none focus:ring-0
                            active:bg-blue-800 active:shadow-lg
                            transition
                            duration-150
                            ease-in-out
                            border-4 border-double border-pastel-purple'>Homepage </Link>
            <Link to="/Profile" className={`${Auth.loggedIn() ? '' : 'hidden'} text-light-blue p-2 text-lg 2xl:text-2xl mr-8 rounded hover:bg-dark-blue text-center hover:text-light-blue hover:shadow-lg
                            focus:text-light-blue focus:shadow-lg focus:outline-none focus:ring-0
                            active:bg-blue-800 active:shadow-lg
                            transition
                            duration-150
                            ease-in-out
                            border-4 border-double border-pastel-purple`}>{Auth.loggedIn() ? Auth.getProfile().data.username : ''}</Link>
            <button onClick={Auth.logout} to="/" className='text-light-blue p-2 text-lg 2xl:text-2xl mr-4 rounded hover:text-light-blue hover:shadow-lg
                            focus:text-light-blue focus:shadow-lg focus:outline-none focus:ring-0
                            active:bg-blue-800 active:shadow-lg
                            transition
                            duration-150
                            ease-in-out hover:bg-dark-blue text-center
                            border-4 border-double border-pastel-purple'>Logout</button>
        </nav>
    )
}

export default Navbar;