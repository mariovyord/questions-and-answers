import React from 'react';
import { Link } from 'react-router-dom';
import { toTitleCase } from '../../utils/stringUtils';
import { BiHide } from 'react-icons/bi'
import { hideQuestionById } from '../../services/data.service';
import useNotificationContext from '../hooks/useNotificationContext';

export default function QuestionCard({ data }) {
	const questionUrl = '/questions/' + data._id;
	const circleUrl = '/circles/' + data.circle;

	const handleNotification = useNotificationContext();

	const handleHide = () => {
		const confirmation = window.confirm('Are you sure?')
		if (confirmation) hideQuestionById(data._id, true)
			.then(x => {
				handleNotification('success', 'Question hidden from profile!')
			})
			.catch(err => {
				handleNotification('error', 'Something went wrong!')
			})
	}

	return (
		<div className='w-full bg-base-100 shadow p-4 rounded-lg transition-all relative'>
			<div onClick={handleHide} className='absolute top-2 right-2 cursor-pointer link-hover tooltip tooltip-bottom' data-tip="Hide from profile">
				<BiHide />
			</div>

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
