import React from 'react';
export default function FeedOptionsContainer({ handlePage, page, pageSize, docsCount, children }) {
	if (page === undefined) page = 1;

	return (
		<div className="btn-group grid grid-cols-3 gap-2" >
			<button className="btn btn-outline" disabled={page <= 1} onClick={() => handlePage(-1)}>Prev page</button>
			{children}
			<button className="btn btn-outline" disabled={page >= Math.ceil(docsCount / pageSize)} onClick={() => handlePage(1)}>Next Page</button>
		</div >
	)
}
