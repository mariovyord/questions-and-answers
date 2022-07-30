import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toTitleCase } from '../../utils/stringUtils';
import RecentQuestionsList from '../feautures/RecentQuestionsList';
import Feed from '../feed/Feed';
import useFetch from '../../hooks/useFetch';
import Modal from '../common/Modal';
import CreateCircleForm from '../CirclesPage/CreateCircleForm/CreateCircleForm';
import { FiEdit } from 'react-icons/fi';
import { getCircleById } from '../../services/data.service';
import useNotificationContext from '../../hooks/useNotificationContext';

const CircleDetails = () => {
	const { _id } = useParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	const [openModal, SetOpenModal] = useState(false);
	const handleNotifications = useNotificationContext();

	const handleModal = () => {
		SetOpenModal(!openModal);
	}

	const handleNewData = (newData) => {
		setData(newData);
	}

	useEffect(() => {
		getCircleById(_id)
			.then(x => {
				setData(x.result);
			})
			.catch(err => {
				handleNotifications('error', 'Error fetching data from server');
			})
			.finally(() => {
				setLoading(false);
			})
	}, [_id])

	useEffect(() => {
		document.title = "Circle Details"
	}, []);

	return (
		<div className='grid grid-cols-5 gap-2 max-w-5xl p-2'>
			<div className='col-span-5 md:col-span-3 flex flex-col gap-2 '>
				{/* TODO Add shadow loading */}
				{loading
					? <div>
						<img src="" alt="circle" />
						<h1>Loading</h1>
						<h3>Loading</h3>
					</div>
					: <div className='bg-primary p-8 rounded-lg shadow'>
						<div className='max-h-16 overflow-hidden rounded-lg'>
							<img src={data.imageUrl} alt="circle" />
						</div>
						<h1 className='font-bold text-5xl my-6'>{toTitleCase(data.title)}</h1>
						<h3 className='italic'>{data.description}</h3>
					</div>}

				{/* Answers */}
				<Feed urlOptions={`where=circle=${_id}`} />

			</div>
			<div className='col-span-5 md:col-span-2 p-3 flex flex-col gap-2'>
				<RecentQuestionsList />
			</div>
			{data && <>
				<button
					onClick={() => handleModal()}
					className='btn btn-secondary fixed bottom-6 right-6 btn-circle text-5xl leading-20 tooltip tooltip-top flex justify-center'
					data-tip='Edit'
				>
					<FiEdit size={'30px'} />
				</button>
				{
					openModal && <Modal handleModal={handleModal} >
						<CreateCircleForm handleModal={handleModal} defaultVals={data} handleNewData={handleNewData} />
					</Modal>
				}
			</>}
		</div >
	)
}

export default CircleDetails