import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import useSession from '../hooks/useSession.js';
import { getDeviceBySerial, editDevice } from '../services/devices.services.js';
import Button from '../components/Button.jsx';
import { FaEdit } from 'react-icons/fa';
import Toast from '../components/Toast.jsx';
import Input from '../components/Input.jsx';

const DeviceDetails = () => {
	const { serial } = useParams();

	const { user } = useSession();

	const { token, role } = JSON.parse(user);

	const {
		register,
		handleSubmit,
		reset,
		setError,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			serial: '',
			type: '',
			name: '',
		},
	});

	const [disabled, setDisabled] = useState(true);

	const [device, setDevice] = useState([]);

	const [formError, setFormError] = useState(false);

	const [formSuccess, setFormSuccess] = useState(false);

	useEffect(() => {
		getDeviceBySerial(token, serial)
			.then((res) => {
				setDevice(res.data.device);
				reset({
					serial: res.data.device.serial,
					type: res.data.device.type,
					name: res.data.device.name,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const onSubmit = (values) => {
		editDevice(token, serial, values)
			.then((res) => {
				setFormSuccess(true);
				setDisabled(true);
			})
			.catch((err) => {
				console.log(err);

				if (err.response) {
					const { errors } = err.response.data;

					if (errors) {
						errors.forEach((error) => {
							setError(error.param, {
								type: 'server',
								message: error.msg,
							});
						});
					}
				} else {
					setFormError({
						message: 'Parece que algo va mal, por favor intente más tarde.',
					});
				}
			});
	};

	return (
		<>
			<h1 className="text-2xl font-bold my-4">
				Detalles del equipo {`#${device.serial}`}
			</h1>

			<button
				onClick={() => {
					if (role !== 'admin') {
						return setFormError({
							message: 'No tienes permiso para realizar esta acción',
						});
					}

					setDisabled(!disabled);
				}}
				className="cursor-pointer flex items-center my-4"
			>
				Haz click aquí para editar <FaEdit className="inline-block ml-2" />
			</button>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					fieldName="serial"
					label="Serial del equipo"
					register={register}
					errors={errors}
					placeholder="Ingresa el serial del equipo"
					disabled={disabled}
				/>

				<Input
					type="text"
					fieldName="name"
					label="Nombre del equipo"
					register={register}
					errors={errors}
					placeholder="Ingresa el nombre del equipo"
					disabled={disabled}
				/>

				<Controller
					render={({ field }) => (
						<>
							<label
								htmlFor="type"
								className="block mb-2 text-sm font-medium text-gray-300"
							>
								Tipo de equipo
							</label>
							<select
								{...field}
								className="outline-none uppercase cursor-pointer border-2 text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:grayscale"
								disabled={disabled}
								id="type"
							>
								<option value="escritorio">Escritorio</option>
								<option value="laptop">Laptop</option>
								<option value="smartphone">Smartphone</option>
								<option value="otro">Otro</option>
							</select>
						</>
					)}
					control={control}
					name="type"
					id="type"
				/>

				<div className="flex justify-between items-center my-4">
					<Link
						to={role === 'admin' ? '/admin/equipos' : '/dashboard/equipos'}
						className="mr-2"
					>
						Volver
					</Link>

					<Button disabled={disabled}>Guardar</Button>
				</div>
			</form>
			{formSuccess && (
				<Toast
					message="Datos guardados"
					onClick={() => setFormSuccess(false)}
				/>
			)}
			{formError && (
				<Toast
					type="danger"
					message={formError.message}
					onClick={() => setFormError(false)}
				/>
			)}
		</>
	);
};

export default DeviceDetails;
