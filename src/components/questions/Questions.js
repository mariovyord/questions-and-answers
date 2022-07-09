import React from 'react';
import Stats from '../sidebar/Stats';
import CirlclesList from '../sidebar/CirclesList';
import QuestionCard from './QuestionCard';

const mockQuestions = [
	{ question: 'When did Spain lose Italy?', tags: ['history'] },
	{ question: 'Whats a reliable self-help website that isnt toxic?', tags: ['psychology'] },
	{ question: 'As a tourist, where are great places to just be in NYC rather than "doing" NYC?', tags: ['travel'] },
	{ question: 'When did Spain lose Italy?', tags: ['history'] },
	{ question: 'Whats a reliable self-help website that isnt toxic?', tags: ['psychology'] },
	{ question: 'As a tourist, where are great places to just be in NYC rather than "doing" NYC?', tags: ['travel'] },
	{ question: 'When did Spain lose Italy?', tags: ['history'] },
	{ question: 'Whats a reliable self-help website that isnt toxic?', tags: ['psychology'] },
	{ question: 'As a tourist, where are great places to just be in NYC rather than "doing" NYC?', tags: ['travel'] },
]

export default function Questions({ questions }) {
	return (
		<div className='grid grid-cols-5 gap-2 max-w-5xl py-2'>
			{/* Sidebar */}
			<div className='col-span-1'>
				<CirlclesList />
			</div>
			{/* Main Feed */}
			<div className='col-span-3'>
				<ul className='grid gap-3'>
					{/* TODO Change it to quiestions prop */}
					{mockQuestions.map(x => <li><QuestionCard data={x} /></li>)}
				</ul>
			</div>
			<div className='col-span-1'>
				<Stats />
			</div>
		</div>

	)
}
