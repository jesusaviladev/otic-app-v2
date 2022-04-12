import axios from 'axios';
import { API_URL } from './config.js';

export const getRequests = (token) => {
	return axios({
		method: 'get',
		url: `${API_URL}/requests`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getRequestById = (token, id) => {
	return axios({
		method: 'get',
		url: `${API_URL}/requests/${id}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const createRequest = (token, data) => {
	return axios({
		method: 'post',
		url: `${API_URL}/requests`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: data,
	});
};

export const editRequest = (token, id, data) => {
	return axios({
		method: 'patch',
		url: `${API_URL}/requests/${id}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: data,
	});
};
