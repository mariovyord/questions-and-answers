import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LeaderboardList from './LeaderboardList';

const listOfUsers = [
	{
		"_id": "user1Id",
		"totalScore": '6',
		"user": {
			"username": "user1",
			"firstName": "User1",
			"lastName": "Userson1"
		}
	},
	{
		"_id": "user2Id",
		"totalScore": '5',
		"user": {
			"username": "user2",
			"firstName": "User2",
			"lastName": "Userson2"
		}
	},
	{
		"_id": "user3Id",
		"totalScore": '4',
		"user": {
			"username": "user3",
			"firstName": "User3",
			"lastName": "Userson3"
		}
	},
]

describe('leaderboard', () => {
	test('all rows appear in leaderboard', async () => {
		render(
			<LeaderboardList list={listOfUsers} />, { wrapper: MemoryRouter }
		)
		const allRows = screen.getAllByRole('row');
		expect(allRows).toHaveLength(4);
	})

	test('user data appear', () => {
		render(
			<LeaderboardList list={listOfUsers} />, { wrapper: MemoryRouter }
		)
		const user1 = screen.getByRole('link', { name: 'User1 Userson1' })
		expect(user1).toBeInTheDocument();

		const user1Score = screen.getByRole('cell', { name: '6' });
		expect(user1Score).toBeInTheDocument();
	})

	test('first user has proper hrefs on name and details btn', async () => {
		render(
			<LeaderboardList list={listOfUsers} />, { wrapper: MemoryRouter }
		)

		const user1name = screen.getByRole('link', { name: 'User1 Userson1' });
		const user1DetailsBtn = screen.getAllByRole('link', { name: 'Details' })[0];

		expect(user1name).toHaveAttribute('href', '/profile/user1Id')
		expect(user1DetailsBtn).toHaveAttribute('href', '/profile/user1Id')
	})
})