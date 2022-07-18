import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import FeedOptions from './FeedOptions';
import AnswerCard from '../cards/AnswerCard/AnswerCard';
import useFetch from '../hooks/useFetch';
import { PAGE_SIZE } from '../../constants';

export default function Feed({ urlOptions }) {
	let { pageParam } = useParams();
	const [query, setQuery] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();

	// TODO Add error handling!
	const { data, loading, error } = useFetch(`/collections/answers?${query.get('sortBy') || 'sortBy=score%20desc'}&page=${pageParam || 1}&pageSize=${PAGE_SIZE}}&populate=owner${urlOptions}`)
	const { data: docsCount } = useFetch(`/collections/answers?count=true`);

	const handleSort = (e) => {
		const sort = e.target.value;
		console.log(sort)
		if (sort === 'most-recent') {
			setQuery({ 'sortBy': 'sortBy=createdAt%20desc' });
		} else {
			setQuery({ 'sortBy': 'sortBy=score%20desc' });
		}
	}

	const handlePage = (changeNum) => {
		if (!pageParam) {
			return navigate(`/2${location.search}`);
		};
		navigate('/' + (parseInt(pageParam) + changeNum) + location.search);
	}

	return (
		<>
			{loading
				// TODO Add Loading spinner and stuff
				? <div className='col-span-5 md:col-span-3 grid gap-2 h-screen bg-base-100 rounded-lg'>
					< FeedOptions handleSort={handleSort} />
				</div >
				: <div className='col-span-5 md:col-span-3 grid gap-2'>
					<FeedOptions handleSort={handleSort} handlePage={handlePage} page={pageParam} docsCount={docsCount} sort={query.get('sortBy')} />
					{data.map(x => <AnswerCard key={x._id} answer={x} />)}
					<FeedOptions handleSort={handleSort} handlePage={handlePage} page={pageParam} docsCount={docsCount} />
				</div>
			}
		</>)
}
