import { useState, useEffect } from 'react';
import { API_URL } from '../../constants';

// TODO Add authorization and more error handling
export default function useFetch(url, method, body) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const createOptions = (method = 'GET', body) => {
		const options = {
			'method': method,
			'headers': {}
		};

		if (body !== undefined) {
			options.headers['Content-Type'] = 'application/json';
			options.body = JSON.stringify(body);
		}
	}

	useEffect(() => {
		setLoading(true)
		setData(null);
		setError(null);

		fetch(API_URL + url, createOptions(method, body))
			.then(response => response.json())
			.then(result => {
				setLoading(false);
				setData(result);
			})
			.catch(err => {
				setLoading(false);
				setError(err.message);
			})
	}, [url, method, body])

	return { data, loading, error }
}
