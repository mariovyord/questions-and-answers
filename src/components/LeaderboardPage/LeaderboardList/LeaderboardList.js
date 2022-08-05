import { Link } from "react-router-dom";
import { AiOutlineCrown } from 'react-icons/ai';

const LeaderboardList = ({ list }) => {

	return (
		<table className="table table-compact  w-full max-w-2xl">
			<thead>
				<tr>
					<th></th>
					<th>Name</th>
					<th>Score</th>
					<th>Profile</th>
				</tr>
			</thead>
			<tbody>
				{list.map((x, i) => {
					return <>
						<tr key={x._id} className={`hover ${i === 0 ? 'bg-primary z-50' : ''}`}>
							<td className="font-bold">{i + 1}</td>
							<td>
								<div class="flex items-center space-x-3">
									<div>
										<Link
											to={`/profile/${x._id}`}
											className={`flex font-bold link-hover ${i === 0 ? 'text-lg' : ''}`}
										>
											{x.user.firstName} {x.user.lastName} {i === 0 ? <div className="pl-2 text-amber-500"><AiOutlineCrown size="25px" /></div> : null}
										</Link>
										<div class="text-sm opacity-50">@{x.user.username}</div>
									</div>
								</div>
							</td>
							<td>{x.totalScore}</td>
							<td><Link to={`/profile/${x._id}`} className="link-hover">Details</Link></td>
						</tr>
					</>
				})}
			</tbody>
		</table >
	)
}

export default LeaderboardList;