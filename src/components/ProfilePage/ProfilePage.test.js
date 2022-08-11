import userEvent from "@testing-library/user-event";
import { renderWithUser, screen, waitFor } from "../../testUtils/customRender"
import ProfilePage from "./ProfilePage"

describe('profile page', () => {
	test('displays user data', async () => {
		renderWithUser(<ProfilePage />);

		const fullName = await screen.findByRole('heading', { name: 'John Johnson' });
		const username = await screen.findByRole('heading', { name: '@user123' });
		const description = await screen.findByRole('heading', { name: 'Cool human' });
		const image = await screen.findByRole('img', { name: 'Portrait' });

		expect(fullName).toBeInTheDocument()
		expect(username).toBeInTheDocument()
		expect(description).toBeInTheDocument()
		expect(image).toHaveAttribute('src', 'https://i.imgur.com/73kg6yl.png')
	})

	test('display edit and settings for owner and on click open and close sub-menus', async () => {
		renderWithUser(<ProfilePage />);

		const settingsBtn = await screen.findByRole('button', { name: /settings/i });
		const editBtn = await screen.findByRole('button', { name: /edit profile/i });

		expect(settingsBtn).toBeInTheDocument();
		expect(editBtn).toBeInTheDocument();

		// Open settings
		await userEvent.click(settingsBtn);

		const themeHeading = screen.getByText(/select theme/i);
		expect(themeHeading).toBeInTheDocument();

		// Close settings
		await userEvent.click(settingsBtn);

		const nullThemeHeading = screen.queryByText(/select theme/i);
		expect(nullThemeHeading).toBeNull();

		// Open edit profile
		await userEvent.click(editBtn);

		const profileHeading = screen.getByText(/profile picture/i);
		const editHeading = screen.getByText(/edit info/i);
		expect(profileHeading).toBeInTheDocument();
		expect(editHeading).toBeInTheDocument();

		// Check if form is populated with user data
		const username = screen.getByLabelText(/username/i);
		expect(username).toHaveValue('user123');

		const firstName = screen.getByLabelText(/first name/i);
		expect(firstName).toHaveValue('John');

		const lastName = screen.getByLabelText(/last name/i);
		expect(lastName).toHaveValue('Johnson');

		const description = screen.getByLabelText(/short description/i);
		expect(description).toHaveValue('Cool human');

		// Close edit profile
		await userEvent.click(editBtn);

		const nullProfileHeading = screen.queryByText(/profile picture/i);
		const nullEditHeading = screen.queryByText(/edit info/i);
		expect(nullProfileHeading).toBeNull();
		expect(nullEditHeading).toBeNull();
	})

	test('submiting edit form changes data on page', async () => {
		renderWithUser(<ProfilePage />);

		const editBtn = await screen.findByRole('button', { name: /edit profile/i });

		// Open edit profile
		await userEvent.click(editBtn);

		// Select first name and change it to 'Peter'
		const firstName = screen.getByLabelText(/first name/i);
		await userEvent.clear(firstName);
		await userEvent.type(firstName, 'Peter');

		const submitBtn = screen.getByRole('button', { name: /Save info/i });
		await userEvent.click(submitBtn);

		// Close form
		await userEvent.click(editBtn);

		// Check if first name is changed on page
		await waitFor(() => {
			const newFirstName = screen.getByRole('heading', { name: 'Peter Johnson' });
			expect(newFirstName).toBeInTheDocument();
		})
	})
})