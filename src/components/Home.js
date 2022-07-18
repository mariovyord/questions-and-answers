import React, { useEffect, useState } from 'react';
import Stats from './feautures/Stats';
import CirlclesList from './feautures/CirclesList';
import { themeChange } from 'theme-change';
import { Outlet } from 'react-router-dom';


export default function Home() {
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
