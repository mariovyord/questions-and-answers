import React from 'react';
import CircleCard from './cards/CircleCard';
import useFetch from './hooks/useFetch';

export default function Circles() {
	const { data, loading, error } = useFetch(`/collections/circles`);
	const { data: docsCount } = useFetch(`/collections/circles?count=true`);
	console.log(data)
	return (
		<div >
			<h2 className='font-bold text-center text-3xl my-5'>Main circles</h2>
			<div className='flex gap-2 flex-wrap max-w-5xl p-2 justify-center'>
				{/* Main Feed */}
				{
					loading
						? <h1>Lodaingasdas</h1>
						: <>
							{/* TODO Change it to quiestions prop */}
							{data.map(x => <CircleCard data={x}></CircleCard>)}
						</>
				}
			</div>
		</div>

	)
}
