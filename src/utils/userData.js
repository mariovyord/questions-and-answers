export const getUserData = () => {
	const userData = localStorage.getItem('useData');
	if (userData !== null) return JSON.parse(userData)
	else return null;
};

export const setUserData = (userData) => localStorage.setItem('useData', userData);

export const clearUserData = () => localStorage.removeItem('useData');