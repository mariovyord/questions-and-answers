import React from 'react'

export default function Stats() {
	return (
		<div class="stats stats-vertical bg-base-200 w-full">

			<div class="stat">
				<div class="stat-title">Questions</div>
				<div class="stat-value">31K</div>
				<div class="stat-desc">Jan 1st - Feb 1st</div>
			</div>

			<div class="stat">
				<div class="stat-title">Answers</div>
				<div class="stat-value">4,200</div>
				<div class="stat-desc">↗︎ 400 (22%)</div>
			</div>

			<div class="stat">
				<div class="stat-title">Users</div>
				<div class="stat-value">1,200</div>
				<div class="stat-desc">↘︎ 90 (14%)</div>
			</div>

		</div>
	)
}
