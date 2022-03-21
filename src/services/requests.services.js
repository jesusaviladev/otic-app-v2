import axios from 'axios'
import { API_URL } from './config.js';

export const getRequests = (token) => {
	return axios({
		method: 'get',
		url: `${API_URL}/requests`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
}

