import React, { useEffect, useState } from 'react';
import Stats from './feautures/Stats';
import CirlclesList from './feautures/CirclesList';
import QuestionCard from './cards/QuestionCard';
import useFetch from './hooks/useFetch';
import { themeChange } from 'theme-change';


export default function Questions({ questions }) {
	const [isDesktop, setDesktop] = useState(window.innerWidth > 768);

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
					? <div className='col-span-5 md:col-span-3 grid gap-2 h-screen bg-base-100 rounded-lg w-full'>
						<QuestionCard data={{
							body: 'Loading...',
							_id: 'Loading...',
							circle: 'Loading...',
							meta: { circle: 'Loading...' },
						}} />
					</div >
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
