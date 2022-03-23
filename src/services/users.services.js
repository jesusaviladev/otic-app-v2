import axios from 'axios';
import { API_URL } from './config.js';

export const getUsers = (token) => {
	return axios({
		method: 'get',
		url: `${API_URL}/users`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
