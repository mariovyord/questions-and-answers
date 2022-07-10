import React from 'react';
import CircleCard from './CircleCard';

export default function Circles() {
	return (
		<div >
			<h2 className='font-bold text-center text-3xl my-5'>Core circles</h2>
			<div className='flex gap-2 flex-wrap max-w-5xl py-2 justify-center'>
				<CircleCard></CircleCard>
				<CircleCard></CircleCard>
				<CircleCard></CircleCard>
				<CircleCard></CircleCard>
				<CircleCard></CircleCard>
				<CircleCard></CircleCard>
				<CircleCard></CircleCard>
				<CircleCard></CircleCard>
			</div>
			<h2 className='font-bold text-center text-3xl my-5'>User circles</h2>
			<div className='flex gap-2 flex-wrap max-w-5xl py-2 justify-center'>
				<CircleCard></CircleCard>
				<CircleCard></CircleCard>
				<CircleCard></CircleCard>
				<CircleCard></CircleCard>
				<CircleCard></CircleCard>
				<CircleCard></CircleCard>
				<CircleCard></CircleCard>
				<CircleCard></CircleCard>
			</div>
		</div>

	)
}
