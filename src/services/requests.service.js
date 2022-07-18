import { API_URL } from "../constants";

async function request(url, options) {
	const response = await fetch(url, options);

	if (response.status === 204) {
		return response;
	}

	if (response.ok === false) {
		// TODO Refactor Error handling
		throw new Error('Request error')
	}

	const data = await response.json();

	return data;
}

function createOptions(method = 'get', data) {
	const options = {
		'method': method,
	};

	// TODO Change it all...
	const userData = JSON.parse(localStorage.getItem('userData'));
	console.log(userData)
	if (userData) {
		if (options.headers === undefined) options.headers = {};

		console.log(userData.accessToken);
		options.headers['X-Auth-Token'] = userData.accessToken;
	}

	if (data !== undefined) {
		if (options.headers === undefined) options.headers = {};

		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(data);
	}
	return options;
}

// TODO Refactor all...
export async function get(url) {
	return request(API_URL + url, createOptions());
}

export async function post(url, data) {
	return request(API_URL + url, createOptions('post', data));
}

export async function put(url, data) {
	return request(API_URL + url, createOptions('put', data));
}

export async function patch(url, data) {
	return request(API_URL + url, createOptions('patch', data));
}

export async function del(url, data) {
	return request(API_URL + url, createOptions('delete', data));
}