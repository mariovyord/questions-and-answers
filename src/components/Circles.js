import React from 'react';
import CircleCard from './cards/CircleCard';
import useFetch from './hooks/useFetch';
import Spinner from './utils/Spinner';

export default function Circles() {
	const { data, loading, error } = useFetch(`/collections/circles`);

	return (
		<div >
			<h2 className='font-bold text-center text-3xl my-5'>Main circles</h2>
			<div className='flex gap-2 flex-wrap max-w-5xl p-2 justify-center'>
				{/* Main Feed */}
				{
					loading
						? <Spinner />
						: <>
							{/* TODO Change it to quiestions prop */}
							{data.map(x => <CircleCard data={x}></CircleCard>)}
						</>
				}
			</div>
		</div>

	)
}
