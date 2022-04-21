const ListItems = ({ title, items }) => {
	return (
		<>
			<div class="p-4 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-neutral-900 dark:border-neutral-700">
				<div class="flex justify-between items-center mb-4">
					<h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
						{title}
					</h5>
					<a
						href="#"
						class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
					>
						Ver todo
					</a>
				</div>
				<div class="flow-root">
					<ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
						<li class="py-3 sm:py-4">
							<div class="flex items-center space-x-4">
								<div class="flex-shrink-0"></div>
								<div class="flex-1 min-w-0">
									<p class="text-sm font-medium text-gray-900 truncate dark:text-white">
										Neil Sims
									</p>
									<p class="text-sm text-gray-500 truncate dark:text-gray-400">
										email@windster.com
									</p>
								</div>
								<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
									$320
								</div>
							</div>
						</li>
						<li class="py-3 sm:py-4">
							<div class="flex items-center space-x-4">
								<div class="flex-shrink-0"></div>
								<div class="flex-1 min-w-0">
									<p class="text-sm font-medium text-gray-900 truncate dark:text-white">
										Bonnie Green
									</p>
									<p class="text-sm text-gray-500 truncate dark:text-gray-400">
										email@windster.com
									</p>
								</div>
								<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
									$3467
								</div>
							</div>
						</li>
						<li class="py-3 sm:py-4">
							<div class="flex items-center space-x-4">
								<div class="flex-shrink-0"></div>
								<div class="flex-1 min-w-0">
									<p class="text-sm font-medium text-gray-900 truncate dark:text-white">
										Michael Gough
									</p>
									<p class="text-sm text-gray-500 truncate dark:text-gray-400">
										email@windster.com
									</p>
								</div>
								<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
									$67
								</div>
							</div>
						</li>
						<li class="py-3 sm:py-4">
							<div class="flex items-center space-x-4">
								<div class="flex-shrink-0"></div>
								<div class="flex-1 min-w-0">
									<p class="text-sm font-medium text-gray-900 truncate dark:text-white">
										Lana Byrd
									</p>
									<p class="text-sm text-gray-500 truncate dark:text-gray-400">
										email@windster.com
									</p>
								</div>
								<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
									$367
								</div>
							</div>
						</li>
						<li class="pt-3 pb-0 sm:pt-4">
							<div class="flex items-center space-x-4">
								<div class="flex-shrink-0"></div>
								<div class="flex-1 min-w-0">
									<p class="text-sm font-medium text-gray-900 truncate dark:text-white">
										Thomes Lean
									</p>
									<p class="text-sm text-gray-500 truncate dark:text-gray-400">
										email@windster.com
									</p>
								</div>
								<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
									$2367
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default ListItems
