import { render, screen } from "@testing-library/react"
import UserCard from "./UserCard"

test('user card diplays all user data', () => {
	const userData = {
		username: 'user123',
		firstName: 'John',
		lastName: 'Johnson',
		description: 'Cool human',
		imageUrl: 'https://i.imgur.com/73kg6yl.png',
	}

	render(<UserCard profile={userData} />);

	const fullName = screen.getByRole('heading', { name: 'John Johnson' });
	const username = screen.getByRole('heading', { name: '@user123' });
	const description = screen.getByRole('heading', { name: 'Cool human' });
	const image = screen.getByRole('img');

	expect(fullName).toBeInTheDocument()
	expect(username).toBeInTheDocument()
	expect(description).toBeInTheDocument()
	expect(image).toHaveAttribute('src', 'https://i.imgur.com/73kg6yl.png')
})