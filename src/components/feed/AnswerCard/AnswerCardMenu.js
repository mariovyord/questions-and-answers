import React from 'react';
import { Link } from 'react-router-dom';
import { BsHandThumbsUpFill, BsHandThumbsUp, BsHandThumbsDown, BsHandThumbsDownFill } from 'react-icons/bs';

export default function AnswerCardMenu({ isHiddenBtn, isLoggedIn, userVote, handleVote, score, answerId }) {

	const asnwerUrl = '/answers/' + answerId;

	return (
		<div className='flex justify-between gap-2 border-t-2 pt-3 mt-3 h-16'>
			<div className='flex justify-center gap-2'>

				<button disabled={!isLoggedIn} onClick={() => handleVote('upvote')} className={`tooltip tooltip-bottom tooltip-info ${isLoggedIn ? null : 'opacity-30'}`} data-tip="Upvote">
					{userVote.upvote ? <BsHandThumbsUpFill size={'25px'} /> : <BsHandThumbsUp size={'25px'} />}
				</button>
				<button disabled={!isLoggedIn} onClick={() => handleVote('downvote')} className={`tooltip tooltip-bottom tooltip-info ${isLoggedIn ? null : 'opacity-30'}`} data-tip="Downvote">
					{userVote.downvote ? <BsHandThumbsDownFill size={'25px'} /> : <BsHandThumbsDown size={'25px'} />}
				</button>

				<div className='pt-[13%] text-lg tooltip tooltip-bottom tooltip-info' data-tip={'Score'}>{score}</div>
			</div>
			{!isHiddenBtn && <div className='w-1/2'>
				<Link to={asnwerUrl} className='btn btn-primary w-full'>
					Details
				</Link>
			</div>
			}
		</div >
	)
}
