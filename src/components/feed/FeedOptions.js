import React from 'react';
import { PAGE_SIZE } from '../../constants';

export default function FeedOptions({ handleSort, handlePage, page, docsCount }) {
	return (
		<div className="btn-group grid grid-cols-3 gap-2" >
			<button className="btn btn-outline" disabled={page <= 0} onClick={() => handlePage(page - 1)}>Previous page</button>
			<select className="select w-full max-w-xs btn-outline" onChange={handleSort}>
				<option value={'highest-score'}>Sort by most stars</option>
				<option value={'most-recent'}>Sort by most recent</option>
			</select>
			<button className="btn btn-outline" disabled={page >= Math.floor(docsCount / PAGE_SIZE)} onClick={() => handlePage(page + 1)}>Next Page</button>
		</div >
	)
}
