import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CirlclesList from './CirclesList';

describe('Circles List Sidebar', () => {

	test('header renders', () => {
		render(<MemoryRouter>
			<CirlclesList />
		</MemoryRouter>
		);
		expect(screen.getByText('Main Circles')).toBeInTheDocument();
	})

	test('all 8 main circles render', () => {
		render(<MemoryRouter>
			<CirlclesList />
		</MemoryRouter>
		);

		const mainCirlces = ['History',
			'Programming',
			'Technology',
			'Science',
			'Movies',
			'Books',
			'World Politics',
			'Economics',
		]

		const exprectedUrl = /\/circles\/\w+/;

		mainCirlces.forEach((title) => {
			const link = screen.getByText(title);

			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', expect.stringMatching(exprectedUrl));
		})
	})
})

