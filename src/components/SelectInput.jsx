const SelectInput = ({
	fieldName,
	label,
	options = [],
	register,
	errors,
	isRequired
}) => {

	return (
		<div className="mb-2">
			<label htmlFor={fieldName} className="block">
				{label}
			</label>
			<div className="text-black inline-block relative w-64">
				<select
					{...register(fieldName, {
						required: {
							value: isRequired,
							message: 'Este campo es requerido',
						},
					})}
					id={fieldName}
					className="uppercase cursor-pointer block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
					defaultValue=""
				>	
					<option value="" className="normal-case" disabled>Selecciona una opción</option>
					{options.map((option, index) => (
						<option
						className="capitalize" 
						key={index} 
						value={option.value}>{option.key}</option>
					))}
				</select>
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
					<svg
						className="fill-current h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
					</svg>
				</div>
			</div>
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
