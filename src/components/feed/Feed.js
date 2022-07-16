import React, { useState } from 'react';
import FeedOptions from './FeedOptions';
import AnswerCard from '../cards/AnswerCard/AnswerCard';
import useFetch from '../hooks/useFetch';
import { PAGE_SIZE } from '../../constants';

export default function Feed({ urlOptions }) {
	const [sort, setSort] = useState('sortBy=score%20desc')
	const [page, setPage] = useState(0);

	// TODO Add error handling!
	const { data, loading, error } = useFetch(`/collections/answers?${sort}&offset=${page * PAGE_SIZE}&pageSize=${PAGE_SIZE}}&populate=owner${urlOptions}`)
	const { data: docsCount } = useFetch(`/collections/answers?count=true`);

	const handleSort = (e) => {
		const sort = e.target.value;
		if (sort === 'most-recent') {
			setSort('sortBy=createdAt%20desc')
		} else {
			setSort('sortBy=score%20desc')
		}
	}

	const handlePage = (pageNum) => {
		setPage(pageNum);
	}

	return (
		<>
			{loading
				? <div className='col-span-5 md:col-span-3 grid gap-2 h-screen bg-base-100 rounded-lg'>
					< FeedOptions handleSort={handleSort} />
				</div >
				: <div className='col-span-5 md:col-span-3 grid gap-2'>
					<FeedOptions handleSort={handleSort} handlePage={handlePage} page={page} docsCount={docsCount} />
					{data.map(x => <AnswerCard key={x._id} answer={x} />)}
					<FeedOptions handleSort={handleSort} handlePage={handlePage} page={page} docsCount={docsCount} />
				</div>
			}
		</>)
}
