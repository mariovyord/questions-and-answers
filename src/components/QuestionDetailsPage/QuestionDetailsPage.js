import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import useUserData from '../../hooks/useUserData';

import { toTitleCase } from '../../utils/stringUtils';

import AnswersFeed from '../AnswersFeed/AnswersFeed';
import AddAnswerForm from './AddAnswerForm/AddAnswerForm';
import AnswerCard from '../cards/AnswerCard/AnswerCard';
import RecentQuestionsList from '../feautures/RecentQuestionsList';


export default function QuestionDetailsPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [newAnswers, setNewAnswers] = useState([]);
	const userData = useUserData();

	const { id: questionId } = useParams();

	const [question, loading] = useFetch(`/collections/questions/${questionId}`);

	useEffect(() => {
		document.title = "Question Details"
	}, []);

	useEffect(() => {
		setNewAnswers([]);
	}, [questionId])

	const showTextarea = (e) => {
		setIsOpen(!isOpen);
	}

	const addAnswers = (answer) => {
		setNewAnswers((arr) => [answer, ...arr])
	}

	return (
		<div className='grid grid-cols-5 gap-2 max-w-5xl p-2 w-full'>
			<div className='col-span-5 md:col-span-3 flex flex-col gap-2 w-full'>

				{loading && <>
					<div className='p-3 bg-base-100 rounded-lg shadow animate-pulse w-full'>
						<div className='h-8 bg-slate-200 rounded w-full mb-2'></div>
						<div className='h-4 bg-slate-200 rounded w-full mb-2'></div>
					</div>
				</>}

				{!loading && question === null && <>
					<div className='p-3 bg-base-100 rounded-lg shadow  w-full'>
						<h1 className='font-bold text-2xl mb-2 italic'>The question is missing or has been deleted</h1>
					</div>

				</>}

				{!loading && question !== null && <>
					<div className='h-fit p-3 bg-base-100 rounded-lg shadow  w-full'>
						<h1 className='font-bold text-2xl mb-2'>{question.body}</h1>
						<p className='italic text-slate-500'>Circle: <Link className=' link-hover' to={`/circles/${question.circle}`}>{toTitleCase(question.meta.circle)}</Link></p>
					</div>
					{userData && <div>
						<div className="collapse">
							<input onClick={() => showTextarea()} type="checkbox" className='p-0 m-0' />
							<div className="collapse-title text-base font-medium btn btn-secondary w-full min-h-0 p-0">
								{isOpen ? 'Close' : 'Add Answer'}
							</div>
							<div className="collapse-content">

								<AddAnswerForm question={question} addAnswers={addAnswers} showTextarea={showTextarea} />

								<div className="alert shadow-lg">
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
										<span>You can use <a href="https://www.markdownguide.org/" className='link'>markdown</a>  in writing your answer!</span>
									</div>
								</div>
							</div>
						</div>
					</div>}
				</>}

				{/* New Answers from User */}
				{newAnswers.length > 0 && <div className='bg-primary p-2 rounded-lg'>
					{newAnswers.map(x => <AnswerCard key={x._id} answer={x} />)}
				</div>}

				{/* Answers */}
				<AnswersFeed options={`where=question=${questionId}`} />

			</div>
			<div className='col-span-5 md:col-span-2 p-3 flex flex-col gap-2'>
				<RecentQuestionsList />
			</div>
		</div >
	)
}
