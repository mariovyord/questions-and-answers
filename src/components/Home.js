import React, { useEffect, useState } from 'react';
import AnswerCard from './cards/AnswerCard';
import Stats from './sidebar/Stats';
import CirlclesList from './sidebar/CirclesList';
import SortSelect from './common/SortSelect';
import { themeChange } from 'theme-change';

export default function Home() {

	const [answers, setAnswers] = useState([]);
	const [sort, setSort] = useState('sortBy=score%20desc')
	const [isDesktop, setDesktop] = useState(window.innerWidth > 768);

	const updateMedia = () => {
		setDesktop(window.innerWidth > 768);
	};

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	useEffect(() => {
		themeChange(false);

		(async function () {
			const data = await fetch(`http://localhost:3030/api/collections/answers?${sort}&populate=owner parent`);
			const res = await data.json();
			setAnswers(res.result);
		})()

	}, [sort]);

	const handleSort = (e) => {
		const sort = e.target.value;
		console.log(sort)
		if (sort === 'most-recent') {
			setSort('sortBy=createdAt%20desc')
		} else {
			setSort('sortBy=score%20desc')
		}
	}


	return (
		<div className='grid grid-cols-5 gap-2 max-w-5xl p-2'>

			{/* Sidebar Left */}
			{isDesktop
				? <div className='col-span-1'>
					<CirlclesList />
				</div>
				: ''}

			{/* Main Feed */}
			<div className='col-span-5 md:col-span-3 grid gap-2'>
				<SortSelect handleSort={handleSort} />
				{answers.map(x => <AnswerCard key={x._id} answer={x} />)}

			</div>

			{/* Sidebar Right */}
			<div className={isDesktop ? 'col-span-1' : 'hidden'}>
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
