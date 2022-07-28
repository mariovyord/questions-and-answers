import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getQuestionsByOwnerId, getUserDataById } from '../../services/data.service';
import useUserData from '../hooks/useUserData';

import QuestionCard from '../cards/QuestionCard';
import Feed from '../feed/Feed';
import useNotificationContext from '../hooks/useNotificationContext';
import EditProfileForm from './forms/EditProfileForm';
import UploadImageForm from './forms/UploadImageForm';

export default function Profile() {
	const [showQuestions, setShowQuestions] = useState(false);
	const [showEditProfile, setShowEditProfile] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [isOwner, setIsOwner] = useState(false);

	// From data service
	const [profile, setProfile] = useState([]);
	const [loading, setLoading] = useState(true);

	// Params
	const { _id: profileId } = useParams();
	const filterQuery = `&where=owner=${profileId}`;

	// Logged user
	const userData = useUserData();

	const handleNotification = useNotificationContext();
	const navigate = useNavigate();

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
				navigate('404');
			})
			.finally(() => {
				setLoading(false);
			})

	}, [profileId, handleNotification, navigate])

	const handleShowQuestions = () => {
		getQuestionsByOwnerId(profileId)
			.then(x => {
				setQuestions(x.result);
				setShowQuestions(!showQuestions)
			});
	}

	return (
		<div className='grid grid-cols-5 gap-2 max-w-5xl p-2 w-full'>

			{/* Sidebar Left */}
			{
				loading
					? <h1>Loading</h1>
					: <div className='col-span-5 md:col-span-2 w-full'>
						<div className='bg-base-100 p-4 mb-2 rounded-lg shadow flex gap-2'>
							<div className="avatar">
								<div className="w-32 rounded">
									<img src={profile.imageUrl} alt="Portrait" />
								</div>
							</div>
							<div className=''>
								<h1 className='font-bold text-2xl'>{profile.firstName} {profile.lastName}</h1>
								<h2 className='italic opacity-80 text-sm'>@{profile.username}</h2>
								<h2 className=''>{profile.description}</h2>
							</div>
						</div>
						<div>
							{isOwner && <button
								onClick={() => setShowEditProfile((x) => !x)}
								className='btn btn-primary btn-outline w-full mb-2'
							>
								{showEditProfile ? 'Close' : 'Edit Profile'}
							</button>}
							{showEditProfile && <div className='flex flex-col gap-2 mb-4'>
								<div className='border border-primary rounded-lg p-4 bg-base-100 shadow'>
									<h3 className='font-bold text-2xl'>Profile picture</h3>
									<UploadImageForm />
								</div>
								<div className='border border-primary rounded-lg p-4 bg-base-100 shadow'>
									<h3 className='font-bold text-2xl'>Edit info</h3>
									<EditProfileForm profile={profile} />
								</div>
							</div>}
						</div>
						<div className='pb-2'>
							<button onClick={handleShowQuestions} className='btn btn-secondary btn-outline w-full'>{showQuestions ? 'Hide questions' : 'Show questions'}</button>
						</div>
						{showQuestions && <div className='grid gap-2'>
							{questions.length > 0
								? questions.map(x => <QuestionCard data={x} />)
								: <h2>No questions</h2>
							}
						</div>
						}
					</div>
			}

			{/* Feed */}
			<Feed urlOptions={filterQuery} />
		</div>
	)
}
