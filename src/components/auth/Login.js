import React, { useState, useContext } from 'react';
import { login } from '../../services/auth.service';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// TODO Full refactor and Add abstraction
export default function Login() {
	const [errors, setErrors] = useState({
		username: false,
		password: false,
	});

	const { handleLogin } = useContext(AuthContext);
	const navigate = useNavigate();

	const isNotValid = (str) => {
		if (str.length < 3) return true;
		if (str.length > 30) return true;
		if (/\W/.test(str)) return true;
		return false;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const username = formData.get('username').trim();
		const password = formData.get('password').trim();

		if (isNotValid(username) || isNotValid(password)) {
			setErrors({
				username: isNotValid(username),
				password: isNotValid(password),
			});

			setTimeout(() => {
				setErrors({
					username: false,
					password: false,
				});
			}, 4000)

			return;
		}

		login(username, password)
			.then(data => {
				// TODO Add error handling
				// TODO Move refresh token elsewhere
				handleLogin({
					_id: data.result._id,
					accessToken: data.result.accessToken,
					refreshToken: data.result.refreshToken,
				});
				navigate('/')
			}).catch((err) => {
				console.log(err.errors);
			})
	}

	const inputStyles = 'input input-bordered';
	const inputStylesError = 'input input-error';

	return (
		<form className="form-control" onSubmit={handleSubmit}>
			<h2 className='font-bold text-xl text-center'>Login</h2>
			<label htmlFor="username" className='label' >Username</label>
			<input type="text" className={errors.username ? inputStylesError : inputStyles} placeholder='Your username.' name="username" id="username" />
			<label htmlFor="password" className='label' >Password</label>
			<input type="password" placeholder="Your password." className={errors.password ? inputStylesError : inputStyles} name="password" id="password" />
			<button className="btn btn-primary mt-4">Login</button>
		</form>
	)
}
