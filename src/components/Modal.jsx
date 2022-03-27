import { createPortal } from 'react-dom';

const Modal = ({ children, onClose }) => {
	return createPortal(
		<div
			className="fixed top-0 left-0 w-full min-h-screen bg-black/25 z-50 flex items-center justify-center">
			<div className="bg-slate-700 text-gray-100 w-full h-screen lg:h-auto lg:w-3/4 shadow-md p-5 lg:rounded">
				<div>
					<button onClick={onClose}>Cerrar</button>
				</div>
				{children}
			</div>
		</div>,
		document.getElementById('modal')
	);
};

export default Modal;
