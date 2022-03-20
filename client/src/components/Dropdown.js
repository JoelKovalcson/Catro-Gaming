import React from 'react';
import { Link } from 'react-router-dom';

const Dropdown = () => {
  return (
    <nav className='flex flex-col justify-center w-full sm:w-1/3 bg-background border-pastel-purple transition '>
      
        <Link to="/Dashboard" className='text-light-blue p-4 md:text-xl w-full m-auto rounded border-4 border-double border-pastel-purple hover:bg-dark-blue text-center hover:text-light-blue hover:shadow-lg
						focus:text-light-blue focus:shadow-lg focus:outline-none focus:ring-0
						active:bg-blue-800 active:shadow-lg
						transition
						duration-150
						ease-in-out'>Dashboard </Link>
        <Link to="/Profile" className='text-light-blue p-4 md:text-xl w-full m-auto rounded border-4 border-double border-pastel-purple hover:bg-dark-blue text-center hover:text-light-blue hover:shadow-lg
						focus:text-light-blue focus:shadow-lg focus:outline-none focus:ring-0
						active:bg-blue-800 active:shadow-lg
						transition
						duration-150
						ease-in-out'>Profile {}</Link>
        <Link to="/" className='text-light-blue p-4 md:text-xl w-full m-auto rounded border-4 border-double border-pastel-purple hover:text-light-blue hover:shadow-lg
						focus:text-light-blue focus:shadow-lg focus:outline-none focus:ring-0
						active:bg-blue-800 active:shadow-lg
						transition
						duration-150
						ease-in-out hover:bg-dark-blue text-center'>Logout</Link>
    </nav>
  )
}

export default Dropdown