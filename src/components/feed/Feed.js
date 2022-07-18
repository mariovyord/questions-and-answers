import React from 'react';
import { useSearchParams } from 'react-router-dom';
import FeedOptions from './FeedOptions';
import AnswerCard from './AnswerCard/AnswerCard';
import useFetch from '../hooks/useFetch';
import { PAGE_SIZE } from '../../constants';

export default function Feed({ urlOptions = '' }) {
	const [query, setQuery] = useSearchParams();

	// TODO Add error handling!
	const { data, loading, error } = useFetch(`/collections/answers?${query.get('sortBy')
		? 'sortBy=' + query.get('sortBy')
		: 'sortBy=score%20desc'}&page=${query.get('page') || 1}&pageSize=${PAGE_SIZE}&populate=owner${urlOptions}`)
	const { data: docsCount } = useFetch(`/collections/answers?count=true`);

	const handleQuery = (page, sortBy) => setQuery({
		page: page || 1,
		sortBy: sortBy || 'score%20desc',
	})

	const handleSort = (e) => {
		const sort = e.target.value;
		const page = query.get('page');
		if (sort === 'most-recent') {
			handleQuery(page, 'createdAt%20desc');
		} else {
			handleQuery(page);
		}
	}

	const handlePage = (changeNum) => {
		let page = query.get('page');
		if (page) page = parseInt(page) + changeNum;
		if (!page) page = 1 + changeNum;
		const sort = query.get('sortBy');
		handleQuery(page, sort);
	}

	return (
		<>
			{loading
				// TODO Add Loading spinner and stuff
				? <div className='col-span-5 md:col-span-3 grid gap-2 h-screen bg-base-100 rounded-lg w-full'>
					< FeedOptions handleSort={handleSort} />
				</div >
				: <div className='col-span-5 md:col-span-3 grid gap-2'>
					<FeedOptions handleSort={handleSort} handlePage={handlePage} page={query.get('page')} docsCount={docsCount} sort={query.get('sortBy')} />
					{data.map(x => <AnswerCard key={x._id} answer={x} />)}
					<FeedOptions handleSort={handleSort} handlePage={handlePage} page={query.get('page')} docsCount={docsCount} />
				</div>
			}
		</>)
}
