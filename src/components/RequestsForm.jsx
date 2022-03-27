const RequestsForm = () => {

	return (
		<form>
			<h2>Nueva solicitud</h2>
			<fieldset>
				<legend>Datos de la solicitud</legend>
				<div>
					<div>
						<label htmlFor="description"></label>
						<textarea name="description" id="description" cols="30" rows="10" placeholder="Descripcion"></textarea>
					</div>
				</div>
			</fieldset>
			<fieldset>
				<legend>Datos del equipo</legend>
				<div>
					<label htmlFor="serial"></label>
					<input type="text" name="serial" placeholder="Serial del equipo"/>
				</div>
			</fieldset>
			<div>
				<button>Crear nueva</button>
			</div>
		</form>
		)
};

export default RequestsForm;
