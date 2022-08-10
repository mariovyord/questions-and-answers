import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getUserDataById } from '../../services/data.service';
import useUserData from '../../hooks/useUserData';

import AnswersFeed from '../AnswersFeed/AnswersFeed';
import useNotificationContext from '../../hooks/useNotificationContext';
import UserCard from './userCards/UserCard';
import ShadowUserCard from './userCards/ShadowUserCard';
import isAuth from '../../hoc/isAuth';
import UserQuestions from './sidebars/UserQuestions';
import Settings from './sidebars/Settings';
import EditProfile from './sidebars/EditProfile';

const ProfilePage = () => {
	const [isOwner, setIsOwner] = useState(false);

	// Profile from data service
	const [profile, setProfile] = useState({});
	const [loading, setLoading] = useState(true);

	// Params
	const { _id: profileId } = useParams();
	const filterQuery = `where=owner=${profileId}`;

	// Logged user
	const userData = useUserData();

	const handleNotification = useNotificationContext();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Profile"
	}, []);

	useEffect(() => {
		setLoading(true);

		getUserDataById(profileId)
			.then(result => {
				setProfile(result.result);
				if (result.result._id == userData?._id) {
					setIsOwner(true);
				}
			})
			.catch(err => {
				handleNotification('Error fetching data from server');
				navigate('/404');
			})
			.finally(() => {
				setLoading(false);
			})

	}, [profileId])

	const handleSetProfile = (values) => {
		setProfile((p) => ({ ...p, ...values }))
	}

	return (
		<div className='grid grid-cols-5 gap-2 max-w-6xl p-2 w-full'>

			{/* Sidebar Left */}
			{
				loading
					? <div className='col-span-5 md:col-span-2 w-full'>
						<ShadowUserCard />
					</div>
					: <div className='col-span-5 md:col-span-2 w-full'>
						<UserCard profile={profile} />
						{isOwner && <>
							{/* User settings */}
							<Settings isOwner={isOwner} />

							{/* Edit profile options */}
							<EditProfile handleSetProfile={handleSetProfile} profile={profile} userData={userData} />

							{/* Show/hide user questions options */}
							<UserQuestions profileId={profileId} />
						</>}
					</div>
			}

			{/* Feed */}
			<AnswersFeed options={filterQuery} />
		</div>
	)
}

export default isAuth(ProfilePage);