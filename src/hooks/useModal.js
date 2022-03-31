import { useState } from 'react'

const useModal = () => {
	//hook para reutilizar la logica de la ventana modal
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => setShowModal(!showModal);

	return {
		showModal,
		toggleModal
	}
}

export default useModal;