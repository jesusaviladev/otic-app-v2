import axios from 'axios';
import { API_URL } from './config.js';

export const getUsers = (token, page = 1, limit = 10) => {
	return axios({
		method: 'get',
		url: `${API_URL}/users?page=${page}&limit=${limit}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getUserById = (token, id) => {
	return axios({
		method: 'get',
		url: `${API_URL}/users/${id}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getUserRequests = (token, id) => {
	return axios({
		method: 'get',
		url: `${API_URL}/users/${id}/requests`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getUserReports = (token, id) => {
	return axios({
		method: 'get',
		url: `${API_URL}/users/${id}/reports`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const createUser = (token, data) => {
	return axios({
		method: 'post',
		url: `${API_URL}/users`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: data,
	});
};

export const editUser = (token, id, data) => {
	return axios({
		method: 'patch',
		url: `${API_URL}/users/${id}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: data,
	})
}

export const deleteUser = (token, id) => {
	return axios({
		method: 'delete',
		url: `${API_URL}/users/${id}`,
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})	
} 
