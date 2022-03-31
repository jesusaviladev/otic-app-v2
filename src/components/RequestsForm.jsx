import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/Input.jsx';
import TextAreaInput from '../components/TextAreaInput.jsx';
import SelectInput from '../components/SelectInput.jsx';
import Button from '../components/Button.jsx';
import { getUsers } from '../services/users.services.js';
import { createRequest } from '../services/requests.services.js'
import useSession from '../hooks/useSession.js';
// REVISAR
const RequestsForm = ({ onClose }) => {
	const { user } = useSession();

	const { token, role } = JSON.parse(user);

	const [users, setUsers] = useState([]);

	useEffect(() => {
		//si el usuario es admin, recuperamos las opciones del select
		
		if (role === 'admin') {
			getUsers(token)
				.then((res) => {

					const users = res.data.users
					.filter(user => user.role_id !== 1)
					.map(user => {
						return { 
							value: user.id, 
							key: `${user.name} ${user.surname}`
						}
					})

					setUsers(users);
				})
				.catch((error) => console.log(error));
		}
	}, []);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = (values) => {

		const { description, user_id, serial } = values

		const data = {
			description,
			user_id,
			device: {
				exists: true,
				serial,
				type: 'Escritorio',
				name: 'PC-VIT'
			}
		}

		createRequest(token, data)
		.then(res => console.log(res))
		.catch(err => console.dir(err))
	};

	return (
		<>
			<h2 className="text-3xl font-bold mt-12 mb-4">Crear nueva solicitud</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset>
					<legend className="text-xl my-2">Datos de la solicitud</legend>

					{
						role === 'admin' && 
						<SelectInput
						fieldName="user_id"
						register={register}
						errors={errors}
						label="Asignar un usuario (opcional)"
						options={users}
						/>
					}

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
					<legend className="text-xl my-2">Datos del equipo</legend>
					<Input
						type="text"
						fieldName="serial"
						label="Serial del equipo"
						register={register}
						errors={errors}
						placeholder="Ingresa el serial del equipo"
						isRequired={true}
					/>
				</fieldset>
				<div className="flex justify-end my-2">
					<button type="button" onClick={onClose} className="mr-4">
						Cancelar
					</button>
					<Button>Agregar</Button>
				</div>
			</form>
		</>
	);
};

export default RequestsForm;
