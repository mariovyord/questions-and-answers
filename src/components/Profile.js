import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Feed from './feed/Feed';
import useFetch from './hooks/useFetch';

export default function Profile() {
	const [isDesktop, setDesktop] = useState(window.innerWidth > 768);

	const { userData } = useContext(AuthContext);
	const filterQuery = `&where=owner=${userData._id}`;

	const { data, loading, error } = useFetch(`/users/${userData._id}`);
	// TODO Abstract it away
	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	const updateMedia = () => {
		setDesktop(window.innerWidth > 768);
	};

	return (
		<div className='grid grid-cols-5 gap-2 max-w-5xl p-2 w-full'>

			{/* Sidebar Left */}
			{
				loading
					? <h1>Loading</h1>
					: <div className='col-span-5 md:col-span-2 w-full'>
						<div className='avatar'>
							<div className='w-full rounded-lg'>
								<img src={data.imageUrl} alt="Portrait" />
							</div>
						</div>
						<div className=''>
							<h1 className='font-bold text-3xl'>{data.firstName} {data.lastName}</h1>
							<h2>@{data.username}</h2>
							<h2>{data.description}</h2>
						</div>
						<div>
							<button className='btn btn-primary btn-outline w-full'>Show questions</button>
						</div>
					</div>
			}

			{/* Main Feed */}
			<Feed urlOptions={filterQuery} />
		</div>
	)
}
