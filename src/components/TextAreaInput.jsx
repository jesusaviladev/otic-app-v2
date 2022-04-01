const TextAreaInput = ({
	fieldName,
	label,
	helper,
	register,
	errors,
	placeholder,
	isRequired
}) => {
	return (
		// Text area
		<div className="mb-2">
			<label htmlFor={fieldName} className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
			<textarea
				placeholder={placeholder}
				id={fieldName}
				className="outline-none block p-2.5 w-full h-28 text-md rounded-lg border-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
				{...register(fieldName, {
					required: {
						value: isRequired,
						message: 'Este campo es requerido',
					}
				})}
			/>
			<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{helper}</p>
			<p className="my-2 text-red-500 text-sm">
				{
					// Muestra errores si existen
					errors[fieldName] && errors[fieldName].message
				}
			</p>
		</div>
	);
};

export default TextAreaInput
