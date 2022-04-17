import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import useSession from '../hooks/useSession.js';
import { getRequestById, editRequest } from '../services/requests.services.js';
import TextAreaInput from '../components/TextAreaInput.jsx';
import Button from '../components/Button.jsx';
import { FaEdit } from 'react-icons/fa';
import { getUsers } from '../services/users.services.js';
import Toast from '../components/Toast.jsx';

const RequestDetails = () => {
	const { id } = useParams();

	const { user } = useSession();

	const { token } = JSON.parse(user);

	const {
		register,
		handleSubmit,
		reset,
		control,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			user_id: '',
			description: '',
		},
	});

	const [disabled, setDisabled] = useState(true);

	const [users, setUsers] = useState([]);

	const [formError, setFormError] = useState(false);

	const [formSuccess, setFormSuccess] = useState(false);

	useEffect(() => {
		Promise.all([getRequestById(token, id), getUsers(token)])
			.then((res) => {
				reset({
					user_id: res[0].data.request.user_id || '',
					description: res[0].data.request.description,
				});

				const users = res[1].data.users
					.filter((user) => user.role_id !== 1)
					.map((user) => {
						return {
							value: user.id,
							key: `${user.name} ${user.surname}`,
						};
					});

				setUsers(users);
			})
			.catch((err) => console.log(err));
	}, []);

	const onSubmit = (values) => {
		const data = {
			description: values.description,
			user_id: values.user_id || null,
		};

		editRequest(token, id, data)
			.then((res) => {
				setFormSuccess(true);
				setDisabled(true);
			})
			.catch((err) => {
				console.log(err);

				if (err.response) {
					const { error, errors } = err.response.data;

					if (error) {
						setError('user_id', {
							type: 'server',
							message: error,
						});
					}

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
			<h2 className="text-2xl font-bold my-4">Detalles de solicitud #{id}</h2>

			<button
				onClick={() => {
					setDisabled(!disabled);
				}}
				className="cursor-pointer flex items-center my-4"
			>
				Haz click aquí para editar <FaEdit className="inline-block ml-2" />
			</button>

			<form onSubmit={handleSubmit(onSubmit)}>
				{/* FIX               */}

				<Controller
					render={({ field }) => (
						<select
							{...field}
							className="outline-none uppercase cursor-pointer border-2 text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:grayscale"
							disabled={disabled}
						>
							<option value="">Sin usuario</option>
							{users.map((user, index) => (
								<option className="capitalize" key={index} value={user.value}>
									{user.key}
								</option>
							))}
						</select>
					)}
					control={control}
					name="user_id"
				/>
				<p className="my-2 text-red-500 text-sm">
					{
						// Muestra errores si existen
						errors.user_id && errors.user_id.message
					}
				</p>

				<TextAreaInput
					fieldName="description"
					label="Descripción"
					register={register}
					errors={errors}
					disabled={disabled}
					isRequired={true}
				/>

				<div className="flex justify-between items-center my-4">
					<Link to="/admin/solicitudes" className="mr-2">
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

export default RequestDetails;
