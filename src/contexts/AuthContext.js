import { createContext } from "react";
import { logout } from '../services/auth.service';
import useLocalStorage from '../components/hooks/useLocalStorage';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [userData, setUserData] = useLocalStorage('userData');

	// TODO Check token validity and get new tokens if expired

	const handleLogin = (data) => {
		setUserData({
			_id: data.result._id,
			accessToken: data.result.accessToken,
			refreshToken: data.result.refreshToken,
		});
	}
	const handleLogout = () => {
		// TODO Add modal
		const confirmation = window.confirm('Are you sure?');
		if (confirmation) {
			const refreshToken = userData.refreshToken;

			logout(refreshToken)
			setUserData(null);
		}
	}
	return (
		<AuthContext.Provider value={{ userData, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}