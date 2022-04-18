const Input = ({
	fieldName,
	type = 'text',
	label,
	helper,
	register,
	errors,
	placeholder,
	isRequired,
	maximLength,
	minimLength,
	disabled = false,
}) => {
	return (
		// Input de texto
		<div className="mb-2">
			<label
				htmlFor={fieldName}
				className="block mb-2 text-sm font-medium text-gray-300"
			>
				{label}
			</label>
			<input
				type={type}
				placeholder={placeholder}
				id={fieldName}
				className="outline-none border-2 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:grayscale"
				{...register(fieldName, {
					required: {
						value: isRequired,
						message: 'Este campo es requerido',
					},
					maxLength: {
						value: maximLength,
						message: `El valor no debe ser mayor a ${maximLength} caracteres`,
					},
					minLength: {
						value: minimLength,
						message: `El valor no debe ser menor de ${minimLength} caracteres`,
					},
				})}
				disabled={disabled}
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

export default Input;
