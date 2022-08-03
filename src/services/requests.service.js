import { API_URL } from "../CONSTANTS";
import { clearUserData, getUserData } from "../utils/userData";

async function request(url, options) {
	const response = await fetch(url, options);

	const data = await response.json();

	if (response.status === 403) {
		clearUserData();
		throw data.errors || ['Forbidden'];
	}

	if (response.status === 401) {
		clearUserData();
		throw data.errors || ['Unauthorized'];
	}

	if (response.ok === false) {
		const errMessage = {
			errors: data.errors || [data.message] || ['Error fetching data from server'],
		}
		throw (errMessage);
	}

	if (data.result === null) {
		const msg = ['No such record in database']
		throw (msg);
	}

	return data;
}

function createOptions(method = 'GET', data) {
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
	return request(API_URL + url, createOptions('POST', data));
}

export async function put(url, data) {
	return request(API_URL + url, createOptions('PUT', data));
}

export async function patch(url, data) {
	return request(API_URL + url, createOptions('PATCH', data));
}

export async function del(url, data) {
	return request(API_URL + url, createOptions('DELETE', data));
}