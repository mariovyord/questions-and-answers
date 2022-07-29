import React from 'react';
import { useSearchParams } from 'react-router-dom';
import AnswerCard from './AnswerCard/AnswerCard';
import useFetch from '../../hooks/useFetch';
import FeedOptionsContainer from '../common/FeedOptionsContainer';
import Spinner from '../common/Spinner';
import NoContent from '../common/NoContent';

export default function Feed({ urlOptions = '' }) {
	const pageSize = 10;
	const [query, setQuery] = useSearchParams();

	const [data, loading] = useFetch(`/collections/answers?${query.get('sortBy')
		? 'sortBy=' + query.get('sortBy')
		: 'sortBy=score%20desc'}&page=${query.get('page') || 1}&pageSize=${pageSize}&populate=owner&${urlOptions}`)
	const [docsCount] = useFetch(`/collections/answers?count=true&${urlOptions}`);

	const handleQuery = (page, sortBy) => setQuery({
		page: page || 1,
		sortBy: sortBy || 'score%20desc',
	})

	const handleSort = (e) => {
		const sort = e.target.value;
		const page = query.get('page');
		if (sort) handleQuery(page, sort)
	}

	// TODO Remove query string from jsx!!!
	const handlePage = (changeNum) => {
		let page = query.get('page');
		if (page) page = parseInt(page) + changeNum;
		if (!page) page = 1 + changeNum;
		const sort = query.get('sortBy');
		handleQuery(page, sort);
	}

	const content = <>
		{data.map(x => <AnswerCard key={x._id} answer={x} />)}

		< FeedOptionsContainer
			handlePage={handlePage}
			isDisabled={(query.get('page') || 1) >= Math.ceil(docsCount / pageSize)}
			page={query.get('page')}
			sort={query.get('sortBy')}
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
	</>

	return (
		<>
			<div className='col-span-5 md:col-span-3 grid gap-2 w-full h-fit'>
				<FeedOptionsContainer
					isDisabled={(query.get('page') || 1) >= Math.ceil(docsCount / pageSize)}
					page={query.get('page')}
					sort={query.get('sortBy')}
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
						{data.length > 0 ? content : <NoContent content='answers' />}
					</>
				}
			</div>
		</>
	)
}
