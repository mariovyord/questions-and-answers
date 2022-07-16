import { API_URL } from "../constants";

async function request(url, options) {
	const response = await fetch(url, options);
	const data = await response.json();
	return data;
}

function createOptions(method = 'get', data) {
	const options = {
		'method': method,
	};

	console.log(options)
	// if (user) {
	// 	options.headers['X-Auth-Token'] = user.accessToken;
	// }

	if (data !== undefined) {
		options.headers = {};
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

export async function del(url) {
	return request(API_URL + url, createOptions('delete'));
}