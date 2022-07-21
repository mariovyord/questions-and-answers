import { API_URL } from "../constants";
import { getUserData } from "../utils/userData";

async function request(url, options) {
	const response = await fetch(url, options);
	const data = await response.json();

	if (response.ok === false) {
		const errMessage = {
			errors: data.errors || data.message || 'Error fetching data from server',
		}
		throw (errMessage);
	}

	return data;
}

function createOptions(method = 'get', data) {
	const options = {
		'method': method,
	};

	const userData = getUserData();

	if (userData) {
		if (options.headers === undefined) options.headers = {};

		options.headers['X-Auth-Token'] = userData.accessToken;
	}

	if (data) {
		if (options.headers === undefined) options.headers = {};

		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(data);
	}
	return options;
}

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