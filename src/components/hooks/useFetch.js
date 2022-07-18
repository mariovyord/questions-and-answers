import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { API_URL } from '../../constants';

// TODO Add authorization and more error handling
export default function useFetch(url, method, body) {
	const { userData } = useContext(AuthContext);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const createOptions = useCallback((method = 'get', body) => {
		const options = {
			'method': method,
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

		fetch(API_URL + url, createOptions(method, body))
			.then(response => response.json())
			.then(result => {
				setLoading(false);
				setData(result.result);
			})
			.catch(err => {
				setLoading(false);
				setError(err.message);
			})
	}, [url, method, body, createOptions])

	return { data, loading, error }
}
