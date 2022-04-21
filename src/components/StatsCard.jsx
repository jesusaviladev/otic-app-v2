const StatsCard = ({ title, content }) => {

	return (
	    <div class="p-4 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-slate-700 dark:border-gray-700">
	        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{title}</h5>
	        <div class="flex items-baseline text-gray-900 dark:text-white">
	            <span class="text-5xl font-extrabold tracking-tight">{content}</span>
	        </div> 
	    </div>

		)
}

export default StatsCard;