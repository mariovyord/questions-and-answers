import React, { useEffect } from 'react';
import AnswerCard from './cards/AnswerCard';
import Stats from './sidebar/Stats';
import CirlclesList from './sidebar/CirclesList';
import SortSelect from './common/SortSelect';
import { themeChange } from 'theme-change';

export default function Home() {
	useEffect(() => {
		themeChange(false);
	}, [])
	return (
		<div className='grid grid-cols-5 gap-2 max-w-5xl py-2'>
			{/* Sidebar */}
			<div className='col-span-1'>
				<CirlclesList />
			</div>
			{/* Main Feed */}
			<div className='col-span-3 grid gap-2'>
				<SortSelect />
				<AnswerCard />
				<AnswerCard />
				<AnswerCard />
			</div>
			<div className='col-span-1'>
				<div>
					<h3 className='text-center font-bold'>Select theme</h3>
					<div className='flex justify-around py-2'>
						<button className='btn btn-outline' data-set-theme="dark" data-act-class="btn-success">Dark</button>
						<button className='btn btn-outline' data-set-theme="pink" data-act-class="btn-success">Light</button>
					</div>
				</div>
				<Stats />
			</div>
		</div>
	)
}
