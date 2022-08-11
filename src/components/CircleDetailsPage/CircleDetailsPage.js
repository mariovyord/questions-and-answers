import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useNotificationContext from '../../hooks/useNotificationContext';
import useUserData from '../../hooks/useUserData';
import isAuth from '../../hoc/isAuth';

import * as dataService from '../../services/data.service';
import { toTitleCase } from '../../utils/stringUtils';

import { FiEdit } from 'react-icons/fi';
import RecentQuestionsList from '../feautures/RecentQuestionsList';
import AnswersFeed from '../AnswersFeed/AnswersFeed';
import Modal from '../common/Modal';
import CreateCircleForm from '../CirclesPage/CreateCircleForm/CreateCircleForm';

const CircleDetails = () => {
	const { _id: circleId } = useParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const [openModal, SetOpenModal] = useState(false);
	const handleNotifications = useNotificationContext();
	const navigate = useNavigate();

	const userData = useUserData();

	const handleModal = () => {
		SetOpenModal(!openModal);
	}

	const handleNewData = (newData) => {
		setData(newData);
	}

	const handleDelete = (circleId) => {
		setDeleteLoading(true);
		dataService.getQuestionsInCircleCount(circleId)
			.then(x => {
				return Number(x.result) > 0
			})
			.then(c => {
				if (c) {
					handleNotifications('error', 'Circle cannot be deleted if there are posted questions!')
					setDeleteLoading(false);
				} else {
					dataService.deleteCircle(circleId)
						.then(x => {
							handleNotifications('success', 'Circle deleted!');
							setDeleteLoading(false);
							navigate('/');
						})
						.catch(err => {
							handleNotifications('error', 'Something unexpected happened!');
							setDeleteLoading(false);
						})
				}
			})
	}

	useEffect(() => {
		dataService.getCircleById(circleId)
			.then(x => {
				setData(x.result);
			})
			.catch(err => {
				navigate('/circles');
				handleNotifications('error', 'Error fetching data from server');
			})
			.finally(() => {
				setLoading(false);
			})
	}, [circleId])

	useEffect(() => {
		document.title = "Circle Details"
	}, []);

	return (
		<div className='grid grid-cols-5 gap-2 max-w-6xl p-2 w-full'>
			<div className='col-span-5 md:col-span-3 flex flex-col gap-2 w-full'>
				{loading
					? <div className='bg-primary h-56 rounded-lg shadow w-full animate-pulse' >

					</div>
					: <div className='bg-primary p-8 rounded-lg shadow w-full'>
						<div className='max-h-16 overflow-hidden rounded-lg'>
							<img src={data.imageUrl} alt="circle" />
						</div>
						<h1 className='font-bold text-5xl my-6'>{toTitleCase(data.title)}</h1>
						<h3 className='italic'>{data.description}</h3>
					</div>}

				{/* Answers */}
				<AnswersFeed options={`where=circle=${circleId}`} />

			</div>
			<div className='col-span-5 md:col-span-2 p-3 flex flex-col gap-2'>
				{data && <RecentQuestionsList pageSize={20} circleId={data._id} />}
			</div>
			{data && userData._id === data.owner && <>
				<button
					onClick={() => handleModal()}
					className='btn btn-secondary fixed bottom-6 right-20 btn-circle text-5xl leading-20 tooltip tooltip-top flex justify-center'
					data-tip='Edit'
				>
					<FiEdit size={'30px'} />
				</button>
				{
					openModal && <Modal handleModal={handleModal} >
						<CreateCircleForm handleModal={handleModal} defaultVals={data} handleNewData={handleNewData} />
						<button disabled={deleteLoading} onClick={() => handleDelete(circleId)} className='btn btn-error mt-2 w-full'>Delete</button>
					</Modal>
				}
			</>}
		</div >
	)
}

export default isAuth(CircleDetails);