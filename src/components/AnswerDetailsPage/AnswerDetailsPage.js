import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { deleteAnswerById, getAnswer } from '../../services/data.service';
import useIsDesktop from '../../hooks/useIsDesktop';
import useUserData from '../../hooks/useUserData';
import useNotificationContext from '../../hooks/useNotificationContext';

import CirlclesList from '../feautures/CirclesList';
import RecentQuestionsList from '../feautures/RecentQuestionsList';
import Spinner from '../common/Spinner';
import AnswerCard from '../cards/AnswerCard/AnswerCard';
import CommentsSection from './comments/CommentsSection';
import OwnerControls from './edit/OwnerControls';

const AnswerDetailsPage = () => {
	// Answer details
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	// Doesnt render left sidebar on mobile and right sidebar goes on bottom
	const [isDesktop] = useIsDesktop();

	const userData = useUserData()
	const { _id } = useParams();
	const navigate = useNavigate();
	const handleNotifications = useNotificationContext();

	useEffect(() => {
		document.title = "Answer Details"
	}, []);

	useEffect(() => {
		setLoading(true);

		getAnswer(_id)
			.then(result => {
				setData(result.result);
			})
			.catch(err => {
				handleNotifications('error', 'Error fetching data from server');
				navigate('/');
			})
			.finally(() => {
				setLoading(false);
			})
	}, [_id])

	const handleSetNewBody = (body) => {
		setData({ ...data, body: body });
	}

	const handleDelete = () => {
		handleNotifications('info', 'Deleting answer!');
		deleteAnswerById(_id)
			.then(x => {
				handleNotifications('success', 'Answer deleted!');
				navigate('/');
			})
			.catch(err => {
				handleNotifications('error', err[0]?.message || 'Something went wrong!');
			})
	}

	return (
		<div className='grid grid-cols-5 gap-2 max-w-6xl p-2 w-full'>

			{/* Sidebar Left */}
			{isDesktop
				? <div className='col-span-1'>
					<CirlclesList />
				</div>
				: null
			}

			{/* Main  */}
			<div className='col-span-5 md:col-span-3 flex flex-col gap-2'>
				{loading
					? <Spinner />
					: <div>
						<AnswerCard isHiddenBtn={true} answer={data} />
						{userData && userData._id == data?.owner?._id && <OwnerControls
							data={data}
							handleSetNewBody={handleSetNewBody}
							handleDelete={handleDelete}
							_id={_id}
						/>}
						<CommentsSection answerId={_id} userData={userData} />
					</div>
				}
			</div>

			{/* Sidebar Right */}
			<div className={'col-span-5 md:col-span-1'}>
				<RecentQuestionsList />
			</div>

		</div >
	)
}

export default AnswerDetailsPage;