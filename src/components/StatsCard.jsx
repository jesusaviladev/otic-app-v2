const StatsCard = ({ title, content }) => {

	return (
	    <div className="p-4 rounded-lg border shadow-md sm:p-8 bg-slate-700 border-gray-700">
	        <h5 className="mb-4 text-xl font-medium text-gray-400">{title}</h5>
	        <div className="flex items-baseline text-white">
	            <span className="text-5xl font-extrabold tracking-tight">{content}</span>
	        </div> 
	    </div>

		)
}

export default StatsCard;