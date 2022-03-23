import axios from 'axios'
import { API_URL } from './config.js'

export const getReports = (token) => {
	return axios({
		method: 'get',
		url: `${API_URL}/reports`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
}