import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';

const AllTheProviders = ({ children }) => {
	return (
		<MemoryRouter>
			<AuthContext.Provider value={
				{
					userData: null,
					handleLogin: jest.fn(),
					handleLogout: jest.fn(),
				}
			}>
				<NotificationProvider>

					{children}

				</NotificationProvider>
			</AuthContext.Provider>
		</MemoryRouter>
	)
}

const customRender = (ui, options) =>
	render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }