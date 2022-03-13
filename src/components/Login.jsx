const Login = () => {
	return (
		<div>
			<div className="w-96 h-96 bg-slate-700 rounded shadow-md">
				<div>
					<img src={'assets/upt-logo.jpg'} alt="logo" />
					<h2>Inicia sesión</h2>
				</div>
				<form action="#">
					<div>
						<div>
							<label htmlFor="username"></label>
							<input type="text" placeholder="Usuario" name="usuario" />
						</div>
						<div>
							<label htmlFor="password"></label>
							<input type="text" placeholder="Contraseña" name="password" />
						</div>
					</div>
					<div>
						<a href="#">¿Olvidaste tu contraseña?</a>
					</div>
					<div>
						<button>Iniciar sesión</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
