const Tab = ({ children, isSelected }) => {
	if (isSelected) {
		return <div>{children}</div>;
	} else {
		return null;
	}
};

export default Tab;
