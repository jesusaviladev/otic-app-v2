const Spinner = ({ color }) => {
	const colorClass = color === 'dark' ? `border-black/50` : `border-white/50`;

	return (
		<span
			className={`block w-6 h-6 border-4 ${colorClass} border-l-transparent rounded-full animate-spin`}
		/>
	);
};

export default Spinner;
