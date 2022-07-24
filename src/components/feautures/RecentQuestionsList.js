import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import useFetch from '../hooks/useFetch';

const RecentQuestionsList = () => {
	// Add select only titles and ids
	const [data, loading, errors] = useFetch('/collections/questions?page=1&pageSize=10&sortBy=createdAt%20desc')

	return (
		<div className='p-2'>
			<h2 className='font-bold text-xl'>Recent questions</h2>
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