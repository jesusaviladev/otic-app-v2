import { useForm } from 'react-hook-form'
import Input from '../components/Input.jsx'
import TextAreaInput from '../components/TextAreaInput.jsx'

const RequestsForm = () => {

	const { register, handleSubmit, watch, formState: { errors } } = useForm();

	const onSubmit = (values) => {
		console.log(values)
	}

	return (
		<>
			<h2>Nueva solicitud</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset>
					<legend>Datos de la solicitud</legend>
					<div>
						<label htmlFor="user">
							Asignar un usuario
						</label>
						<select 
						{...register('user_id')}
						id="user">
							<option value=''>Sin usuario</option>
							<option value="jesus">Jesus</option>
							<option value="manuel">Manuel</option>
						</select>
					</div>
					<TextAreaInput
					fieldName="descripcion"
					register={register} 
					errors={errors} 
					placeholder="Comentarios de la solicitud" 
					isRequired={true} 
					/>
				</fieldset>
				<fieldset>
					<legend>Datos del equipo</legend>
						<Input
							fieldName="serial"
							register={register} 
							errors={errors} 
							placeholder="Ingresa el serial del equipo" 
							isRequired={true} 
						/>
				</fieldset>
				<div>
					<button>Crear nueva</button>
				</div>
			</form>
		</>
		)
};

export default RequestsForm;
