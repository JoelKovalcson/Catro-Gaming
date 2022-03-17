import React from 'react';
import Navigator from './Navigator';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className='flex-col sm:flex sm:flex-row border'>
			<Link to='/' className='sm:w-full text-center border p-4'>
				<h1>ArCaTrO</h1>
			</Link>
			<Navigator/>
		</header>
	)
}

export default Header;