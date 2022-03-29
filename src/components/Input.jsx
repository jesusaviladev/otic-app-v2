const Input = ({
	fieldName,
	register,
	errors,
	placeholder,
	isRequired,
	maximLength,
	minimLength
}) => {
	return (
		//Input de texto
		<div>
			<label htmlFor={fieldName}></label>
			<input
				type="text"
				placeholder={placeholder}
				id={fieldName}
				className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
				{...register(fieldName, {
					required: {
						value: isRequired,
						message: 'Este campo es requerido',
					},
					maxLength: {
						value: maximLength,
						message: `El valor debe ser mayor a ${maximLength} caracteres`,
					},
					minLength: {
						value: minimLength,
						message: `El valor debe ser menor a ${minimLength} caracteres`,
					},
				})}
			/>
			<p className="my-2 text-red-600 text-sm">
				{
					//Muestra errores si existen
					errors[fieldName] && errors[fieldName].message
				}
			</p>
		</div>
	);
};

export default Input;
