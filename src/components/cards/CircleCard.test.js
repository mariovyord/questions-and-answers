import { renderWithGuest, screen } from "../../testUtils/customRender";
import CircleCard from './CircleCard';

describe('circle card', () => {
	const circleData = {
		_id: '456wcgw',
		title: 'history',
		description: 'The History Circle',
		imageUrl: 'https://i.imgur.com/73kg6yl.png',
	}

	test('circle card displays data', () => {
		renderWithGuest(<CircleCard data={circleData} />);

		const img = screen.getByAltText(`${circleData.title} circle`);
		expect(img).toHaveAttribute('src', circleData.imageurl);

		const title = screen.getByRole('heading', { name: 'History' });
		expect(title).toBeInTheDocument();

		const description = screen.getByText(circleData.description);
		expect(description).toBeInTheDocument();

		const detailsLink = screen.getByRole('link', { name: 'See more' });
		expect(detailsLink).toHaveAttribute('href', `/circles/${circleData._id}`);

	})
})