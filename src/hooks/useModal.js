import { useState, useEffect } from 'react';

const useModal = () => {
	// hook para reutilizar la logica de la ventana modal
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (showModal) {
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowY = 'auto';
		}
	}, [showModal]);

	const toggleModal = () => setShowModal(!showModal);

	return {
		showModal,
		toggleModal,
	};
};

export default useModal;
