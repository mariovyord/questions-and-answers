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

	const setItem = (value) => {
		try {
			// TODO Needs more testing
			if (typeof value === 'function') {
				setState((x) => value(x));
			} else {
				localStorage.setItem(key, JSON.stringify(value));
				setState(value);
			}
		} catch (err) {
			console.log(err.message);
		}
	}

	return [
		state,
		setItem,
	]
}