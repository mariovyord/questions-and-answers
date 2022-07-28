import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteAnswerById, getAnswer } from '../../services/data.service';
import Spinner from '../common/Spinner';
import CirlclesList from '../feautures/CirclesList';
import RecentQuestionsList from '../feautures/RecentQuestionsList';
import AnswerCard from '../feed/AnswerCard/AnswerCard';
import useNotificationContext from '../hooks/useNotificationContext';
import useUserData from '../hooks/useUserData';

import CommentsSection from './comments/CommentsSection';
import EditAnswerForm from './edit/EditAnswerForm';

const AnswerDetails = () => {
	const [isOpen, setIsOpen] = useState(false);
	const handleNotification = useNotificationContext();
	const navigate = useNavigate();

	const [isDesktop, setDesktop] = useState(window.innerWidth > 768);
	const userData = useUserData()

	const { _id } = useParams();

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true)
		setError(null);

		getAnswer(_id)
			.then(result => {
				setData(result.result);
			})
			.catch(err => {
				setError('Error fetching data from server');
			})
			.finally(() => {
				setLoading(false);
			})
	}, [_id])

	const showTextarea = () => {
		setIsOpen(!isOpen);
	}

	const handleSetNewBody = (body) => {
		setData({ ...data, body: body });
	}

	const deleteAnswer = () => {
		// TODO Add modal
		const confirmation = window.confirm('Are you sure?');
		if (confirmation) {
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
	}

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	const updateMedia = () => {
		setDesktop(window.innerWidth > 768);
	};

	const ownerControls = <>
		<div className='flex flex-col gap-2 w-full p-2'>
			<button onClick={deleteAnswer} className='btn btn-error w-full'>Delete</button>
			<div className="collapse">
				<input onClick={() => showTextarea()} type="checkbox" className='p-0 m-0' />
				<div className="collapse-title text-base font-medium btn btn-secondary w-full min-h-0 p-0">
					{isOpen ? 'Close' : 'Edit Answer'}
				</div>
				<div className="collapse-content">

					{!loading && <>
						<EditAnswerForm
							answerId={_id}
							handleSetNewBody={handleSetNewBody}
							question={{
								body: data.meta.question,
								owner: data._id,
								circle: data.circle,
								meta: {
									circle: data.meta.circle
								}
							}}
							showTextarea={showTextarea}
							values={data.body} />
					</>}

					<div className="alert shadow-lg">
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
							<span>You can use <a href="https://www.markdownguide.org/" className='link'>markdown</a>  in writing your answer!</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>

	const mainTemplate = <>
		<div>
			<AnswerCard isHiddenBtn={true} answer={data} />
			{userData._id == data?.owner?._id && ownerControls}
			<CommentsSection answerId={_id} />
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

export default AnswerDetails