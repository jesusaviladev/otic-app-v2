const Menu = ({ children }) => {
	return (
		<nav>
			<ul className="flex flex-col gap-y-1 p-2">{children}</ul>
		</nav>
	);
};

export default Menu;
