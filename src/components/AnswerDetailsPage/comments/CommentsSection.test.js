import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';
import { NotificationProvider } from "../../../contexts/NotificationContext";
import CommentsSection from "./CommentsSection";

const userData = {
	_id: '123abc',
}

describe('comments section works properly', () => {
	test('comment displays fully', async () => {
		render(
			<MemoryRouter>
				<NotificationProvider>
					<CommentsSection answerId={'123jkm'} userData={userData} />
				</NotificationProvider>
			</MemoryRouter>
		);

		// Find comment
		const text = await screen.findByText(/great answer/i)
		expect(text).toBeInTheDocument()
		// Find profile picture
		const profilePics = screen.getAllByRole('img');
		expect(profilePics[0]).toHaveAttribute('src', 'https://i.imgur.com/73kg6yl.png');
		// Find full name
		const fullName = screen.getByRole('link', { name: 'John Johnson' });
		expect(fullName).toBeInTheDocument();

	})

	test('users can post comments', async () => {
		render(
			<MemoryRouter>
				<NotificationProvider>
					<CommentsSection answerId={'123jkm'} userData={userData} />
				</NotificationProvider>
			</MemoryRouter>
		);

		// Type in textarea
		const textInput = await screen.findByRole('textbox')
		await userEvent.type(textInput, 'Hello World!');

		// Submit comment
		const submitBtn = screen.getByRole('button', { name: 'Submit' });
		await userEvent.click(submitBtn);

		// Check if textarea is cleared
		await waitFor(async () => {
			expect(textInput).toHaveTextContent('');
		})

		// Check if comment has appeared
		const newComment = await screen.findByText('Hello World!');
		expect(newComment).toBeInTheDocument()

		// Check for notification
		const notification = screen.getByText('Comment successful!');
		expect(notification).toBeInTheDocument();
	})
})
