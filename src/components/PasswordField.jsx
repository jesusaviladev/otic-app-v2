import { useState } from 'react';

const PasswordField = ({ onChange, value }) => {
	const [visible, setVisible] = useState(false);

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
			<img
				src={
					visible
						? '/assets/icons/visibility-off.svg'
						: '/assets/icons/visibility.svg'
				}
				alt="visibility"
				className="absolute right-4 top-1/2 -translate-y-[0.9rem] hover:cursor-pointer"
				onClick={(e) => setVisible(!visible)}
			/>
		</div>
	);
};

export default PasswordField;
