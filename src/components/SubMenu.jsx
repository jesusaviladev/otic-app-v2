const SubMenu = ({ name, children }) => {

	return (
		<ul className="p-2">
			{name}
			{children}
		</ul>
		)
}

export default SubMenu