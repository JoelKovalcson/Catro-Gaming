import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigator = () => {
  return (
    <nav className='flex flex-col justify-center w-full sm:w-1/4 bg-background h-5/6 border-pastel-purple '>
      
        <Link to="/Dashboard" className='text-light-blue p-4 md:text-2xl lg:text-3xl lg:p-12 w-full m-auto rounded border-4 border-double border-pastel-purple hover:bg-dark-blue text-center hover:text-light-blue hover:shadow-lg
						focus:text-light-blue focus:shadow-lg focus:outline-none focus:ring-0
						active:bg-blue-800 active:shadow-lg
						transition
						duration-150
						ease-in-out'>Dashboard </Link>
        <Link to="/Profile" className='text-light-blue p-4 md:text-2xl lg:text-3xl lg:p-12 w-full m-auto rounded border-4 border-double border-pastel-purple hover:bg-dark-blue text-center hover:text-light-blue hover:shadow-lg
						focus:text-light-blue focus:shadow-lg focus:outline-none focus:ring-0
						active:bg-blue-800 active:shadow-lg
						transition
						duration-150
						ease-in-out'>Profile {}</Link>
        <Link to="/" className='text-light-blue p-4 md:text-2xl lg:text-3xl lg:p-12 w-full m-auto rounded border-4 border-double border-pastel-purple hover:text-light-blue hover:shadow-lg
						focus:text-light-blue focus:shadow-lg focus:outline-none focus:ring-0
						active:bg-blue-800 active:shadow-lg
						transition
						duration-150
						ease-in-out hover:bg-dark-blue text-center'>Logout</Link>
        {/* <Link to="/"></Link> */}
    </nav>
  )
}
// class for nav: 

// <div className='flex flex-col justify-end w-full border-2 m-2 '>

export default Navigator