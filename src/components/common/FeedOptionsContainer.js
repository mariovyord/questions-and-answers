export default function FeedOptionsContainer({ handlePage, page, isDisabled, maxPage, children }) {
	if (page === undefined) page = 1;
	console.log(isDisabled)
	return (
		<div className="btn-group grid grid-cols-3 gap-2 h-fit" >
			<button className="btn btn-outline" disabled={isDisabled || page <= 1} onClick={() => handlePage(-1)}>Prev page</button>
			{children}
			<button className="btn btn-outline" disabled={isDisabled || parseInt(page) >= maxPage} onClick={() => handlePage(1)}>Next Page</button>
		</div >
	)
}
