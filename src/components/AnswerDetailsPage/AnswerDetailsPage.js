import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteAnswerById, getAnswer } from '../../services/data.service';
import Spinner from '../common/Spinner';
import CirlclesList from '../feautures/CirclesList';
import RecentQuestionsList from '../feautures/RecentQuestionsList';
import AnswerCard from '../cards/AnswerCard/AnswerCard';
import useNotificationContext from '../../hooks/useNotificationContext';
import useUserData from '../../hooks/useUserData';

import CommentsSection from './comments/CommentsSection';
import OwnerControls from './edit/OwnerControls';
import useIsDesktop from '../../hooks/useIsDesktop';

const AnswerDetailsPage = () => {
	const handleNotification = useNotificationContext();
	const navigate = useNavigate();

	const [isDesktop] = useIsDesktop();

	const userData = useUserData()

	const { _id } = useParams();

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleNotifications = useNotificationContext();

	useEffect(() => {
		document.title = "Answer Details"
	}, []);

	useEffect(() => {
		setLoading(true)

		getAnswer(_id)
			.then(result => {
				setData(result.result);
			})
			.catch(err => {
				handleNotifications('error', 'Error fetching data from server')
			})
			.finally(() => {
				setLoading(false);
			})
	}, [_id])

	const handleSetNewBody = (body) => {
		setData({ ...data, body: body });
	}

	const handleDelete = () => {
		handleNotification('info', 'Deleting answer!');
		deleteAnswerById(_id)
			.then(x => {
				handleNotification('success', 'Answer deleted!');
				navigate('/');
			})
			.catch(err => {
				handleNotification('error', err[0].message || 'Something went wrong!');
			})
	}

	const mainTemplate = <>
		<div>
			<AnswerCard isHiddenBtn={true} answer={data} />
			{userData && userData._id == data?.owner?._id && <OwnerControls
				data={data}
				handleSetNewBody={handleSetNewBody}
				handleDelete={handleDelete}
				_id={_id}
				loading={loading}
			/>}
			<CommentsSection answerId={_id} userData={userData} />
		</div>
	</>

	return (
		<div className='grid grid-cols-5 gap-2 max-w-5xl p-2 w-full'>

			{/* Sidebar Left */}
			{isDesktop
				? <div className='col-span-1'>
					<CirlclesList />
				</div>
				: null
			}

			{/* Main  */}
			<div className='col-span-5 md:col-span-3 grid gap-2'>
				{loading
					? <Spinner />
					: mainTemplate}
			</div>

			{/* Sidebar Right */}
			{
				isDesktop
					? <div className={'col-span-1'}>
						<RecentQuestionsList />
					</div>
					: null
			}
		</div >
	)
}

export default AnswerDetailsPage