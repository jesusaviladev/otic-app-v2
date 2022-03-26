import { createPortal } from 'react-dom';

const Modal = ({ children, onClose }) => {
	return createPortal(
		<div
			className="fixed top-0 left-0 w-full min-h-screen bg-black/25 z-50"
			onClick={onClose}
		>
			<div className="bg-red-700">
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
