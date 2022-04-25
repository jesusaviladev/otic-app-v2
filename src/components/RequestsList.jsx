const RequestsList = ({ title, requests = [], link = '#' }) => {
	return (
		<>
			<div className="p-4 rounded-lg border shadow-md sm:p-8 bg-neutral-900 border-neutral-700">
				<div className="flex justify-between items-center mb-4">
					<h5 className="text-xl font-bold leading-none text-white">
						{title}
					</h5>
					<a
						href={link}
						className="text-sm font-medium hover:underline text-blue-500"
					>
						Ver todo
					</a>
				</div>
				<div className="flow-root">
					<ul role="list" className="divide-y divide-gray-700">
					{
						requests.map((request, index) => (

							<li className="py-3 sm:py-4" key={index}>
								<div className="flex items-center space-x-4">
									<div className="flex-shrink-0"></div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-white truncate">
											{request.description}
										</p>
										<p className="text-sm truncate text-gray-400">
											{new Date(request.date).toLocaleString('es-ES')}
										</p>
									</div>
									<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
										{request.user?.username}
									</div>
								</div>
							</li>

							))
					}

					</ul>
				</div>
			</div>
		</>
	);
};

export default RequestsList
