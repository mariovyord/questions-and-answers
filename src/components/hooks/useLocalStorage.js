import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
	const [state, setState] = useState(() => {
		try {
			let item = localStorage.getItem(key);

			return item
				? JSON.parse(item)
				: initialValue;

		} catch (err) {
			console.log(err.message);
			return initialValue;
		}
	});

	// TODO Add support for functions 
	const setItem = (value) => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
			setState(value);
		} catch (err) {
			console.log(err.message);
		}
	}

	return [
		state,
		setItem,
	]
}