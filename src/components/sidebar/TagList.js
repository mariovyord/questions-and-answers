import React from 'react';
import { Link } from 'react-router-dom';


const tagsMockup = ['history', 'programming', 'biology', 'hollywood', 'photography', 'geography', 'guns', 'comedy', 'movies', 'horror books', 'world politics', 'flying', 'cooking']

function toTitleCase(str) {
	return str.replace(
		/\w\S*/g,
		function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
}

export default function TagList() {

	// Add data service
	const tags = tagsMockup;

	return (
		<div className='shadow bg-white rounded-2xl p-3 '>
			<h2 className='text-2xl text-primary font-bold'>Tags</h2>
			<ul>
				{tags.map(x => <li className='py-1' key={x}><Link to='/'>{toTitleCase(x)}</Link></li >)}
			</ul>
		</div>
	)
}
