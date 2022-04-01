import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ title, children, onClose }) => {
	//renderizamos modal en un portal
	return createPortal(
		<div className="fixed top-0 left-0 w-full h-screen bg-black/50 z-50 flex items-center justify-center">
			<div className="bg-slate-600 text-gray-100 w-full h-full lg:w-3/4 lg:h-5/6 shadow-lg lg:rounded-md flex flex-col">
				<div className="flex justify-end">
					<h1>{title}</h1>
					<button onClick={onClose} className="p-5">
						<FaTimes className="w-6 h-6 hover:text-gray-200"/>
					</button>
				</div>
				<div className="p-5 overflow-y-auto">
					{children}
				</div>
			</div>
		</div>,
		document.getElementById('modal')
	);
};

export default Modal;
