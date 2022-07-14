import React from 'react';
import { Link } from 'react-router-dom';
import { toTitleCase } from '../../utils/utils';

export default function CirlclesList() {

	const mainCircles = [
		'technology',
		'programming',
		'science',
		'history',
		'books',
		'movies',
		'world politics',
		'economics',
	]

	return (
		<div className='p-3'>
			<h2 className='text-2xl font-bold'>Circles</h2>
			<ul>
				{mainCircles.map(x => {
					const url = `/circles/${x}`
					return <li className='py-1 link link-hover' key={x}><Link to={url}>{toTitleCase(x)}</Link></li >
				})}
			</ul>
		</div>
	)
}
