import React from 'react';
import { Outlet } from 'react-router-dom';
import { PAGE_SIZE } from '../../constants';

export default function FeedOptionsContainer({ handleSort, handlePage, page, docsCount, children }) {
	if (page === undefined) page = 1;

	return (
		<div className="btn-group grid grid-cols-3 gap-2" >
			<button className="btn btn-outline" disabled={page <= 1} onClick={() => handlePage(-1)}>Prev page</button>
			{children}
			<button className="btn btn-outline" disabled={page >= Math.ceil(docsCount / PAGE_SIZE)} onClick={() => handlePage(1)}>Next Page</button>
		</div >
	)
}
