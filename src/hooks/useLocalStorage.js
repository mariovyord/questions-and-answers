import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
	const [state, setState] = useState(() => {
		try {
			const userData = localStorage.getItem(key)
			if (userData) {
				return JSON.parse(localStorage.getItem(key));
			}
			return null;
		} catch (err) {
			return null;
		}
	});

	const setItem = (value) => {
		try {
			if (value === null) {
				localStorage.removeItem('userData');
				setState(null);
			} else {
				localStorage.setItem(key, JSON.stringify(value));
				setState(value);
			}
		} catch (err) {
			return null;
		}
	}

	return [
		state,
		setItem,
	]
}