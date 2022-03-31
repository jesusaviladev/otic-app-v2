import { useForm } from 'react-hook-form';
import useSession from '../hooks/useSession.js';
import Input from '../components/Input.jsx';
import SelectInput from '../components/SelectInput.jsx'
import PasswordField from '../components/PasswordField.jsx'
import Button from '../components/Button.jsx';

const UsersForm = ({ onClose }) => {
	const { user } = useSession();

	const { token, role } = JSON.parse(user);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = (values) => {
		console.log(values)
	}

	return (
		<>
			<h2>Crear nuevo usuario</h2>
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
					<PasswordField
					/>
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
					<Input
						type="text"
						fieldName="ci"
						label="Cédula de Identidad"
						register={register}
						errors={errors}
						placeholder="Ej: V-26990863"
						isRequired={true}
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
						options={[{ key: 'admin', value: 1}, { key: 'usuario', value: 2}]}
					/>
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

export default UsersForm;
