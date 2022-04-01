import Spinner from './Spinner.jsx';

const TableSpinner = () => {
	// componente para mostrar en la tabla si está cargando datos
	return (
		<div className="p-8 flex justify-center items-center">
			<Spinner color="dark" />
		</div>
	);
};

export default TableSpinner;
