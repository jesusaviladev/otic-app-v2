const SubMenu = ({ name, children }) => {

	return (
		<ul className="p-2 bg-gray-900 flex flex-col gap-y-1">
			{name}
			{children}
		</ul>
		)
}

export default SubMenu