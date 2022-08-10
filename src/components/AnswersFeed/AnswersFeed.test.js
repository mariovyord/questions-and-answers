import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { NotificationProvider } from "../../contexts/NotificationContext";
import AnswersFeed from "./AnswersFeed";

describe('answers feed', () => {
	test('renders answers from server', async () => {
		render(
			<MemoryRouter>
				<AuthContext.Provider value={
					{
						userData: null,
						handleLogin: jest.fn(),
						handleLogout: jest.fn(),
					}
				}>
					<NotificationProvider>
						<AnswersFeed />
					</NotificationProvider>
				</AuthContext.Provider>
			</MemoryRouter>
		)

		const questions = await screen.findAllByRole('heading');
		expect(questions).toHaveLength(2);
	});

	test('all answer elements are displayed in card', async () => {
		render(
			<MemoryRouter>
				<AuthContext.Provider value={
					{
						userData: null,
						handleLogin: jest.fn(),
						handleLogout: jest.fn(),
					}
				}>
					<NotificationProvider>
						<AnswersFeed />
					</NotificationProvider>
				</AuthContext.Provider>
			</MemoryRouter>
		)

		const question = await screen.findByRole('heading', { name: 'Why are we on this Earth?' });
		expect(question).toBeInTheDocument();

		const circle = await screen.findByRole('link', { name: /programming/i })
		expect(circle).toBeInTheDocument();

		const user = await screen.findByRole('link', { name: /Mario Yordanov/i })
		expect(user).toBeInTheDocument();

		const profilePic = await screen.findByAltText('Profile of Mario')
		expect(profilePic).toHaveAttribute('src', 'https://i.imgur.com/73kg6yl.png')

		const answer = await screen.findByText(/Because it was designed for GUI/i);
		expect(answer).toBeInTheDocument();

		const score = await screen.findByText(/^5$/);
		expect(score).toBeInTheDocument()

		const detailsBtns = await screen.findAllByRole('link', { name: /details/i });
		expect(detailsBtns).toHaveLength(2);
	})

	test('upvotes and downvote buttons are disabled for guests', async () => {
		render(
			<MemoryRouter>
				<AuthContext.Provider value={
					{
						userData: null,
						handleLogin: jest.fn(),
						handleLogout: jest.fn(),
					}
				}>
					<NotificationProvider>
						<AnswersFeed />
					</NotificationProvider>
				</AuthContext.Provider>
			</MemoryRouter>
		)

		const upvoteBtns = await screen.findAllByTestId('upvoteBtn');
		const downvoteBtns = await screen.findAllByTestId('downvoteBtn');
		expect(upvoteBtns[0]).toBeDisabled()
		expect(downvoteBtns[0]).toBeDisabled()
	})

	test('upvotes and downvote buttons are enabled for users', async () => {
		render(
			<MemoryRouter>
				<AuthContext.Provider value={
					{
						userData: {
							_id: '12asdas3asdasd',
							accessToken: '123asdasdasd',
							refreshToken: '12asdasdasd',
						},
						handleLogin: jest.fn(),
						handleLogout: jest.fn(),
					}
				}>
					<NotificationProvider>
						<AnswersFeed />
					</NotificationProvider>
				</AuthContext.Provider>
			</MemoryRouter>
		)

		const upvoteBtns = await screen.findAllByTestId('upvoteBtn');
		const downvoteBtns = await screen.findAllByTestId('downvoteBtn');
		expect(upvoteBtns[0]).toBeEnabled()
		expect(downvoteBtns[0]).toBeEnabled()
	})

	test('upvote and downvote click updates the score', async () => {
		render(
			<MemoryRouter>
				<AuthContext.Provider value={
					{
						userData: {
							_id: '12asdas3asdasd',
							accessToken: '123asdasdasd',
							refreshToken: '12asdasdasd',
						},
						handleLogin: jest.fn(),
						handleLogout: jest.fn(),
					}
				}>
					<NotificationProvider>
						<AnswersFeed />
					</NotificationProvider>
				</AuthContext.Provider>
			</MemoryRouter>
		)

		// Click on UPVOTE button
		const upvoteBtns = await screen.findAllByTestId('upvoteBtn');

		await userEvent.click(upvoteBtns[0]);

		await waitFor(async () => {
			const scores = await screen.findAllByTestId('score');
			expect(scores[0]).toHaveTextContent('123');
		})

		// Click on DOWNVOTE button
		const downvoteBtns = await screen.findAllByTestId('downvoteBtn');

		await userEvent.click(downvoteBtns[0]);

		await waitFor(async () => {
			const scores = await screen.findAllByTestId('score');
			expect(scores[0]).toHaveTextContent('456');
		})
	})
})