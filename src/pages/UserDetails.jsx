import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useSession from '../hooks/useSession.js';
import { getUserById, editUser } from '../services/users.services.js';
import Button from '../components/Button.jsx';
import { FaEdit } from 'react-icons/fa';
import Toast from '../components/Toast.jsx';
import Input from '../components/Input.jsx';
import Spinner from '../components/Spinner.jsx';

const UserDetails = () => {
	let { id } = useParams();

	const { user } = useSession();

	if(!id){
		id = JSON.parse(user).id
	} //fix quizas despues XD

	const { token } = JSON.parse(user);

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: '',
			password: '',
			name: '',
			surname: '',
			ci: '',
			telephone: '',
			email: '',
		},
	});

	const [disabled, setDisabled] = useState(true);

	const [editedUser, setEditedUser] = useState([]);

	const [loading, setLoading] = useState(true)

	const [formError, setFormError] = useState(false);

	const [formSuccess, setFormSuccess] = useState(false);

	useEffect(() => {
		getUserById(token, id)
			.then((res) => {
				setLoading(false)
				setEditedUser(res.data.user);
				reset({
					username: res.data.user.username,
					name: res.data.user.name,
					surname: res.data.user.surname,
					ci: res.data.user.ci,
					telephone: res.data.user.telephone,
					email: res.data.user.email,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const onSubmit = (values) => {
		editUser(token, id, values)
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
						message: 'Parece que algo va mal, por favor intente m??s tarde.',
					});
				}
			});
	};

	if(loading) return <Spinner/>

	return (
		<>
			<h2 className="text-2xl font-bold my-4">
				{`Perfil ${editedUser.username}`}{' '}
			</h2>

			<button
				onClick={() => {
					setDisabled(!disabled);
				}}
				className="cursor-pointer flex items-center my-4"
			>
				Haz click aqu?? para editar <FaEdit className="inline-block ml-2" />
			</button>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					fieldName="username"
					label="Nombre de usuario"
					register={register}
					errors={errors}
					placeholder="Ingresa el nombre del usuario"
					disabled={disabled}
				/>
				<Input
					type="password"
					fieldName="password"
					label="Contrase??a"
					helper="M??nimo 6 caracteres, sensible a may??sculas"
					register={register}
					errors={errors}
					placeholder="Ingresa una contrase??a"
					disabled={disabled}
					minimLength={6}
				/>
				<div className="grid md:gap-4 md:grid-cols-2">
					<Input
						type="text"
						fieldName="name"
						label="Nombres"
						register={register}
						errors={errors}
						placeholder="Ingresa los nombres"
						disabled={disabled}
					/>
					<Input
						type="text"
						fieldName="surname"
						label="Apellidos"
						register={register}
						errors={errors}
						placeholder="Ingresa los apellidos"
						disabled={disabled}
					/>
					<Input
						type="text"
						fieldName="ci"
						label="C??dula de Identidad"
						register={register}
						errors={errors}
						placeholder="Ej: V-26990863"
						disabled={disabled}
					/>
					<Input
						type="text"
						fieldName="telephone"
						label="Tel??fono"
						register={register}
						errors={errors}
						placeholder="Ingresa el tel??fono (formato internacional)"
						disabled={disabled}
					/>
				</div>
				<Input
					type="email"
					fieldName="email"
					label="Email"
					register={register}
					errors={errors}
					placeholder="Ingresa un correo electr??nico v??lido"
					disabled={disabled}
				/>

				<div className="flex justify-between items-center my-4">
					<Link to="/admin/usuarios" className="mr-2">
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

export default UserDetails;
