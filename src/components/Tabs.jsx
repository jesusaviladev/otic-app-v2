const Tabs = ({ children, tabs, selected, setSelected }) => {
	return (
		<div>
			<ul className="border-b border-gray-700 flex flex-wrap mb-2 font-medium text-center text-gray-300">
				{tabs.map((tab) => {
					const active =
						tab.label === selected
							? 'active lg:hover:text-gray-300 lg:hover:border-red-600'
							: '';

					return (
						<li key={tab.label} className="mr-2">
							<button
								className={`flex items-center p-2 md:p-3 border-b-2 border-transparent lg:hover:border-gray-100 lg:hover:text-gray-100 ${active}`}
								onClick={() => setSelected(tab.label)}
							>
								{tab.icon}
								<span className="ml-2">{tab.label}</span>
							</button>
						</li>
					);
				})}
			</ul>
			{children}
		</div>
	);
};

export default Tabs;
