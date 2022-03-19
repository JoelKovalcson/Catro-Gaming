import {useParams} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import React from 'react';
import Stats from '../components/Stats'
import { GQL_GET_PROFILE } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {

	const {username: userId} = useParams();
	
	const {loading, data} = useQuery(GQL_GET_PROFILE, {
		variables: {userId: (userId) ? userId : Auth.getProfile().data._id}
	});

	return (
		<>
			<h2>Stats:</h2>
			<Stats/>
		</>
	)
}

export default Profile;