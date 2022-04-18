import { useState } from 'react';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

const PasswordField = ({ onChange, value }) => {
	// input de contraseña con estado visible/invisible
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => setVisible(!visible);

	return (
		<div className="relative">
			<label htmlFor="password"></label>
			<input
				type={visible ? 'text' : 'password'}
				placeholder="Contraseña"
				name="password"
				className="w-full py-3 px-3 mb-1 bg-gray-800 shadow appearance-none rounded leading-tight outline-none focus:ring ring-red-600"
				onChange={onChange}
				value={value}
			/>
			<i
				className="text-red-600 absolute right-4 top-1/2 -translate-y-1/2 hover:cursor-pointer"
				onClick={toggleVisibility}
			>
				{visible ? (
					<MdOutlineVisibilityOff className="w-6 h-6" />
				) : (
					<MdOutlineVisibility className="w-6 h-6" />
				)}
			</i>
		</div>
	);
};

export default PasswordField;
