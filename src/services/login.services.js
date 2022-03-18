import axios from 'axios';
import { API_URL } from './config.js';

const login = (username, password) => {
	const data = {
		username,
		password,
	};

	return axios({
		method: 'post',
		url: `${API_URL}/auth/login`,
		data,
	});
};

export default login;
