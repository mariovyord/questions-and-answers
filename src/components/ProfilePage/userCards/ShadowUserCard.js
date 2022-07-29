import React from 'react';

const ShadowUserCard = () => {
	return (
		<div className='w-full'>
			<div className='bg-base-100 p-4 mb-2 rounded-lg shadow flex gap-2 w-full animate-pulse'>
				<div className="avatar">
					<div className="w-32 h-32 bg-slate-200 rounded">
					</div>
				</div>
				<div className='w-full'>
					<div className='h-6 bg-slate-200 rounded w-full mb-2'></div>
					<div className='h-4 bg-slate-200 rounded w-full mb-2'></div>
					<div className='h-4 bg-slate-200 rounded w-full mb-2'></div>
				</div>
			</div>
		</div>
	)
}

export default ShadowUserCard;