import React, { useEffect } from 'react';
import CirlclesList from '../feautures/CirclesList';
import { themeChange } from 'theme-change';
import { Outlet } from 'react-router-dom';
import RecentQuestionsList from '../feautures/RecentQuestionsList';
import useIsDesktop from '../../hooks/useIsDesktop';

export default function HomePage() {
	const [isDesktop] = useIsDesktop();

	useEffect(() => {
		document.title = "Home"
	}, []);

	useEffect(() => {
		// Needed for the theme change lib to work!
		themeChange(false);
	}, []);

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
			<Outlet />

			{/* Sidebar Right */}
			{
				isDesktop
					? <div className={'col-span-1'}>
						<div className='p-2'>
							<h3 className='text-xl font-bold'>Select theme</h3>
							<div className='flex py-2 gap-2'>
								<button className='btn btn-outline' data-set-theme="dark" data-act-class="btn-success">Dark</button>
								<button className='btn btn-outline' data-set-theme="cmyk" data-act-class="btn-success">Light</button>
							</div>
						</div>
						<RecentQuestionsList />
					</div>
					: null
			}
		</div >
	)
}
