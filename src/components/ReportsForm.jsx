import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom'
import { createReport } from '../services/reports.services.js'
import useSession from '../hooks/useSession.js';
import TextAreaInput from '../components/TextAreaInput.jsx';
import Button from '../components/Button.jsx';
import Toast from '../components/Toast.jsx';

const ReportsForm = () => {

	const { requestId } = useParams()

	const [formError, setFormError] = useState(false);
	const [formSuccess, setFormSuccess] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isSubmitting },
	} = useForm();

	const { user } = useSession();

	const { token } = JSON.parse(user);

	const onSubmit = (values) => {

		const data = {
			comment: values.comment,
			request_id: requestId,
		};

		createReport(token, data)
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
					message="Enviado correctamente"
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
			<h2 className="text-2xl font-bold my-2 text-center">Crear reporte para solicitud {`#${requestId}`}</h2>
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
