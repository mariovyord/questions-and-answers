import React from 'react';
import { Link } from 'react-router-dom';
import { toTitleCase } from '../../utils/stringUtils';
import mainCircles from '../../data/circles/circles.json';

export default function CirlclesList() {
	return (
		<div className='p-3'>
			<h2 className='text-xl font-bold'>Main Circles</h2>
			<ul>
				{mainCircles.map(x => {
					const url = `/circles/${x._id}`
					return <li className='py-1 link link-hover' key={x._id}><Link to={url}>{toTitleCase(x.title)}</Link></li >
				})}
			</ul>
		</div>
	)
}
