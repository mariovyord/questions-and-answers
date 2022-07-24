import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../common/Spinner';
import CirlclesList from '../feautures/CirclesList';
import RecentQuestionsList from '../feautures/RecentQuestionsList';
import AnswerCard from '../feed/AnswerCard/AnswerCard';
import useFetch from '../hooks/useFetch';
import AddComment from './AddComment/AddComment';

const AnswerDetails = () => {
	const [isDesktop, setDesktop] = useState(window.innerWidth > 768);

	const { _id } = useParams();
	// TODO Bug Doesnt receive owner
	const [data, loading, errors] = useFetch(`/collections/answers/${_id}?populate=owner`);

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	const updateMedia = () => {
		setDesktop(window.innerWidth > 768);
	};

	const answerTemplate = <>
		<div>
			<AnswerCard answer={data} />
			<div className='flex flex-col gap-2 w-full p-2'>
				<button className='btn btn-error w-full'>Delete</button>
				<button className='btn btn-secondary w-full'>Edit</button>
			</div>
			<div className='p-4'>
				<AddComment />
			</div>
			<div className='p-4'>
				<h2 className='font-bold text-2xl'>Comments</h2>
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

			{/* Main Feed */}
			<div className='col-span-5 md:col-span-3 grid gap-2'>
				{loading
					? <Spinner />
					: answerTemplate}
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