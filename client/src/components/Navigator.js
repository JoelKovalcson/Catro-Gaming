import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigator = () => {
  return (
    <nav className='flex justify-center w-full sm:w-1/3  border-b-4 border-double border-pastel-purple'>
      <div className='flex flex-row w-full justify-around'>
        <Link to="/Profile" className='text-light-blue p-2  w-1/2 m-auto rounded border-4 border-double border-pastel-purple hover:bg-dark-blue text-center'>Profile: {}</Link>
        <Link to="/" className='text-light-blue p-2  w-1/2 m-auto rounded border-4 border-double border-pastel-purple hover:bg-dark-blue text-center'>Logout</Link>
        {/* <Link to="/"></Link> */}
      </div>
    </nav>
  )
}

export default Navigator