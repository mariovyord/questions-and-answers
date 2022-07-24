import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionsByOwnerId } from '../services/data.service';
import QuestionCard from './cards/QuestionCard';
import Feed from './feed/Feed';
import useFetch from './hooks/useFetch';

export default function Profile() {
	const [isDesktop, setDesktop] = useState(window.innerWidth > 768);
	const [showQuestions, setShowQuestions] = useState(false);
	const [questions, setQuestions] = useState([]);

	const { _id } = useParams();
	const filterQuery = `&where=owner=${_id}`;

	const [data, loading, error] = useFetch(`/users/${_id}`);

	const handleShowQuestions = () => {
		getQuestionsByOwnerId(_id)
			.then(x => {
				setQuestions(x.result);
				setShowQuestions(!showQuestions)
			});
	}

	// TODO Abstract it away
	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	const updateMedia = () => {
		setDesktop(window.innerWidth > 768);
	};

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
									<img src={data.imageUrl} alt="Portrait" />
								</div>
							</div>
							<div className=''>
								<h1 className='font-bold text-2xl'>{data.firstName} {data.lastName}</h1>
								<h2 className='italic opacity-80 text-sm'>@{data.username}</h2>
								<h2 className=''>{data.description}</h2>
							</div>
						</div>
						<div>
							<button className='btn btn-primary btn-outline w-full mb-2'>Edit Profile</button>
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
