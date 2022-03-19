import { useState } from 'react';

const MenuItem = ({ title, icon, children }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<li 
			className="p-4 cursor-pointer rounded hover:bg-gray-100 hover:text-black hover:border-l-4 hover:border-red-600" 
			onClick={() => setOpen(!open)}>
				{title}
			</li>
			{open && children}
		</>
	);
};

export default MenuItem;
