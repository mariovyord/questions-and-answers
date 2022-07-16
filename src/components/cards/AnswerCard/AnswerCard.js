import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import AnswerCardMenu from './AnswerCardMenu';

export default function AnswerCard({ answer }) {
	const [isCardOpen, setIsCardOpen] = useState(false);
	const [userVote, setUserVote] = useState({ upvote: false, downvote: false })

	// TODO Add request to API
	const handleVote = (action) => {
		const vote = { ...userVote };

		if (action === 'upvote') {
			vote.upvote = !vote.upvote;
			if (vote.downvote === true) vote.downvote = false;
		} else if (action === 'downvote') {
			vote.downvote = !vote.downvote;
			if (vote.upvote === true) vote.upvote = false;
		}

		setUserVote(vote);
	}

	useEffect(() => {
		setIsCardOpen(true);
	}, [])

	return (
		<div className={isCardOpen ? 'w-full bg-base-100 shadow p-4 rounded-lg transition-all' : 'opacity-0 h-0 transition-all'}>

			{/* User info */}
			<div className='flex'>
				<div className="avatar">
					<div className="w-10 rounded-full">
						{/* Link to user profile */}
						<Link to={'/users/' + answer.owner._id} className='place-self-center link-hover'>
							<img src={answer.owner.imageUrl} alt='Profile' />
						</Link>
					</div>
				</div>
				<span className='font-bold flex ml-3'>
					{/* Link to user profile */}
					<Link to={'/users/' + answer.owner._id} className='place-self-center link-hover'>{answer.owner.firstName} {answer.owner.lastName}</Link>
				</span>
			</div>

			{/* Question */}
			<div className='py-2'>
				<div className='font-bold'>
					{/* Link to question details */}
					<Link to={"/questions/" + answer.question} className='link-hover'>{answer.meta.question}</Link>
				</div>
				<div>
					{/* Link to circle details */}
					<span className='text-xs text-gray-500'>Circle: <Link to={"/circles/" + answer.circle} className='link-hover'>{answer.meta.circle}</Link></span>
				</div>
			</div>

			{/* Answer */}
			<div>
				<MDEditor.Markdown
					source={answer.body}
					style={{
						whiteSpace: 'pre-wrap',
						backgroundColor: 'hsl(var(--b1))',
						color: 'hsl(var(--bc))',
					}}
					previewOptions={{
						rehypePlugins: [[rehypeSanitize]],
					}}
				/>
			</div>

			{/* Menu buttons */}
			<AnswerCardMenu userVote={userVote} handleVote={handleVote} score={answer.score} answerId={answer._id} />
		</div>
	)
}
