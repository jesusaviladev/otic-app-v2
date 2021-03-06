import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/Input.jsx';
import OptionsInput from '../components/OptionsInput.jsx';
import SelectInput from '../components/SelectInput.jsx';
import Button from '../components/Button.jsx';
import Toast from '../components/Toast.jsx';

const UsersForm = ({ handleAddUser }) => {
	const [formError, setFormError] = useState(false);
	const [formSuccess, setFormSuccess] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = (values) => {
		const data = {
			...values,
			ci: `${values.ciOptions}${values.ci}`,
		};

		delete data.ciOptions;

		handleAddUser(data)
			.then((res) => {
				reset();
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
				Crear nuevo usuario
			</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					fieldName="username"
					label="Nombre de usuario"
					register={register}
					errors={errors}
					placeholder="Ingresa el nombre del usuario"
					isRequired={true}
				/>
				<Input
					type="password"
					fieldName="password"
					label="Contraseña"
					helper="Mínimo 6 caracteres, sensible a mayúsculas"
					register={register}
					errors={errors}
					placeholder="Ingresa una contraseña"
					isRequired={true}
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
						isRequired={true}
					/>
					<Input
						type="text"
						fieldName="surname"
						label="Apellidos"
						register={register}
						errors={errors}
						placeholder="Ingresa los apellidos"
						isRequired={true}
					/>
					<OptionsInput
						type="text"
						fieldName="ci"
						label="Cédula de Identidad"
						register={register}
						errors={errors}
						placeholder="Ej: 26990863"
						isRequired={true}
						options={[
							{
								key: 'V',
								value: 'V-',
							},
							{
								key: 'E',
								value: 'E-',
							},
						]}
					/>
					<Input
						type="text"
						fieldName="telephone"
						label="Teléfono"
						register={register}
						errors={errors}
						placeholder="Ingresa el teléfono (formato internacional)"
						isRequired={true}
					/>
				</div>
				<Input
					type="email"
					fieldName="email"
					label="Email"
					register={register}
					errors={errors}
					placeholder="Ingresa un correo electrónico válido"
					isRequired={true}
				/>
				<SelectInput
					fieldName="role"
					label="Rol del usuario"
					register={register}
					errors={errors}
					isRequired={true}
					options={[
						{ key: 'admin', value: 1 },
						{ key: 'usuario', value: 2 },
					]}
				/>
				<div className="flex justify-end my-6">
					<Button disabled={isSubmitting}>Agregar</Button>
				</div>
			</form>
		</>
	);
};

export default UsersForm;
