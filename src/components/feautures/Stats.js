import React from 'react';
import useFetch from '../hooks/useFetch';

export default function Stats() {

	// Refactor at later date
	const { data: answersCount } = useFetch(`/collections/answers?count=true`);
	const { data: questionsCount } = useFetch(`/collections/questions?count=true`);
	const { data: commentsCount } = useFetch(`/collections/comments?count=true`);


	return (
		<div className="stats stats-vertical bg-base-200 w-full">
			<div className="stat">
				<div className="stat-title">Questions</div>
				<div className="stat-value">{questionsCount || '-'}</div>
			</div>

			<div className="stat">
				<div className="stat-title">Answers</div>
				<div className="stat-value">{answersCount || '-'}</div>
			</div>

			<div className="stat">
				<div className="stat-title">Comments</div>
				<div className="stat-value">{commentsCount || '-'}</div>
			</div>
		</div>
	)
}
