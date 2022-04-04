import { useForm } from 'react-hook-form';
import TextAreaInput from '../components/TextAreaInput.jsx';
import Button from '../components/Button.jsx';

const ReportsForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = (values) => {
		console.log(values);
	};

	return (
		<>
			<h2 className="text-2xl font-bold my-2 text-center">Nuevo reporte</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextAreaInput
					fieldName="comment"
					label="Comentario"
					helper="Este campo es requerido"
					register={register}
					errors={errors}
					placeholder="Agrega un comentario"
					isRequired={true}
				/>
				<div className="flex justify-end my-6">
					<Button disabled={isSubmitting}>Agregar</Button>
				</div>
			</form>
		</>
	);
};

export default ReportsForm;
