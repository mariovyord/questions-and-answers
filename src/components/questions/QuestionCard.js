import React from 'react';
import { Link } from 'react-router-dom';

export default function QuestionCard({ data }) {
	return (
		<div className='bg-base-100 rounded-sm p-2'>
			<Link to="/questions/123" className='font-bold text-lg link-hover block'>
				{data.question}
			</Link>
			<span>Circle: </span>{data.tags.map(x =>
				<Link to="/" className='bg-base-100 link-hover'>
					{x}
				</Link>)}

		</div>
	)
}
