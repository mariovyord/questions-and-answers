import React from 'react';
import AnswerCard from './cards/AnswerCard';
import SortSelect from './common/SortSelect';

export default function Profile() {
	return (
		<div className='grid grid-cols-5 gap-2 max-w-5xl py-2'>
			{/* Sidebar */}
			<div className='col-span-2'>
				<h2>Mario Yordanov</h2>
				<p>MERN web developer</p>
			</div>
			{/* Main Feed */}
			<div className='col-span-3 grid gap-2'>
				<SortSelect />
				<AnswerCard />
				<AnswerCard />
				<AnswerCard />
			</div>
		</div>

	)
}
