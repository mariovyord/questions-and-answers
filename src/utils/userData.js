export const getUserData = () => JSON.parse(localStorage.getItem('useData'));

export const setUserData = (userData) => localStorage.setItem('useData', userData);

export const clearUserData = () => localStorage.setItem('useData', undefined);