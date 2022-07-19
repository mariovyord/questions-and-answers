import { useState, useEffect, useCallback } from 'react';
import { API_URL } from '../../constants';
import useAuthContext from './useAuthContext';

// TODO Add more error handling
export default function useFetch(url, body) {
	const userData = useAuthContext();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const createOptions = useCallback((body) => {
		const options = {
			method: 'get',
		};

		if (userData) {
			if (options.headers === undefined) options.headers = {};
			options.headers['X-Auth-Token'] = userData.accessToken;
		}

		if (body) {
			if (options.headers === undefined) options.headers = {};
			options.headers['Content-Type'] = 'application/json';
			options.body = JSON.stringify(body);
		}

		return options;
	},
		[userData]);

	useEffect(() => {
		setLoading(true)
		setError(null);

		fetch(API_URL + url, createOptions(body))
			.then(response => response.json())
			.then(result => {
				setData(result.result);
			})
			.catch(err => {
				setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			})
	}, [url, body, createOptions])

	return { data, loading, error }
}
