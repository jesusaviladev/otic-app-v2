import axios from 'axios';
import { API_URL } from './config.js';

export const getDevices = (token, page = 1, limit = 10) => {
	return axios({
		method: 'get',
		url: `${API_URL}/devices?page=${page}&limit=${limit}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getDeviceBySerial = (token, serial) => {
	return axios({
		method: 'get',
		url: `${API_URL}/devices/${serial}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const editDevice = (token, serial, data) => {
	return axios({
		method: 'patch',
		url: `${API_URL}/devices/${serial}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: data,
	});
}

export const deleteDevice = (token, serial) => {
	return axios({
		method: 'delete',
		url: `${API_URL}/devices/${serial}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}
