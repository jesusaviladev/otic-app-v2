import { createPortal } from 'react-dom';
const ConfirmModal = ({ onClose, message, onConfirm }) => {
	return createPortal(
		<div className="fixed top-0 left-0 w-full h-screen bg-black/50 z-50 flex items-center justify-center">
			<div className="relative max-w-md p-4 rounded-lg shadow bg-gray-700">
				<div className="flex justify-end p-2">
					<button
						onClick={onClose}
						type="button"
						className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
					>
						<svg
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</button>
				</div>
				<div className="p-6 pt-0 text-center">
					<svg
						className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
					<h3 className="mb-5 text-lg font-normal text-gray-400">
						{message}
					</h3>
					<p className="mb-5 text-sm font-normal">
						Esta acción no puede ser revertida
					</p>
					<button
						onClick={onConfirm}
						type="button"
						className="text-white bg-red-600 hover:bg-red-800 focus:outline-none dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
					>
						Eliminar
					</button>
					<button
						onClick={onClose}
						type="button"
						className=" focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>,
		document.getElementById('modal')
	);
};

export default ConfirmModal;
