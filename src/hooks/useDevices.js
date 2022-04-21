import { useState, useEffect, useCallback } from 'react';
import { getDevices, deleteDevice } from '../services/devices.services.js';
import useSession from '../hooks/useSession.js';

const useDevices = () => {
	const [devices, setDevices] = useState([]);
	const [totalDevices, setTotalDevices] = useState(0);
	const [pending, setPending] = useState(true);

	const { user } = useSession();
	const { token } = JSON.parse(user);

	useEffect(() => {
		getDevices(token)
			.then((res) => {
				setPending(false);
				setDevices(res.data.devices);
				setTotalDevices(res.data.pagination.total);
			})
			.catch((error) => {
				setPending(false);
				console.log(error);
			});
	}, []);

	const handleDeleteDevice = useCallback((serial) => {
		return deleteDevice(token, serial).then(() => {
			setDevices((prevState) =>
				prevState.filter((device) => device.serial !== serial)
			);
			setTotalDevices((prevState) => prevState - 1);
		});
	}, []);

	const handleNextPage = useCallback((page) => {
		setPending(true);
		return getDevices(token, page).then((res) => {
			setPending(false);
			setDevices(res.data.devices);
			setTotalDevices(res.data.pagination.total);
		});
	}, []);

	return {
		devices,
		totalDevices,
		pending,
		user,
		handleDeleteDevice,
		handleNextPage,
	};
};

export default useDevices;
