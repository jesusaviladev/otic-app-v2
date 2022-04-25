import axios from 'axios';
import { API_URL } from './config.js';

export const getReports = ({ token, page = 1, limit = 10, sortBy = 'id' , orderBy = 'asc' }) => {
	return axios({
		method: 'get',
		url: `${API_URL}/reports?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getReportById = (token, id) => {
	return axios({
		method: 'get',
		url: `${API_URL}/reports/${id}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const createReport = (token, data) => {
	return axios({
		method: 'post',
		url: `${API_URL}/reports`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: data,
	});
};

export const editReport = (token, id, data) => {
	return axios({
		method: 'patch',
		url: `${API_URL}/reports/${id}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: data,
	});
};

export const deleteReport = (token, id) => {
	return axios({
		method: 'delete',
		url: `${API_URL}/reports/${id}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
