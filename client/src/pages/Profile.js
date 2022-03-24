import {useParams} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Stats from '../components/Stats'
import Chat from '../components/Chat'
import { GQL_GET_ACTIVE_GAMES, GQL_GET_PROFILE } from '../utils/queries';
import Auth from '../utils/auth';
import Joingame from '../components/Joingame';

const Profile = () => {

	//const navigate = useNavigate();

	const [state, setState] = useState({gameId: null, gameName: null})

	const {username} = useParams();
	
	const {loading: profileLoading, data: profileData} = useQuery(GQL_GET_PROFILE, {
		variables: {
			username: (username) ? username : Auth.getProfile().data.username
		}
	});

	const {loading: gamesLoading, data: gamesData} = useQuery(GQL_GET_ACTIVE_GAMES);
	
	const joinGame = (event) => {
		setState({
			gameId: event.target.getAttribute('data-game-id'),
			gameName: event.target.name
		});
	}

	useEffect(() => {
		if(state.gameId) {
			//navigate(`/${state.gameName}`)
		}
	}, [state])

	if(profileLoading) {
		return<div>loading</div>
	}
	else {
		return (
			<>
				<div className='flex flex-row flex-wrap justify-evenly m-4'>
					<div className='flex flex-col justify-center border-4 border-double border-light-blue p-2 rounded'>
						<h1 className='self-center text-xl font-bold'>{profileData.getProfile.username}</h1>
						<h3 className='self-center'>Total games played: {profileData.getProfile.scores.totalGames}</h3>
						<Stats
							username={profileData.getProfile.username}
							scores={profileData.getProfile.scores}
						/>
					</div>
					<div className={`${username ? 'hidden': ''} flex flex-col border-4 border-double border-light-blue rounded p-2`}>
						<Joingame loading={gamesLoading} games={gamesData} joinGame={joinGame}/>
					</div>
					<div className='flex flex-col justify-between border-4 border-double border-light-blue rounded'>
						<Chat/>
					</div>
				</div>	
			</>
		)
	}
}

export default Profile;