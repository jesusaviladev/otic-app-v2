import { createPortal } from 'react-dom';

const Modal = ({ children, onClose }) => {
	return createPortal(
		<div
			className="fixed top-0 left-0 w-full min-h-screen bg-black/25 z-50 flex items-center justify-center"
			onClick={onClose}
		>
			<div className="bg-gray-100 w-full h-screen lg:h-auto text-black lg:w-3/4 shadow-md p-5 lg:rounded">
				<div>
					<button>Cerrar</button>
				</div>
				{children}
			</div>
		</div>,
		document.getElementById('modal')
	);
};

export default Modal;
