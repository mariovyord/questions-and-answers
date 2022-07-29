import React, { useEffect } from 'react';
import CircleCard from '../cards/CircleCard';
import useFetch from '../hooks/useFetch';
import NoContent from '../common/NoContent';
import Spinner from '../common/Spinner';

export default function CirclesPage() {
	const [data, loading] = useFetch(`/collections/circles`);

	useEffect(() => {
		document.title = "Circles"
	}, []);

	const content = data.map(x => <CircleCard key={x._id} data={x}></CircleCard>)

	return (
		<div >
			<h2 className='font-bold text-center text-3xl my-5'>Main circles</h2>
			<div className='flex gap-2 flex-wrap max-w-5xl p-2 justify-center'>
				{/* Main Feed */}
				{
					loading
						? <Spinner />
						: <> {data.length > 0 ? content : <NoContent content='circles' />} </>
				}
			</div>
		</div>

	)
}