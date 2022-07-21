import { useState, useEffect } from 'react';
import { getData } from '../../services/data.service';

export default function useFetch(url) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true)
		setError(null);

		getData(url)
			.then(result => {
				setData(result.result);
			})
			.catch(err => {
				setError('Error fetching data from server');
			})
			.finally(() => {
				setLoading(false);
			})

	}, [url])

	return { data, loading, error }
}
