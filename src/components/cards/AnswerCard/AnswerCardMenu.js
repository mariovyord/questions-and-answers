import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export default function AnswerCardMenu({ userVote, handleVote, score, answerId }) {

	const asnwerUrl = '/answers/' + answerId;

	return (
		<div className='flex justify-between gap-2 border-t-2 pt-3 mt-3'>
			<div className='flex justify-center gap-2'>
				<button onClick={() => handleVote('upvote')} className='tooltip tooltip-bottom z-10' data-tip='Give it a star!'>
					{userVote.upvote ? <AiFillStar size={'35px'} className="text-accent drop-shadow-[0_0_1px_black]" /> : <AiOutlineStar className="text-primary" size={'35px'} />}
				</button>

				<div className='pt-[16%] text-lg'>{score || 0}</div>
			</div>
			<div className='w-1/2'>
				<Link to={asnwerUrl} className='btn btn-primary w-full'>
					Details
				</Link>
			</div>
		</div >
	)
}
