import React from 'react';
import { Link } from 'react-router-dom';

const CommentCard = ({ comment }) => {
	return (
		<div className='w-full bg-base-100 shadow p-4 rounded-lg'>
			{/* User */}
			<div className='flex'>
				<div className="avatar">
					<div className="w-10 rounded-full">
						{/* Link to user profile */}
						<Link to={'/profile/' + comment.owner._id} className='place-self-center link-hover'>
							<img src={comment.owner.imageUrl} alt='Profile' />
						</Link>
					</div>
				</div>
				<span className='font-bold flex ml-3'>
					{/* Link to user profile */}
					<Link to={'/profile/' + comment.owner._id} className='place-self-center link-hover'>{comment.owner.firstName} {comment.owner.lastName}</Link>
				</span>
			</div>
			{/* Comment itself */}
			<div>
				<textarea disabled className='w-full'>{comment.body}</textarea>
			</div>
		</div>
	)
}

export default CommentCard