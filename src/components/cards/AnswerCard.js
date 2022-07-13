import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";

export default function AnswerCard({ answer }) {
	return (
		<div className='w-full bg-base-100 shadow p-4 rounded-lg'>

			{/* User info */}
			<div className='flex'>
				<div className="avatar">
					<div className="w-10 rounded-full">
						<img src="https://placeimg.com/192/192/people" alt='Profile' />
					</div>
				</div>
				<span className='font-bold flex ml-3'>
					<Link to={'/users/' + answer.owner._id} className='place-self-center link-hover'>{answer.owner.firstName} {answer.owner.lastName}</Link>
				</span>
			</div>

			{/* Question */}
			<div className='py-2'>
				<div className='font-bold'>
					<Link to={"/questions/" + answer.parent._id} className='link-hover'>{answer.parent.body}</Link>
				</div>
				<div>
					<span className='text-xs text-gray-500'>Circle: <Link to={"/circles/" + answer.parent.parent} className='link-hover'>{answer.meta.circle}</Link></span>
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
			<div className='flex justify-center gap-2 border-t-2 pt-3 mt-3'>
				<button><BsArrowUpCircle size={'25px'} /></button>
				<button><BsArrowDownCircle size={'25px'} /></button>
			</div>
		</div>
	)
}
