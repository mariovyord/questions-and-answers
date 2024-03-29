import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as dataService from '../../services/data.service';

import useNotificationContext from '../../hooks/useNotificationContext';

import CircleCard from '../cards/CircleCard';
import Spinner from '../common/Spinner';
import { BsPlus } from 'react-icons/bs';
import Modal from '../common/Modal';
import CreateCircleForm from './CreateCircleForm/CreateCircleForm';

const CirclesPage = () => {
	const [coreCircles, setCoreCircles] = useState(null);
	const [loadingCoreCircles, setLoadingCoreCircles] = useState(true);

	const [userCircles, setUserCircles] = useState(null);
	const [loadingUserCircles, setLoadingUserCircles] = useState(false);

	const handleNotifications = useNotificationContext();
	const navigate = useNavigate()

	const [openModal, SetOpenModal] = useState(false);

	useEffect(() => {
		setLoadingCoreCircles(true);

		dataService.getCoreCircles()
			.then(x => {
				setCoreCircles(x.result)
			})
			.catch(err => {
				handleNotifications('error', 'Error fetching data from server');
				navigate('/');
			})
			.finally(() => {
				setLoadingCoreCircles(false);
			})
	}, [])


	const handleModal = () => {
		SetOpenModal(!openModal);
	}

	const handleLoadUserCircles = () => {
		setLoadingUserCircles(true);
		dataService.getUserCircles()
			.then(x => {
				setUserCircles(x.result)
			})
			.catch(err => {
				handleNotifications('error', 'Error fetching data from server')
			})
			.finally(() => {
				setLoadingUserCircles(false);
			})
	}

	useEffect(() => {
		document.title = "Circles"
	}, []);

	return (
		<div >
			<h2 className='font-bold text-center text-3xl my-5'>Main circles</h2>

			<div className='grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2'>

				{/* Main Feed */}
				{loadingCoreCircles
					? <Spinner />
					: coreCircles.map(x => <div key={x._id} className='col-span-1 h-72'><CircleCard data={x}></CircleCard></div>)}

			</div>

			<h2 className='font-bold text-center text-3xl my-5'>User circles</h2>

			{!userCircles && <div className='flex flex-col justify-center items-center'>
				<button onClick={handleLoadUserCircles} className='btn btn-primary max-w-xs'>Load user circles</button>
			</div>}

			<div className='grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2'>
				{loadingUserCircles
					? <Spinner />
					: userCircles && userCircles.map(x => <div key={x._id} className='col-span-1 h-72'><CircleCard data={x}></CircleCard></div>)
				}
			</div>

			<button
				onClick={() => handleModal()}
				className='btn btn-secondary fixed bottom-6 right-20 btn-circle text-5xl leading-20 tooltip tooltip-top'
				data-tip='Create'
			>
				<BsPlus />
			</button>
			{
				openModal && <Modal handleModal={handleModal} >
					<CreateCircleForm handleModal={handleModal} />
				</Modal>
			}
		</div>

	)
}

export default CirclesPage;