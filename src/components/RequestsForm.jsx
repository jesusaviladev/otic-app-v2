import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/Input.jsx';
import TextAreaInput from '../components/TextAreaInput.jsx';
import SelectInput from '../components/SelectInput.jsx';
import Button from '../components/Button.jsx';
import { getUsers } from '../services/users.services.js';
import { getDeviceBySerial } from '../services/devices.services.js';
import { createRequest } from '../services/requests.services.js';
import useSession from '../hooks/useSession.js';
import Toast from '../components/Toast.jsx';
import debounce from 'just-debounce-it';

// REVISAR
const RequestsForm = () => {
	const { user } = useSession();

	const { token, role } = JSON.parse(user);

	const [users, setUsers] = useState([]);

	const [deviceExists, setDeviceExists] = useState(true);

	const [formError, setFormError] = useState(false);

	const [formSuccess, setFormSuccess] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		watch,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			user_id: null,
			serial: '',
			description: '',
			type: '',
			name: '',
		},
	});

	const watchSerial = watch('serial');

	useEffect(() => {
		// si el usuario es admin, recuperamos las opciones del select

		if (role === 'admin') {
			getUsers(token)
				.then((res) => {
					const users = res.data.users
						.filter((user) => user.role_id !== 1)
						.map((user) => {
							return {
								value: user.id,
								key: `${user.name} ${user.surname}`,
							};
						});

					setUsers(users);
				})
				.catch((error) => console.log(error));
		}
	}, []);

	useEffect(() => {
		// FIX: Debounce
		// recuperamos equipo segun el serial suscribiendose al input
		console.log(watchSerial);
		getDeviceBySerial(token, watchSerial)
			.then((res) => {
				console.log(res);
				setDeviceExists(true);
			})
			.catch((err) => {
				console.log(err);
				if (err.response) {
					setDeviceExists(false);
				}
			});
	}, [watchSerial]);

	const onSubmit = (values) => {
		console.log(values);
		const { description, user_id, serial, type, name } = values;

		const data = {
			description,
			user_id: user_id || null,
			device: {
				exists: deviceExists,
				serial,
				type,
				name,
			},
		};

		createRequest(token, data)
			.then((res) => {
				console.log(res);
				setDeviceExists(true);
				reset({
					description: '',
					serial: '',
				});
				setFormSuccess(true);
			})
			.catch((err) => {
				if (err.response) {
					const { errors } = err.response.data;

					errors.forEach((error) => {
						setError(error.param, {
							type: 'server',
							message: error.msg,
						});
					});
				} else {
					setFormError({
						message: 'Parece que algo va mal, por favor intente más tarde.',
					});
				}
			});
	};

	return (
		<>
			{formSuccess && (
				<Toast
					message="Registrado correctamente"
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

			<h2 className="text-2xl font-bold my-4 text-center">
				Crear nueva solicitud
			</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset>
					<legend className="text-lg my-2 text-center">
						Datos de la solicitud
					</legend>

					{role === 'admin' && (
						<SelectInput
							fieldName="user_id"
							register={register}
							errors={errors}
							label="Asignar un usuario (opcional)"
							helper="No seleccionar para no asignar ningún usuario"
							options={users}
						/>
					)}

					<TextAreaInput
						fieldName="description"
						label="Descripción de la solicitud"
						register={register}
						errors={errors}
						placeholder="Añadir un comentario..."
						isRequired={true}
					/>
				</fieldset>
				<fieldset>
					<legend className="text-lg my-2 text-center">Datos del equipo</legend>
					<Input
						type="text"
						fieldName="serial"
						label="Serial del equipo"
						register={register}
						errors={errors}
						placeholder="Ingresa el serial del equipo"
						isRequired={true}
					/>
					{deviceExists ? null : (
						<div>
							<p className="my-4">
								Este equipo no ha sido registrado, por favor indique los
								siguientes datos:{' '}
							</p>
							<SelectInput
								fieldName="type"
								label="Tipo"
								register={register}
								errors={errors}
								helper="Tipo de equipo (Escritorio, Laptop, etc)."
								options={[
									{
										key: 'Escritorio',
										value: 'escritorio',
									},
									{
										key: 'Laptop',
										value: 'laptop',
									},
									{
										key: 'Smartphone',
										value: 'smartphone',
									},
									{
										key: 'Otro',
										value: 'otro',
									},
								]}
								isRequired={true}
							/>
							<Input
								type="text"
								fieldName="name"
								label="Nombre del equipo"
								register={register}
								errors={errors}
								placeholder="Ingresa el nombre del equipo"
								helper="Nombre identificativo"
								isRequired={true}
							/>
						</div>
					)}
				</fieldset>
				<div className="flex justify-end my-6">
					<Button>Agregar</Button>
				</div>
			</form>
		</>
	);
};

export default RequestsForm;
