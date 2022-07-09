import React from 'react'

export default function Home() {
	return (
		<div className='grid grid-cols-4 gap-2 max-w-5xl py-4'>
			{/* Sidebar */}
			<div className='col-span-1'>
				<div className="stats shadow">

					<div className="stat">
						<div className="stat-title">Total Page Views</div>
						<div className="stat-value">89,400</div>
						<div className="stat-desc">21% more than last month</div>
					</div>

				</div>
			</div>
			{/* Main Feed */}
			<div className='col-span-3'>
				<div>
					<div className="card lg:card-side bg-base-100 shadow-xl">
						<figure><img src="https://placeimg.com/400/400/arch" alt="Album" /></figure>
						<div className="card-body">
							<h2 className="card-title">New album is released!</h2>
							<p>Click the button to listen on Spotiwhy app.</p>
							<div className="card-actions justify-end">
								<button className="btn btn-primary">Listen</button>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="card lg:card-side bg-base-100 shadow-xl">
						<figure><img src="https://placeimg.com/400/400/arch" alt="Album" /></figure>
						<div className="card-body">
							<h2 className="card-title">New album is released!</h2>
							<p>Click the button to listen on Spotiwhy app.</p>
							<div className="card-actions justify-end">
								<button className="btn btn-primary">Listen</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}
