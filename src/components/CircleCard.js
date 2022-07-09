import React from 'react'

export default function CircleCard() {
	return (
		<div className="card card-compact w-56 bg-base-100 shadow-xl">
			<figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
			<div className="card-body">
				<h2 className="card-title">History</h2>
				<p>The History of War across the Globe and its historical impact.</p>
				<div className="card-actions justify-end">
					<button className="btn btn-primary">See more</button>
				</div>
			</div>
		</div>
	)
}
