import React, { useEffect, useState } from 'react';
import AnswerCard from './cards/AnswerCard';
import Stats from './feautures/Stats';
import CirlclesList from './feautures/CirclesList';
import SortSelect from './utils/SortSelect';
import { themeChange } from 'theme-change';
import useFetch from './hooks/useFetch';

export default function Home() {
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
		// Needed for the theme change lib to work
		themeChange(false);
	}, [isDesktop]);

	const { data, loading, error } = useFetch(`/collections/answers?${sort}&populate=owner parent`)

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
		<div className='grid grid-cols-5 gap-2 max-w-5xl p-2 w-full'>

			{/* Sidebar Left */}
			{isDesktop
				? <div className='col-span-1'>
					<CirlclesList />
				</div>
				: null
			}

			{/* Main Feed */}
			{loading
				? <div className='col-span-5 md:col-span-3 grid gap-2 h-screen bg-base-100 rounded-lg'>
					<SortSelect handleSort={handleSort} />
				</div>
				: <div className='col-span-5 md:col-span-3 grid gap-2'>
					<SortSelect handleSort={handleSort} />
					{data.result.map(x => <AnswerCard key={x._id} answer={x} />)}

				</div>
			}

			{/* Sidebar Right */}
			{isDesktop
				? <div className={'col-span-1'}>
					<div>
						<h3 className='text-center font-bold'>Select theme</h3>
						<div className='flex justify-around py-2'>
							<button className='btn btn-outline' data-set-theme="dark" data-act-class="btn-success">Dark</button>
							<button className='btn btn-outline' data-set-theme="cmyk" data-act-class="btn-success">Light</button>
						</div>
					</div>
					<Stats />
				</div>
				: null
			}

		</div>
	)
}
