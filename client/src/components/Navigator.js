import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigator = () => {
  return (
    <nav className='flex border justify-center w-full sm:w-1/3'>
      <div className='flex flex-row w-full justify-around'>
        <Link to="/Profile" className='p-2  w-1/2 m-auto border-2 hover:shadow-lg hover:shadow-blue-500 text-center'>Profile: {}</Link>
        <Link to="/" className='p-2 w-1/2 my-auto border-2 hover:shadow-lg hover:shadow-blue-500 text-center'>Logout</Link>
        {/* <Link to="/"></Link> */}
      </div>
    </nav>
  )
}

export default Navigator