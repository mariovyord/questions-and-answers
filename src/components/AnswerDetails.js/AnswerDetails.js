import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteAnswerById } from '../../services/data.service';
import Spinner from '../common/Spinner';
import CirlclesList from '../feautures/CirclesList';
import RecentQuestionsList from '../feautures/RecentQuestionsList';
import AnswerCard from '../feed/AnswerCard/AnswerCard';
import useFetch from '../hooks/useFetch';
import useNotificationContext from '../hooks/useNotificationContext';
import useUserData from '../hooks/useUserData';
import AddComment from './comments/AddComment';
import CommentsFeed from './comments/CommentsFeed';

const AnswerDetails = () => {
	const [newComments, setNewComments] = useState([]);
	const handleNotification = useNotificationContext();
	const navigate = useNavigate();

	const [isDesktop, setDesktop] = useState(window.innerWidth > 768);
	const userData = useUserData()

	const { _id } = useParams();
	// TODO Bug Doesnt receive owner
	const [data, loading, errors] = useFetch(`/collections/answers/${_id}?populate=owner`);

	const addComment = (comment) => {
		setNewComments(x => [...newComments, comment])
	}

	const deleteAnswer = () => {
		// TODO Add modal
		const confirmation = window.confirm('Are you sure?');
		if (confirmation) {
			handleNotification('info', 'Deleting asnwer!');
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
			<button className='btn btn-secondary w-full'>Edit</button>
		</div>
	</>

	const mainTemplate = <>
		<div>
			<AnswerCard isHiddenBtn={true} answer={data} />
			{userData._id == data?.owner?._id && ownerControls}
			<div className='p-4'>
				<AddComment answerId={_id} addComment={addComment} />
			</div>
			<div className='p-4'>
				{<CommentsFeed answerId={_id} newComments={newComments} />}
			</div>
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