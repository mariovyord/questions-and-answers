import { useState, useEffect, useCallback } from 'react';
import { API_URL } from '../../constants';
import useUserData from './useUserData';

export default function useFetch(url) {
	const userData = useUserData();

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const createOptions = useCallback(() => {
		const options = { method: 'get', };

		if (userData) {
			if (options.headers === undefined) options.headers = {};
			options.headers['X-Auth-Token'] = userData.accessToken;
		}

		return options;
	}, [userData]);

	useEffect(() => {
		setLoading(true)
		setError(null);

		fetch(API_URL + url, createOptions())
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
	}, [url, createOptions])

	return { data, loading, error }
}
