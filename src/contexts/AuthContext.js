import { createContext } from "react";
import { logout } from '../services/auth.service';
import useLocalStorage from '../components/hooks/useLocalStorage';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [userData, setUserData] = useLocalStorage('userData');

	const handleLogin = (authData) => {
		setUserData(authData);
	}
	const handleLogout = () => {
		// TODO Add modal
		const confirmation = window.confirm('Are you sure?');
		if (confirmation) {
			const refreshToken = userData.refreshToken;

			logout(refreshToken)
			setUserData(undefined);
		}
	}
	return (
		<AuthContext.Provider value={{ userData, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}