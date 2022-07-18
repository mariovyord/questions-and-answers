import React from 'react';
import Stats from './feautures/Stats';
import CirlclesList from './feautures/CirclesList';
import QuestionCard from './cards/QuestionCard';
import useFetch from './hooks/useFetch';

export default function Questions({ questions }) {

	const { data, loading, error } = useFetch(`/collections/questions`)
	const { data: docsCount } = useFetch(`/collections/questions?count=true`);

	return (
		<div className='grid grid-cols-5 gap-2 max-w-5xl py-2'>
			{/* Sidebar Left */}
			<div className='col-span-1'>
				<CirlclesList />
			</div>

			{/* Main Feed */}
			{
				loading
					? <h1>Lodaingasdas</h1>
					: <>
						<div className='col-span-3'>
							<ul className='grid gap-2'>
								{/* TODO Change it to quiestions prop */}
								{data.map(x => <li><QuestionCard data={x} /></li>)}
							</ul>
						</div>
					</>
			}

			{/* Sidebar Right */}
			<div className='col-span-1'>
				<Stats />
			</div>
		</div>

	)
}
