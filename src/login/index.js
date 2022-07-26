import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./login-styles.css";
import { LS_PREFIX, authUser } from "../utils";

const Login = () => {
	localStorage.removeItem(LS_PREFIX+'authUser');
	const navigate = useNavigate();

	const [loginError, setLoginError] = useState("");

	const login = async (e) => {
		e.preventDefault();
		const username = e.target.username.value.toLowerCase();	//converting to lower case so don't have to switch cases when on phone
		const password = e.target.password.value;
		if (username && password) {

			//if online, check username and password against db
			//if user is found, set local storage token of md5(username + password + SALT)
			const authResponse = await authUser(username, password);

			console.log("auth response", authResponse);

			//if offline, check if local storage token exists and matches username & password combo

			if (authResponse) {
				localStorage.setItem(LS_PREFIX+'authUser', true);
				navigate('/movies');
			} else {
				setLoginError("Username or password is invalid");
			}
		} else {
			setLoginError("Enter a username and password");
		}
	};
	
	return (
		<div>
			<img className="logo" src="/images/logo.gif" alt="Logo"/>
			<div id="login-form">
				<form onSubmit={login} className="form-group" method="post">
					<label className="form-label" htmlFor="username">Username:
						<input type="text" id="username" name="username" className="form-control" autoComplete="off" />
					</label>
					<label className="form-label" htmlFor="password">Password:
						<input type="password" id="password" name="password" className="form-control" autoComplete="off" />
					</label>
				{loginError && 
					<p className="msg">{loginError}</p>
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