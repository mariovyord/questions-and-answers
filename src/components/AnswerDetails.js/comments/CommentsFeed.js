import React from 'react';
import useFetch from '../../hooks/useFetch';
import CommentCard from './CommentCard';

const CommentsFeed = ({ answerId, newComments }) => {
	const [comments, loadingComments, errorsComments] = useFetch(`/collections/comments?where=answer=${answerId}&populate=owner`)

	return (
		<>
			<h2 className='font-bold text-2xl mb-2'>Comments</h2>
			<div className='flex flex-col gap-2'>
				{loadingComments && 'Loading'}
				{!loadingComments && comments.length === 0 && 'No comments'}
				{!loadingComments && comments.length > 0 && <>
					{comments.map(x => <div key={x._id}>{<CommentCard comment={x} />}</div>)}
					{newComments.map(x => <div key={x._id}>{<CommentCard comment={x} />}</div>)}
				</>}
			</div>
		</>
	)
}

export default CommentsFeed;