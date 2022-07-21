import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Stats from './feautures/Stats';
import CirlclesList from './feautures/CirclesList';
import QuestionCard from './cards/QuestionCard';
import useFetch from './hooks/useFetch';
import FeedOptionsContainer from './utils/FeedOptionsContainer';
import Spinner from './utils/Spinner';
import NoContent from './utils/NoContent';

export default function Questions({ questions }) {
	const pageSize = 5;

	const [isDesktop, setDesktop] = useState(window.innerWidth > 768);
	const [query, setQuery] = useSearchParams();

	const { data, loading, error } = useFetch(`/collections/questions?sortBy=createdAt%20desc&page=${query.get('page') || 1}&pageSize=${pageSize}${query.get('where') ? `&where=${query.get('where')}` : ''}`);
	const { data: ciclesData, loading: loadingCircles, error: errorCircles } = useFetch(`/collections/circles`);
	const { data: docsCount } = useFetch(`/collections/questions?${query.get('where') ? `where=${query.get('where')}&` : ''}count=true`);

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	const updateMedia = () => {
		setDesktop(window.innerWidth > 768);
	};
	const handleQuery = (page, where) => setQuery({
		page: page || 1,
		where: where || '',
	})

	const handleSort = (e) => {
		const whereId = e.target.value;
		const page = query.get('page');
		if (whereId === 'all') {
			handleQuery(page);
		} else {
			handleQuery(page, `circle=${whereId}`);
		}
	}

	const handlePage = (changeNum) => {
		let page = query.get('page');
		if (page) page = parseInt(page) + changeNum;
		if (!page) page = 1 + changeNum;
		const where = query.get('where');
		handleQuery(page, where);
	}

	const content = <>
		{data.map(x => <QuestionCard data={x} />)}

		<FeedOptionsContainer
			handlePage={handlePage}
			page={query.get('page')}
			pageSize={pageSize}
			docsCount={docsCount}
		>
			<select
				className="select w-full max-w-xs btn-outline"
				onChange={handleSort}
				value={query.get('where')?.split('=')[1] || 'all'}
			>
				<option value="all">All</option>
				{
					loadingCircles
						? null
						: <>
							{ciclesData.map(x => <option key={x._id} value={x._id}>{x.title}</option>)}
						</>
				}
			</select>
		</FeedOptionsContainer>
	</>


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
			<div className='col-span-5 md:col-span-3 gap-2'>
				<div className='grid gap-2'>
					<FeedOptionsContainer
						handlePage={handlePage}
						page={query.get('page')}
						pageSize={pageSize}
						docsCount={docsCount}
					>
						<select
							className="select w-full max-w-xs btn-outline"
							onChange={handleSort}
							value={query.get('where')?.split('=')[1] || 'all'}
						>
							<option value="all">All</option>
							{
								loadingCircles
									? null
									: <>
										{ciclesData.map(x => <option key={x._id} value={x._id}>{x.title}</option>)}
									</>
							}
						</select>
					</FeedOptionsContainer>
					{
						loading
							? <Spinner />
							: <> {data.length > 0 ? content : <NoContent content='questions' />} </>
					}
				</div>
			</div>

			{/* Sidebar Right */}
			{
				isDesktop
					? <div className={'col-span-1'}>
						<Stats />
					</div>
					: null
			}
		</div >
	)
}
