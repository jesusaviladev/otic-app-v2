import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ children, onClose }) => {
	//renderizamos modal en un portal
	return createPortal(
		<div className="fixed top-0 left-0 w-full min-h-screen bg-black/50 z-50 flex items-center justify-center">
			<div className="relative bg-slate-700 text-gray-100 w-full h-screen lg:w-3/4 lg:h-auto shadow-lg p-5 lg:rounded">
				<div>
					<button onClick={onClose} className="absolute right-4">
						<FaTimes className="w-6 h-6 hover:text-gray-200"/>
					</button>
				</div>
				{children}
			</div>
		</div>,
		document.getElementById('modal')
	);
};

export default Modal;
