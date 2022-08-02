import React, { useEffect, useState } from 'react';
import { getComments, getOneComment } from '../../../services/data.service';
import useNotificationContext from '../../../hooks/useNotificationContext';
import AddComment from './AddComment';
import CommentCard from './CommentCard';

const CommentsSection = ({ answerId, userData }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleNotification = useNotificationContext();

	useEffect(() => {
		setLoading(true)

		getComments(answerId)
			.then(result => {
				setData(result.result);
			})
			.catch(err => {
				handleNotification('error', 'Error fetching data from server')
			})
			.finally(() => {
				setLoading(false);
			})

	}, [answerId])

	const addComment = (comment) => {
		getOneComment(comment._id)
			.then(c => {
				setData(x => [...data, c.result])
			})
			.catch(err => {
				handleNotification(err[0]?.message || 'Something went wrong')
			})
	}

	const handleChange = (filterFunc) => {
		setData((x) => x.filter(filterFunc));
	}

	return (
		<>
			{userData && <div className='p-4'>
				<AddComment answerId={answerId} addComment={addComment} />
			</div>}
			<div className='p-4'>
				<h2 className='font-bold text-2xl mb-2'>Comments</h2>
				<div className='flex flex-col gap-2'>
					{loading && 'Loading'}
					{!loading && data.length === 0 && 'No comments'}
					{!loading && data.length > 0 && <>
						{data.map(x => <div key={x._id}>{<CommentCard comment={x} handleChange={handleChange} />}</div>)}
					</>}
				</div>
			</div>
		</>
	)
}

export default CommentsSection