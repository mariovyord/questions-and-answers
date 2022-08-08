import { rest } from 'msw';

export const handlers = [
	rest.get('http://localhost:3030/api/users/leaderboard', (req, res, ctx) => {
		return res(
			ctx.json([
				{
					"_id": "user1Id",
					"totalScore": 3,
					"user": {
						"username": "user1",
						"firstName": "User1",
						"lastName": "Userson1"
					}
				},
				{
					"_id": "user2Id",
					"totalScore": 2,
					"user": {
						"username": "user2",
						"firstName": "User2",
						"lastName": "Userson2"
					}
				},
				{
					"_id": "user3Id",
					"totalScore": 1,
					"user": {
						"username": "user3",
						"firstName": "User3",
						"lastName": "Userson3"
					}
				},
			])
		)
	})
]