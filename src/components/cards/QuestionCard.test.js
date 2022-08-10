import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import { NotificationProvider } from "../../contexts/NotificationContext";
import QuestionCard from "./QuestionCard";

const questionData = {
	"meta": {
		"circle": "history"
	},
	"_id": "id123",
	"body": "Hello World?",
	"owner": "123abc",
	"circle": "456e",
	"isHidden": false,
	"isEditDisabled": false,
	"createdAt": "2022-07-16T09:39:54.439Z",
	"updatedAt": "2022-07-29T08:37:37.622Z",
	"__v": 0
}

describe('question card', () => {
	test('question displays correctly for guests', () => {
		render(<MemoryRouter>
			<AuthContext.Provider value={
				{
					userData: null,
					handleLogin: jest.fn(),
					handleLogout: jest.fn(),
				}
			}>
				<NotificationProvider>
					<QuestionCard data={questionData} />
				</NotificationProvider>
			</AuthContext.Provider>
		</MemoryRouter>);

		const questionBody = screen.getByRole('link', { name: 'Hello World?' });
		expect(questionBody).toBeInTheDocument();

		const circleName = screen.getByRole('link', { name: 'History' });
		expect(circleName).toBeInTheDocument();

		const hideBtn = screen.queryByTestId('hide-btn');
		expect(hideBtn).toBeNull();
	})

	test('question displays correctly for owner', () => {
		render(<MemoryRouter>
			<AuthContext.Provider value={
				{
					userData: {
						_id: '123abc'
					},
					handleLogin: jest.fn(),
					handleLogout: jest.fn(),
				}
			}>
				<NotificationProvider>
					<QuestionCard data={questionData} />
				</NotificationProvider>
			</AuthContext.Provider>
		</MemoryRouter>);

		// Check body
		const questionBody = screen.getByRole('link', { name: 'Hello World?' });
		expect(questionBody).toBeInTheDocument();

		// Check circle name
		const circleName = screen.getByRole('link', { name: 'History' });
		expect(circleName).toBeInTheDocument();

		// Check if hide btn is not rendered
		const hideBtn = screen.queryByTestId('hide-btn');
		expect(hideBtn).not.toBeNull();
	})

	test('owner can hide question from his profile', async () => {
		render(<MemoryRouter>
			<AuthContext.Provider value={
				{
					userData: {
						_id: '123abc'
					},
					handleLogin: jest.fn(),
					handleLogout: jest.fn(),
				}
			}>
				<NotificationProvider>
					<QuestionCard data={questionData} />
				</NotificationProvider>
			</AuthContext.Provider>
		</MemoryRouter>);


		// Get hide btn and click it to hide question
		const hideBtn = screen.queryByTestId('hide-btn');
		await userEvent.click(hideBtn);

		// Confirm hide 
		const yesBtn = screen.getByRole('button', { name: 'Yes' });
		await userEvent.click(yesBtn);

		// Check if notificaton is rendered and question has display none
		const notification = await screen.findByText('Question hidden from profile!');
		expect(notification).toBeInTheDocument();

		// Card should be display: none
		const card = screen.queryByTestId('question-card');
		expect(card).toHaveClass('hidden');
	})
})