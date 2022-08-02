import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AnswerCard from '../cards/AnswerCard/AnswerCard';
import FeedOptionsContainer from '../common/FeedOptionsContainer';
import Spinner from '../common/Spinner';
import NoContent from '../common/NoContent';
import { countAnswers, getAllAnswers } from '../../services/data.service';
import useNotificationContext from '../../hooks/useNotificationContext';

export default function AnswersFeed({ options = '' }) {
	const [query, setQuery] = useSearchParams();
	const pageSize = 6;

	const [answersData, setAnswersData] = useState([]);
	const [answersCount, setAnswersCount] = useState(1);
	const [loading, setLoading] = useState(true);

	const handleNotification = useNotificationContext();

	useEffect(() => {
		const urlOptions = {
			pageSize: pageSize,
			page: query.get('page') || 1,
			sortBy: query.get('sortBy') || 'score%20desc',
			options: options,
		}

		setLoading(true);
		Promise.all([
			getAllAnswers(urlOptions),
			countAnswers(options)
		])
			.then(values => {
				setAnswersData(values[0].result);
				setAnswersCount(values[1].result);
			})
			.catch(err => {
				handleNotification('error', 'Error connecting to server!');
			})
			.finally(() => {
				setLoading(false);
			})
	}, [query, options]);


	const handleSort = (e) => {
		setQuery({
			sortBy: e.target.value,
			page: query.get('page') || 1,
		})
	}

	const handlePage = (changeNum) => {
		const currentPage = query.get('page') || 1;
		const calcPage = parseInt(currentPage) + changeNum;

		setQuery({
			sortBy: query.get('sortBy') || 'score%20desc',
			page: calcPage > 0 ? calcPage : 1,
		});
	}

	return (
		<>
			<div className='col-span-5 md:col-span-3 grid gap-2 w-full h-fit'>
				<FeedOptionsContainer
					isDisabled={loading}
					maxPage={Math.ceil(answersCount / pageSize)}
					page={query.get('page') || 1}
					handlePage={handlePage}
				>
					<select
						className="select w-full max-w-xs btn-outline"
						value={query.get('sortBy') || 'score%20desc'}
						onChange={handleSort}
					>
						<option value={'score%20desc'}>Sort by score</option>
						<option value={'createdAt%20desc'}>Sort by most recent</option>
					</select>
				</FeedOptionsContainer>

				{loading
					? <Spinner />
					: <>
						{answersData.length > 0
							? answersData.map(x => <AnswerCard key={x._id} answer={x} />)
							: <NoContent content='answers' />
						}
					</>
				}
			</div>
		</>
	)
}
