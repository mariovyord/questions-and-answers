import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useFetch from '../hooks/useFetch';

import { toTitleCase } from '../../utils/stringUtils';

import Feed from '../feed/Feed';
import AddAnswerForm from './AddAnswerForm/AddAnswerForm';
import AnswerCard from '../feed/AnswerCard/AnswerCard';
import RecentQuestionsList from '../feautures/RecentQuestionsList';


export default function QuestionDetails() {
	const [isOpen, setIsOpen] = useState(false);
	const [newAnswers, setNewAnswers] = useState([]);

	const { id: questionId } = useParams();

	const [question, loading, error] = useFetch(`/collections/questions/${questionId}`);

	const showTextarea = (e) => {
		setIsOpen(!isOpen);
	}

	const addAnswers = (answer) => {
		setNewAnswers((arr) => [answer, ...arr])
	}

	return (
		<div className='grid grid-cols-5 gap-2 max-w-5xl p-2'>
			<div className='col-span-5 md:col-span-3 flex flex-col gap-2 '>
				{/* Question */}
				{/* Add loading animation */}
				{loading && <>
					<div className='p-3 bg-base-100 rounded-lg shadow'>
						<h1 className='font-bold text-2xl mb-2'>Loading...</h1>
						<p className='italic text-slate-500'>Circle: <Link className=' link-hover' to={`/circles/`}>...</Link></p>
					</div>
					<div>
						<button className='btn btn-secondary w-full'></button>
					</div>
				</>}
				{!loading && <>
					<div className='h-fit p-3 bg-base-100 rounded-lg shadow'>
						<h1 className='font-bold text-2xl mb-2'>{question.body}</h1>
						<p className='italic text-slate-500'>Circle: <Link className=' link-hover' to={`/circles/${question.circle}`}>{toTitleCase(question.meta.circle)}</Link></p>
					</div>
					<div>
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
					</div>
				</>}

				{/* New Answers from User */}
				{newAnswers.length > 0 && <div className='bg-primary p-2 rounded-lg'>
					{newAnswers.map(x => <AnswerCard key={x._id} answer={x} />)}
				</div>}

				{/* Answers */}
				<Feed urlOptions={`where=question=${questionId}`} />

			</div>
			<div className='col-span-2 p-3 flex flex-col gap-2'>
				<RecentQuestionsList />
			</div>
		</div >
	)
}
