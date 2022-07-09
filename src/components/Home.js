import React from 'react'
import AnswerCard from './AnswerCard'
import TagList from './sidebar/TagList'

export default function Home() {
	return (
		<div className='grid grid-cols-5 gap-2 max-w-5xl py-2'>
			{/* Sidebar */}
			<div className='col-span-1'>
				<TagList />
			</div>
			{/* Main Feed */}
			<div className='col-span-3 grid gap-2'>
				<AnswerCard />
				<AnswerCard />
				<AnswerCard />
			</div>
			<div className='col-span-1'>
				<TagList />
			</div>
		</div>

	)
}
