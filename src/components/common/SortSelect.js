import React from 'react'

export default function SortSelect({ handleSort }) {
	return (
		<div className='w-full bg-base-100 shadow px-4 py-2 rounded-lg'>
			<div>
				<span className='font-bold text-sm mr-4'>Sort by:</span>
				<select className="select select-sm w-full max-w-xs" onChange={handleSort}>
					<option value={'highest-score'}>Highest score</option>
					<option value={'most-recent'}>Most recent</option>
				</select>
			</div>
		</div>
	)
}
