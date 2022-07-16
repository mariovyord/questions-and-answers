import React from 'react';
import { Link } from 'react-router-dom';
import { BsHandThumbsUpFill, BsHandThumbsUp, BsHandThumbsDown, BsHandThumbsDownFill } from 'react-icons/bs';

export default function AnswerCardMenu({ userVote, handleVote, score, answerId }) {

	const asnwerUrl = '/answers/' + answerId;

	return (
		<div className='flex justify-between gap-2 border-t-2 pt-3 mt-3'>
			<div className='flex justify-center gap-2'>
				<button onClick={() => handleVote('upvote')}>
					{userVote.upvote ? <BsHandThumbsUpFill size={'25px'} /> : <BsHandThumbsUp size={'25px'} />}
				</button>
				<button onClick={() => handleVote('downvote')}>
					{userVote.downvote ? <BsHandThumbsDownFill size={'25px'} /> : <BsHandThumbsDown size={'25px'} />}
				</button>

				<div className='pt-[13%] text-lg'>{score || 0}</div>
			</div>
			<div className='w-1/2'>
				<Link to={asnwerUrl} className='btn btn-primary w-full'>
					Details
				</Link>
			</div>
		</div >
	)
}
