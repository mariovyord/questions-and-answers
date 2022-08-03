import React, { useEffect } from 'react';
import CirlclesList from '../feautures/CirclesList';
import { Outlet } from 'react-router-dom';
import RecentQuestionsList from '../feautures/RecentQuestionsList';
import useIsDesktop from '../../hooks/useIsDesktop';
import ThemeChanger from '../common/ThemeChanger';

export default function HomePage() {
	const [isDesktop] = useIsDesktop();

	useEffect(() => {
		document.title = "Home"
	}, []);

	return (
		<div className='grid grid-cols-5 gap-2 max-w-6xl p-2 w-full'>

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
						<ThemeChanger />
						<RecentQuestionsList />
					</div>
					: null
			}
		</div >
	)
}
