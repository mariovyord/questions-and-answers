import React from 'react';
import mainCircles from '../../data/circles/circles.json';
import CircleCard from '../cards/CircleCard';

const FeauturedCircle = () => {
	const randomCircle = mainCircles[Math.floor((Math.random() * mainCircles.length))]
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center h-12'>
				<h2 className='text-xl font-bold'>Feautured circle</h2>
			</div>
			<CircleCard data={randomCircle} />
		</div>
	)
}

export default FeauturedCircle;
