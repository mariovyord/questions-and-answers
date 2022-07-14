import React from 'react';
import useFetch from '../hooks/useFetch';

export default function Stats() {

	const { data: answersCount } = useFetch(`/collections/answers?count=true`);
	const { data: questionsCount } = useFetch(`/collections/questions?count=true`);
	const { data: usersCount } = useFetch(`/collections/users?count=true`);


	return (
		<div className="stats stats-vertical bg-base-200 w-full">
			<div className="stat">
				<div className="stat-title">Questions</div>
				<div className="stat-value">{questionsCount || '&infin;'}</div>
			</div>

			<div className="stat">
				<div className="stat-title">Answers</div>
				<div className="stat-value">{answersCount || '&infin;'}</div>
			</div>

			<div className="stat">
				<div className="stat-title">Users</div>
				<div className="stat-value">{usersCount || '&infin;'}</div>
			</div>

		</div>
	)
}
