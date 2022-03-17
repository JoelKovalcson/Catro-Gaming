import React from 'react';
import Navigator from './Navigator';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className='flex-col sm:flex border'>
			<Link to='/' className='w-1/2'>
				<h1>ArCaTrO</h1>
			</Link>
			<Navigator/>
		</header>
	)
}

export default Header;