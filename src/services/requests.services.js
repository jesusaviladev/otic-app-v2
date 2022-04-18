import axios from 'axios';
import { API_URL } from './config.js';

export const getRequests = (token, page = 1, limit = 10) => {
	return axios({
		method: 'get',
		url: `${API_URL}/requests?page=${page}&limit=${limit}`,
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

export const deleteRequest = (token, id) => {
	return axios({
		method: 'delete',
		url: `${API_URL}/requests/${id}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
