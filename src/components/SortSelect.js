import React from 'react'

export default function SortSelect() {
	return (
		<div className='w-full bg-base-100 shadow px-4 py-1 rounded-sm'>
			<div>
				<span className='font-bold text-sm mr-4'>Sort by:</span>
				<select className="select select-sm w-full max-w-xs">
					<option>Most upvoted</option>
					<option>Most recent</option>
				</select>
			</div>
		</div>
	)
}
