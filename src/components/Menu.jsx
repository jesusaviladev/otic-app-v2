const Menu = ({ children }) => {

	return (
		<nav>
			<ul className="p-2">
				{children}
			</ul>
		</nav>
		)
}

export default Menu;
