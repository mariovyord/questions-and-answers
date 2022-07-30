import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import useFetch from '../../hooks/useFetch';

const RecentQuestionsList = ({ pageSize = 10, circleId }) => {
	const url = circleId
		? `/collections/questions?page=1&pageSize=${pageSize}&sortBy=createdAt%20desc&where=circle=${circleId}`
		: `/collections/questions?page=1&pageSize=${pageSize}&sortBy=createdAt%20desc`

	const [data, loading] = useFetch(url);

	return (
		<div className='p-2'>
			<h2 className='text-xl font-bold'>Recent questions</h2>
			<ul>
				{loading
					? <Spinner />
					: data.map(x => <li key={x._id} className="link-hover mb-1"><Link to={`/questions/${x._id}`}>{x.body}</Link></li>)
				}
			</ul>
		</div>

	)
}

export default RecentQuestionsList;