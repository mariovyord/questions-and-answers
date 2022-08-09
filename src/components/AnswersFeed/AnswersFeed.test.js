import { render, screen, logDOM, queryByRole } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import { NotificationProvider } from "../../contexts/NotificationContext";
import AnswersFeed from "./AnswersFeed";

describe('answers feed', () => {
	test('renders answers from server', async () => {
		render(
			<MemoryRouter>
				<AuthProvider>
					<NotificationProvider>
						<AnswersFeed />
					</NotificationProvider>
				</AuthProvider>
			</MemoryRouter>
		)

		const question = await screen.findAllByRole('heading');
		expect(question).toHaveLength(2);
	});

	test('all answer elements are displayed in card', async () => {
		render(
			<MemoryRouter>
				<AuthProvider>
					<NotificationProvider>
						<AnswersFeed />
					</NotificationProvider>
				</AuthProvider>
			</MemoryRouter>
		)

		const question = await screen.findByRole('heading', { name: 'Why are we on this Earth?' });
		expect(question).toBeInTheDocument();

		const circle = await screen.findByRole('link', { name: /programming/i })
		expect(circle).toBeInTheDocument();

		const answer = await screen.findByText(/Because it was designed for GUI/i);
		expect(answer).toBeInTheDocument();

		const score = await screen.findByText(/^5$/);
		expect(score).toBeInTheDocument()
	})

	test('details button doesnt render for guests', () => {
		render(
			<MemoryRouter>
				<AuthProvider>
					<NotificationProvider>
						<AnswersFeed />
					</NotificationProvider>
				</AuthProvider>
			</MemoryRouter>
		)

		const detailsBtn = screen.queryByRole('button', { name: /details/i });
		expect(detailsBtn).toBeNull();
	})
})