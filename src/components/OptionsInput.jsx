const OptionsInput = ({
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
	options = [],
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
			<div className="flex">
				<select
					{...register(`${fieldName}Options`)}
					defaultValue="V-"
					className="outline-none uppercase cursor-pointer border-2 rounded-l-lg text-md block p-2.5 bg-gray-200 border-gray-200 placeholder-black text-black focus:ring-blue-500 focus:border-blue-500 disabled:grayscale"
				>
					{options.map((option, index) => (
						<option key={index} value={option.value}>
							{option.key}
						</option>
					))}
				</select>
				<input
					type={type}
					placeholder={placeholder}
					id={fieldName}
					className="outline-none border-2 text-md rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:grayscale disabled:cursor-not-allowed"
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
			</div>
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

export default OptionsInput;
