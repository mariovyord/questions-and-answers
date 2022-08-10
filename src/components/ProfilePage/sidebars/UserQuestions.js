import React, { useState } from 'react';
import { getQuestionsByOwnerId } from '../../../services/data.service';
import QuestionCard from '../../cards/QuestionCard';


const UserQuestions = ({ profileId }) => {
	const [showQuestions, setShowQuestions] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [loadingQuestions, setLoadingQuestions] = useState(false)

	const handleShowQuestions = () => {
		setLoadingQuestions(true);

		if (showQuestions) {
			setLoadingQuestions(false);
			return setShowQuestions(!showQuestions)
		};

		getQuestionsByOwnerId(profileId)
			.then(x => {
				// TODO Dont get hidden questions from server - but for now server doesnt handle multiple of the same query
				setQuestions(x.result.filter(x => x.isHidden !== true));
				setShowQuestions(!showQuestions)
				setLoadingQuestions(false);
			});
	}

	return (
		<div>
			<div className='pb-2'>
				<button
					onClick={handleShowQuestions}
					className='btn btn-secondary btn-outline w-full'
					disabled={loadingQuestions}
				>
					{showQuestions ? 'Hide questions' : 'Show questions'}
				</button>
			</div>
			{
				showQuestions && <>
					{questions.length > 0
						? <div className='grid gap-2 max-h-[500px] overflow-y-auto overflow-x-hidden'>
							{questions.map(x => <QuestionCard key={x._id} data={x} />)}
						</div>
						: <h2>No questions</h2>
					}
				</>
			}
		</div>
	)
}

export default UserQuestions;