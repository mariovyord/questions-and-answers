import React, { useEffect, useState } from 'react';
import AnswerCard from './cards/AnswerCard/AnswerCard';
import Stats from './feautures/Stats';
import CirlclesList from './feautures/CirclesList';
import FeedOptions from './utils/FeedOptions';
import { themeChange } from 'theme-change';
import useFetch from './hooks/useFetch';
import { PAGE_SIZE } from '../constants';

export default function Home() {
	const [isDesktop, setDesktop] = useState(window.innerWidth > 768);
	const [sort, setSort] = useState('sortBy=score%20desc')
	const [page, setPage] = useState(0);

	// TODO Add error handling!
	const { data, loading, error } = useFetch(`/collections/answers?${sort}&offset=${page * PAGE_SIZE}&pageSize=${PAGE_SIZE}}&populate=owner parent`)

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	useEffect(() => {
		// Needed for the theme change lib to work!
		themeChange(false);
	}, [isDesktop]);

	const updateMedia = () => {
		setDesktop(window.innerWidth > 768);
	};

	const handleSort = (e) => {
		const sort = e.target.value;
		if (sort === 'most-recent') {
			setSort('sortBy=createdAt%20desc')
		} else {
			setSort('sortBy=score%20desc')
		}
	}

	const handlePage = (pageNum) => {
		setPage(pageNum);
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
					<FeedOptions handleSort={handleSort} />
				</div>
				: <div className='col-span-5 md:col-span-3 grid gap-2'>
					<FeedOptions handleSort={handleSort} handlePage={handlePage} page={page} />
					{data.map(x => <AnswerCard key={x._id} answer={x} />)}
					<FeedOptions handleSort={handleSort} handlePage={handlePage} page={page} />
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
