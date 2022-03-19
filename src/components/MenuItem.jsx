import { useState } from 'react';

const MenuItem = ({ title, icon, children }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<li 
			className="bg-gray-800 mb-2 p-4 cursor-pointer rounded hover:bg-red-600 hover:border-l-4 hover:border-yellow-300" 
			onClick={() => setOpen(!open)}>
				{title}
			</li>
			{open && children}
		</>
	);
};

export default MenuItem;
