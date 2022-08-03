import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import useNotificationContext from '../../hooks/useNotificationContext';
import useUserData from '../../hooks/useUserData';

import * as dataService from '../../services/data.service';

import { toTitleCase } from '../../utils/stringUtils';

import { BiHide } from 'react-icons/bi'
import Modal from '../common/Modal';

export default function QuestionCard({ data }) {
	const questionUrl = '/questions/' + data._id;
	const circleUrl = '/circles/' + data.circle;

	const handleNotification = useNotificationContext();
	const userData = useUserData();

	const [openModal, SetOpenModal] = useState(false);

	const handleModal = () => {
		SetOpenModal(!openModal);
	}

	const handleHide = () => {
		dataService.hideQuestionById(data._id, true)
			.then(x => {
				handleNotification('success', 'Question hidden from profile!')
			})
			.then(x => {
				handleModal();
			})
			.catch(err => {
				handleNotification('error', 'Something went wrong!')
			})
	}

	return (
		<>
			<div className='w-full bg-base-100 shadow p-4 rounded-lg transition-all relative'>
				{userData && userData._id === data.owner && <div
					onClick={() => handleModal()}
					className='absolute top-2 right-2 cursor-pointer link-hover tooltip tooltip-bottom'
					data-tip="Hide from profile">
					<BiHide />
				</div>
				}

				<Link to={questionUrl} className='font-bold text-lg link-hover block'>
					{data.body}
				</Link>

				<span>Circle: </span>

				<Link to={circleUrl} className='bg-base-100 link-hover'>
					{toTitleCase(data.meta.circle)}
				</Link>

			</div>

			{
				openModal && <Modal handleModal={handleModal} >
					<p className='font-bold text-xl mb-7'>Are you sure you want to hide question (can't be undone)?</p>
					<button onClick={() => handleHide()} type='button' className='btn btn-secondary w-1/3'>Yes</button>
					<button onClick={() => handleModal()} type='button' className='btn btn-primary w-2/3'>No</button>
				</Modal>
			}
		</>
	)
}
