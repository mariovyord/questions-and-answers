import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';

const ProvidersWithGuest = ({ children }) => {
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

const ProvidersWithUser = ({ children }) => {
	return (
		<MemoryRouter>
			<AuthContext.Provider value={
				{
					userData: {
						_id: '123abc',
						accessToken: '123asdasdasd',
						refreshToken: '12asdasdasd',
					},
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

const renderWithGuest = (ui, options) =>
	render(ui, { wrapper: ProvidersWithGuest, ...options })

const renderWithUser = (ui, options) =>
	render(ui, { wrapper: ProvidersWithUser, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export {
	renderWithGuest,
	renderWithUser,
}