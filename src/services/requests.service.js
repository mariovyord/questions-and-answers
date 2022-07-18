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
	console.log(data);
	return data;
}

function createOptions(method = 'get', data, accessToken) {
	const options = {
		'method': method,
	};

	if (accessToken) {
		if (options.headers === undefined) options.headers = {};
		console.log(accessToken);
		options.headers['X-Auth-Token'] = accessToken;
	}

	if (data !== undefined) {
		if (options.headers === undefined) options.headers = {};
		console.log(data)
		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(data);
	}
	return options;
}

// TODO Refactor all...
export async function get(url, undefined, accessToken) {
	return request(API_URL + url, createOptions());
}

export async function post(url, data, accessToken) {
	return request(API_URL + url, createOptions('post', data, accessToken));
}

export async function put(url, data, accessToken) {
	return request(API_URL + url, createOptions('put', data, accessToken));
}

export async function patch(url, data, accessToken) {
	return request(API_URL + url, createOptions('patch', data, accessToken));
}

export async function del(url, data, accessToken) {
	return request(API_URL + url, createOptions('delete', data, accessToken));
}