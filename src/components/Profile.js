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
						<div className='bg-base-100 p-4 mb-2 rounded-lg shadow flex gap-2'>
							<div class="avatar">
								<div class="w-32 rounded">
									<img src={data.imageUrl} alt="Portrait" />
								</div>
							</div>
							<div className=''>
								<h1 className='font-bold text-2xl'>{data.firstName} {data.lastName}</h1>
								<h2 className='italic opacity-80 text-sm'>@{data.username}</h2>
								<h2 className=''>{data.description}</h2>
							</div>
						</div>
						<div>
							<button className='btn btn-primary btn-outline w-full mb-2'>Edit Profile</button>
						</div>
						<div>
							<button className='btn btn-secondary btn-outline w-full'>Show questions</button>
						</div>
					</div>
			}

			{/* Main Feed */}
			<Feed urlOptions={filterQuery} />
		</div>
	)
}
