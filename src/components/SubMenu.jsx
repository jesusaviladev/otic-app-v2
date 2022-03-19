const SubMenu = ({ name, children }) => {

	return (
		<ul className="p-2 bg-gray-900">
			{name}
			{children}
		</ul>
		)
}

export default SubMenu