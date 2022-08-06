import { rest } from 'msw';

// TODO ...
export const handlers = [
	rest.get('http://localhost:3030/api', (req, res, ctx) => {
		return res(
			ctx.json([
				{
					'Prop': 'Prop',
				}
			])
		)
	})
]