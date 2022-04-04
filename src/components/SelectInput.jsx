const SelectInput = ({
	fieldName,
	label,
	helper,
	options = [],
	register,
	errors,
	isRequired,
}) => {
	return (
		<div className="mb-2">
			<label
				htmlFor={fieldName}
				className="block mb-2 text-sm font-medium text-gray-300"
			>
				{label}
			</label>
			<select
				{...register(fieldName, {
					required: {
						value: isRequired,
						message: 'Este campo es requerido',
					},
				})}
				id={fieldName}
				className="outline-none uppercase cursor-pointer border-2 text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
				defaultValue=""
			>
				<option value="" className="normal-case" disabled>
					Selecciona una opción
				</option>
				{options.map((option, index) => (
					<option className="capitalize" key={index} value={option.value}>
						{option.key}
					</option>
				))}
			</select>
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

export default SelectInput;
