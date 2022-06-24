import React, { Component } from 'react'
import './login-styles.css'

export default class Login extends Component {
	constructor(props) {
		super(props)
	}

	login = (e) => {
		e.preventDefault();
		window.location = '/';
	}

	render() {
		return (
			<div>
				<img className="logo" src="/images/logo.gif" alt="Logo"/>
				<div id="login-form">
					<form onSubmit={this.login} className="form-group">
				    <label className="form-label" htmlFor="username">Username:
				      <input type="text" id="username" name="username" className="form-control" />
				    </label>
				    <label className="form-label" htmlFor="password">Password:
				      <input type="password" id="password" name="password" className="form-control" />
				    </label>
				    <button type="submit" className="btn btn-primary">
				      Login
				    </button>
				  </form>
				</div>

				<div id="bg">
					<img src="/images/backdrops/login-backdrop.jpg" alt="Login backdrop" />
				</div>
			</div>
		)
	}
}