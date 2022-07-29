import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toTitleCase } from '../../utils/stringUtils';
import RecentQuestionsList from '../feautures/RecentQuestionsList';
import Feed from '../feed/Feed';
import useFetch from '../../hooks/useFetch';

const CircleDetails = () => {
	const { _id } = useParams();
	const [data, loading] = useFetch(`/collections/circles/${_id}`);

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
		</div >
	)
}

export default CircleDetails