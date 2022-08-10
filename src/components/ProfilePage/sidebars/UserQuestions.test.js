import { render, screen } from '../../../testUtils/renderWithUser';
import userEvent from "@testing-library/user-event";
import UserQuestions from './UserQuestions';

describe('user questions sidebar', () => {
	test('questions show up after click on btn', async () => {
		render(<UserQuestions profileId='123abc' />);

		// There should be no questions before click
		const commentBefore = screen.queryByText('Why hello World?');
		expect(commentBefore).toBeNull();

		// Questions should appear after click
		const btn = screen.getByRole('button', { name: /questions/i });
		await userEvent.click(btn);
		const commentAfter = await screen.findByText('Why hello World?');

		expect(commentAfter).toBeInTheDocument()

	})
})