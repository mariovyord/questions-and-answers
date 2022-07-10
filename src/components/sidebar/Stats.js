import React from 'react'

export default function Stats() {
	return (
		<div className="stats stats-vertical bg-base-200 w-full">

			<div className="stat">
				<div className="stat-title">Questions</div>
				<div className="stat-value">31K</div>
				<div className="stat-desc">Jan 1st - Feb 1st</div>
			</div>

			<div className="stat">
				<div className="stat-title">Answers</div>
				<div className="stat-value">4,200</div>
				<div className="stat-desc">↗︎ 400 (22%)</div>
			</div>

			<div className="stat">
				<div className="stat-title">Users</div>
				<div className="stat-value">1,200</div>
				<div className="stat-desc">↘︎ 90 (14%)</div>
			</div>

		</div>
	)
}
