import { Link } from 'react-router-dom';

const Button = ({ children, href, onClick, disabled = false }) => {
	if (href) {
		return (
			<Link
				to={href}
				className="px-6 py-2 rounded bg-red-600 font-medium rounded hover:bg-red-700"
			>
				{children}
			</Link>
		);
	}

	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className="px-6 py-2 rounded bg-red-600 font-medium rounded hover:bg-red-700"
		>
			{children}
		</button>
	);
};

export default Button;
