import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigator = () => {
  return (
    <nav className='flex border-2 w-1/3'>
      <Link to="/Profile" className='p-4'>Profile: {}</Link>
      <Link to="/" className='p-4'>Logout</Link>
      {/* <Link to="/"></Link> */}
    </nav>
  )
}

export default Navigator