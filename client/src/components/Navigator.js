import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigator = () => {
  return (
    <nav className='flex border-2 p-4 sm:w-1/4 justify-around'>
      <Link to="/Profile" className='p-4 md:p-8 w-full border-2 hover:shadow-lg hover:shadow-blue-500 text-center'>Profile: {}</Link>
      <Link to="/" className='p-2 md:p-4 w-full border-2 hover:shadow-lg hover:shadow-blue-500 text-center'>Logout</Link>
      {/* <Link to="/"></Link> */}
    </nav>
  )
}

export default Navigator