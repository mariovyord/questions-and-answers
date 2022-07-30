import React from 'react';
import { Link } from 'react-router-dom';
import { toTitleCase } from '../../utils/stringUtils';

export default function CircleCard({ data }) {
	const circleUrl = '/circles/' + data._id;;

	return (
		<div className="card card-compact w-full h-full bg-base-100 shadow-xl rounded-lg">
			<div className='max-h-24 overflow-hidden' ><img src={data.imageUrl} alt="Shoes" /></div>
			<div className="card-body">
				<h2 className="card-title">{toTitleCase(data.title)}</h2>
				<p>{data.description}</p>
				<div className="card-actions justify-end">
					<Link to={circleUrl} className="btn btn-primary">See more</Link>
				</div>
			</div>
		</div>
	)
}
