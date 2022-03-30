const TextAreaInput = ({
	fieldName,
	label,
	register,
	errors,
	placeholder,
	isRequired
}) => {
	return (
		// Text area
		<div className="mb-2">
			<label htmlFor={fieldName}>{label}</label>
			<textarea
				placeholder={placeholder}
				id={fieldName}
				className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700 resize-none h-48"
				{...register(fieldName, {
					required: {
						value: isRequired,
						message: 'Este campo es requerido',
					}
				})}
			/>
			<p className="my-2 text-red-600 text-sm">
				{
					// Muestra errores si existen
					errors[fieldName] && errors[fieldName].message
				}
			</p>
		</div>
	);
};

export default TextAreaInput
