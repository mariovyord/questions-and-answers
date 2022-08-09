import { rest } from 'msw';

export const handlers = [
	// Leaderboard
	rest.get('http://localhost:3030/api/users/leaderboard', (req, res, ctx) => {
		return res(
			ctx.json(
				{
					result: [
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
					]
				}
			)
		)
	}),
	// Answers
	rest.get(`http://localhost:3030/api/collections/answers`, (req, res, ctx) => {

		if (req.url.searchParams.count) {
			// doesnt work for some reason
			return rest(
				ctx.json(
					{ result: 1 }
				))
		}

		return res(
			ctx.json(
				{
					"result": [
						{
							"meta": {
								"question": "Why are we on this Earth?",
								"circle": "programming"
							},
							"_id": "62d28820b15e38f389a873aa",
							"body": "Because it was designed for GUI’s, it’s still very important even though it get a lot of criticism, I would love to see what a purely functional program written for iPhone would look like, and things like functional programming or extension to OOP like viewModels are making their way in to oop programming, but OOP is here to stay for a long time!!!!",
							"owner": {
								"_id": "62cd298e2b4fbaf3158603a7",
								"firstName": "Mario",
								"lastName": "Yordanov",
								"imageUrl": "https://i.imgur.com/73kg6yl.png"
							},
							"question": "62d287d9b15e38f389a873a8",
							"circle": "62cd35cee2b51c2dae1516b7",
							"upvotes": [
								"62d57353ed1fbcf8d8a6f70d",
								"62db9b3c61ef39fcdb10049e",
								"62d2e7a3a0c85ddef6602cfb",
								"62d2e9a7a0c85ddef6602d1d",
								"62cd298e2b4fbaf3158603a7",
								"62ea35adb0f9bd506d70debe"
							],
							"downvotes": [
								"62d57353ed1fbcf8d8a6f70d"
							],
							"score": 5,
							"createdAt": "2022-07-16T09:42:56.052Z",
							"updatedAt": "2022-08-03T12:50:21.221Z",
							"__v": 41
						},
						{
							"meta": {
								"question": "What was the first country in the world?",
								"circle": "history"
							},
							"_id": "62dce31b6bdf8c9d2e7e7f2f",
							"body": "Egypt, Iran, Armenia, China, Japan, Ethiopia, Greece, Portugal, San Marino, and France are the top 10 oldest countries in the world.",
							"owner": {
								"_id": "62d2e9a7a0c85ddef6602d1d",
								"firstName": "Flora",
								"lastName": "Yordanova",
								"imageUrl": "https://i.imgur.com/random.png"
							},
							"question": "62da6ed02130f98456fbe5ff",
							"circle": "62cd3571e2b51c2dae1516b5",
							"upvotes": [
								"62d2e9a7a0c85ddef6602d1d",
								"62cd298e2b4fbaf3158603a7"
							],
							"downvotes": [],
							"score": 2,
							"createdAt": "2022-07-24T06:13:47.706Z",
							"updatedAt": "2022-08-01T09:50:02.812Z",
							"__v": 2
						},],
				}
			)
		)
	}),
	// Vote
	rest.post(`http://localhost:3030/api/collections/answers/*/vote`, async (req, res, ctx) => {
		const votes = await req.json()
		const result = {
			upvotes: [],
			downvotes: [],
		}
		if (votes.upvote) {
			result.score = 123
		} else {
			result.score = 456
		}

		return res(
			ctx.json(
				{
					result
				}
			)
		)
	}),
]