import { createContext, useCallback, useEffect, useState } from "react";
import { logout, newTokens } from '../services/auth.service';
import useLocalStorage from '../components/hooks/useLocalStorage';
import Spinner from "../components/utils/Spinner";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [userData, setUserData] = useLocalStorage('userData');
	let [loading, setLoading] = useState(true);

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

	const updateTokens = useCallback(async (refreshToken) => {
		newTokens(refreshToken)
			.then(data => {
				setUserData({
					_id: userData._id,
					accessToken: data.result.accessToken,
					refreshToken: data.result.refreshToken,
				})
			}).catch(err => {
				logout(refreshToken)
				setUserData(null);
			}).finally(() => {
				setLoading(false);
			})
	}, [userData, setUserData])

	useEffect(() => {
		if (loading) updateTokens(userData.refreshToken)

		let fourMinutes = 1000 * 60 * 4

		let interval = setInterval(() => {
			if (userData) {
				updateTokens(userData.refreshToken)
			}
		}, fourMinutes);

		return () => clearInterval(interval)

	}, [userData, loading, updateTokens])

	return (
		<AuthContext.Provider value={{ userData, handleLogin, handleLogout }}>
			{loading ? <Spinner /> : children}
		</AuthContext.Provider>
	)
}