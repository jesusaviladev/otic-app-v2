const API_URL = import.meta.env.PROD
	? `https://otic-api-v2.herokuapp.com/api`
	: `http://192.168.60.111:3001/api`;
// import.meta.env viene de VITE
console.log(`[vite] running in ${import.meta.env.MODE} mode.`);

export { API_URL };
