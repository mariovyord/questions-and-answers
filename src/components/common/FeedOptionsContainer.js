import React from 'react';
export default function FeedOptionsContainer({ handlePage, page, isDisabled, children }) {
	if (page === undefined) page = 1;

	return (
		<div className="btn-group grid grid-cols-3 gap-2" >
			<button className="btn btn-outline" disabled={(page || 1) <= 1} onClick={() => handlePage(-1)}>Prev page</button>
			{children}
			<button className="btn btn-outline" disabled={isDisabled} onClick={() => handlePage(1)}>Next Page</button>
		</div >
	)
}
