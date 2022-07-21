import React from 'react'

const NoContent = ({ content }) => {
	return (
		<div className='flex justify-center font-bold text-2xl w-full'>
			<span>No {content} found</span>
		</div>
	)
}

export default NoContent