import React from 'react';
import { Link } from 'react-router-dom';
import { toTitleCase } from '../../utils/stringUtils';

export default function QuestionCard({ data }) {
	const questionUrl = '/questions/' + data._id;
	const circleUrl = '/circles/' + data.circle;

	return (
		<div className='w-full bg-base-100 shadow p-4 rounded-lg transition-all'>
			<Link to={questionUrl} className='font-bold text-lg link-hover block'>
				{data.body}
			</Link>

			<span>Circle: </span>

			<Link to={circleUrl} className='bg-base-100 link-hover'>
				{toTitleCase(data.meta.circle)}
			</Link>

		</div>
	)
}
