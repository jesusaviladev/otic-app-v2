import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useSession from '../hooks/useSession.js';
import { getReportById, editReport } from '../services/reports.services.js';
import Button from '../components/Button.jsx';
import { FaEdit } from 'react-icons/fa';
import Toast from '../components/Toast.jsx';
import TextAreaInput from '../components/TextAreaInput.jsx';

const ReportDetails = () => {
	const { id } = useParams();

	const { user } = useSession();

	const { token } = JSON.parse(user);

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			comment: '',
		},
	});

	const [disabled, setDisabled] = useState(true);

	const [report, setReport] = useState({});

	const [formError, setFormError] = useState(false);

	const [formSuccess, setFormSuccess] = useState(false);

	useEffect(() => {
		getReportById(token, id)
			.then((res) => {
				setReport(res.data.report);
				reset({
					comment: res.data.report.comment,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const onSubmit = (values) => {
		editReport(token, id, values)
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
				Detalles del reporte {`#${report.id}`}
			</h1>
			<button
				onClick={() => setDisabled(!disabled)}
				className="cursor-pointer flex items-center my-4"
			>
				Haz click aquí para editar <FaEdit className="inline-block ml-2" />
			</button>

			<div className="p-6 my-4 rounded-lg border border-gray-200 bg-gray-700 border-gray-700">
				<h2 className="mb-2 text-xl lg:text-2xl font-bold tracking-tight text-white">
					Reporte correspondiente a la solicitud {`#${report.request_id}`}
				</h2>

				<p className="mb-3 font-bold text-white">
					Fecha de emisión:{' '}
					<span className="font-normal text-gray-400">{`${report.date}`}</span>
				</p>

				<p className="mb-3 font-bold text-white">
					Usuario:{' '}
					<span className="font-normal text-gray-400">{`${report.user?.username}`}</span>
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<TextAreaInput
					fieldName="comment"
					label="Comentario"
					register={register}
					errors={errors}
					placeholder="Agrega un comentario"
					disabled={disabled}
				/>

				<div className="flex justify-between items-center my-4">
					<Link to={'/admin/reportes'} className="mr-2">
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

export default ReportDetails;
