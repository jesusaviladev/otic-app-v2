import axios from 'axios'
import { API_URL } from './config.js';

export const getDevices = (token) => {
	return axios({
		method: 'get',
		url: `${API_URL}/devices`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}