export const getUserData = () => {
	const userData = localStorage.getItem('userData');
	if (userData) return JSON.parse(userData)
	else return null;
};

export const setUserData = (userData) => localStorage.setItem('userData', JSON.stringify(userData));

export const clearUserData = () => localStorage.removeItem('userData');