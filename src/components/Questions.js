import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Stats from './feautures/Stats';
import CirlclesList from './feautures/CirclesList';
import QuestionCard from './cards/QuestionCard';
import useFetch from './hooks/useFetch';
import { themeChange } from 'theme-change';
import FeedOptionsContainer from './utils/FeedOptionsContainer';


export default function Questions({ questions }) {
	const [isDesktop, setDesktop] = useState(window.innerWidth > 768);
	const [query, setQuery] = useSearchParams();

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
	const handleQuery = (page, sortBy) => setQuery({
		page: page || 1,
		sortBy: sortBy || 'score%20desc',
	})

	const handleSort = (e) => {
		const sort = e.target.value;
		const page = query.get('page');
		if (sort === 'most-recent') {
			handleQuery(page, 'createdAt%20desc');
		} else {
			handleQuery(page);
		}
	}

	const handlePage = (changeNum) => {
		let page = query.get('page');
		if (page) page = parseInt(page) + changeNum;
		if (!page) page = 1 + changeNum;
		const sort = query.get('sortBy');
		handleQuery(page, sort);
	}

	const { data, loading, error } = useFetch(`/collections/questions`);
	const { data: docsCount } = useFetch(`/collections/questions?count=true`);

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
			{
				loading
					// TODO Add Loading spinner and stuff
					? <div className='col-span-5 md:col-span-3 grid gap-2 h-screen rounded-lg w-full'>
						<QuestionCard data={{
							body: 'Loading...',
							_id: 'Loading...',
							circle: 'Loading...',
							meta: { circle: 'Loading...' },
						}} />
					</div >
					: <>
						<div className='col-span-3 gap-2'>
							<div className='grid gap-2'>
								<FeedOptionsContainer>
									<select className="select w-full max-w-xs btn-outline" onChange={handleSort}>
										<option value={'score'}>All</option>
										<option value={'score'}>History</option>
										<option value={'most-recent'}>Programming</option>
									</select>
								</FeedOptionsContainer>
								{/* TODO Change it to quiestions prop */}
								{data.map(x => <QuestionCard data={x} />)}
							</div>
						</div>
					</>
			}

			{/* Sidebar Right */}
			{isDesktop
				? <div className={'col-span-1'}>
					<Stats />
				</div>
				: null
			}
		</div>
	)
}
