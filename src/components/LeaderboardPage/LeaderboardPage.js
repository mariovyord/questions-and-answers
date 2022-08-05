import { useEffect, useState } from "react"
import * as dataService from "../../services/data.service"

import userNotificationContext from "../../hooks/useNotificationContext";
import isAuth from "../../hoc/isAuth";

import Spinner from "../common/Spinner";
import LeaderboardList from "./LeaderboardList/LeaderboardList";


const LeaderboardPage = () => {
	const [leaderboard, setLeaderboard] = useState(null);

	const handleNotification = userNotificationContext();

	useEffect(() => {
		dataService.getLeaderboard()
			.then(x => {
				setLeaderboard(x.result || []);
			})
			.catch(err => {
				handleNotification('error', 'Failed to fetch leaderboard!')
				setLeaderboard([]);
			})
	}, [])

	return (
		<div className='max-w-6xl p-2 w-full'>
			<h1 className='font-bold text-5xl my-6 text-center'>Leaderboard</h1>
			<div className="w-full flex justify-center">
				{leaderboard
					? leaderboard.length > 0
						? <LeaderboardList list={leaderboard} />
						: <p className="font-bold text-4xl">No records found</p>
					: <Spinner />}
			</div>
		</div >
	)
}

export default isAuth(LeaderboardPage);