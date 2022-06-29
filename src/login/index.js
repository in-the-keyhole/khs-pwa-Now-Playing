import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./login-styles.css";

const Login = () => {
	localStorage.removeItem('KHS-PWA|authUser');
	const navigate = useNavigate();

	const [loginError, setLoginError] = useState(false);

	const login = (e) => {
		e.preventDefault();
		const username = e.target.username.value;
		const password = e.target.password.value;
		if (username && password) {
			localStorage.setItem('KHS-PWA|authUser', true);
			navigate('/');
		} else {
			setLoginError(true);
		}
	};
	
	return (
		<div>
			<img className="logo" src="/images/logo.gif" alt="Logo"/>
			<div id="login-form">
				<form onSubmit={login} className="form-group" method="post">
					<label className="form-label" htmlFor="username">Username:
						<input type="text" id="username" name="username" className="form-control" />
					</label>
					<label className="form-label" htmlFor="password">Password:
						<input type="password" id="password" name="password" className="form-control" />
					</label>
				{loginError && 
					<p className="msg">Enter a username and password</p>
				}
					<button type="submit" className="btn btn-primary">
						Login
					</button>
				</form>
			</div>

			<div id="bg">
				<img src="/images/backdrops/login-backdrop.jpg" alt="Login backdrop" />
			</div>
		</div>
	);
}

export default Login;