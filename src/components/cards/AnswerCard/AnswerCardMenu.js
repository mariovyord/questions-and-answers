import React from 'react';
import { BsHandThumbsUp, BsHandThumbsDown, BsHandThumbsDownFill, BsHandThumbsUpFill } from 'react-icons/bs';

export default function AnswerCardMenu({ userVote, handleVote }) {
	return (
		<div className='flex justify-center gap-2 border-t-2 pt-3 mt-3'>
			<button onClick={() => handleVote('upvote')}>
				{userVote.upvote ? <BsHandThumbsUpFill size={'25px'} /> : <BsHandThumbsUp size={'25px'} />}
			</button>
			<button onClick={() => handleVote('downvote')}>
				{userVote.downvote ? <BsHandThumbsDownFill size={'25px'} /> : <BsHandThumbsDown size={'25px'} />}
			</button>
		</div >
	)
}
