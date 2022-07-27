import { divider } from '@uiw/react-md-editor';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../common/Spinner';
import CirlclesList from '../feautures/CirclesList';
import RecentQuestionsList from '../feautures/RecentQuestionsList';
import AnswerCard from '../feed/AnswerCard/AnswerCard';
import useFetch from '../hooks/useFetch';
import useUserData from '../hooks/useUserData';
import AddComment from './comments/AddComment';
import CommentCard from './comments/CommentCard';

const AnswerDetails = () => {
	const [isDesktop, setDesktop] = useState(window.innerWidth > 768);
	const userData = useUserData()

	const { _id } = useParams();
	// TODO Bug Doesnt receive owner
	const [data, loading, errors] = useFetch(`/collections/answers/${_id}?populate=owner`);
	const [comments, loadingComments, errorsComments] = useFetch(`/collections/comments?where=answer=${_id}&populate=owner`)

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	const updateMedia = () => {
		setDesktop(window.innerWidth > 768);
	};

	const ownerControls = <>
		<div className='flex flex-col gap-2 w-full p-2'>
			<button className='btn btn-error w-full'>Delete</button>
			<button className='btn btn-secondary w-full'>Edit</button>
		</div>
	</>

	const commentsFeed = <>
		<h2 className='font-bold text-2xl mb-2'>Comments</h2>
		<div>
			{loadingComments && 'Loading'}
			{!loadingComments && comments.length === 0 && 'No comments'}
			{!loadingComments && comments.length > 0 && <>
				{comments.map(x => <div>{<CommentCard comment={x} />}</div>)}
			</>}


		</div>
	</>

	const mainTemplate = <>
		<div>
			<AnswerCard isHiddenBtn={true} answer={data} />
			{userData._id == data?.owner?._id && ownerControls}
			<div className='p-4'>
				<AddComment />
			</div>
			<div className='p-4'>
				{commentsFeed}
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