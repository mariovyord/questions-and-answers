import React, { useState, useContext } from 'react';
import { signup } from '../../services/auth.service';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
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
		const username = formData.get('username').trim().toLowerCase();
		const firstName = formData.get('firstName').trim();
		const lastName = formData.get('lastName').trim();
		const description = formData.get('description').trim();
		const password = formData.get('password').trim();
		const rePassword = formData.get('rePassword').trim();


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

		const user = {
			username,
			firstName,
			lastName,
			description,
			password
		}

		signup(user)
			.then(data => {
				// TODO Move refresh token elsewhere
				handleLogin({
					_id: data._id,
					accessToken: data.tokens.accessToken,
					refreshToken: data.tokens.refreshToken,
				});
				navigate('/')
			}).catch((err) => {
				console.log(err.errors);
			})
	}

	// const inputStyles = 'input input-bordered';
	// const inputStylesError = 'input input-error';

	return (
		<div className='flex justify-center w-full p-3 bg-base-100'>
			<div className='w-96 py-8'>
				<h1 className='font-bold text-5xl text-center mb-8'>Sign up</h1>
				<form className='form-control max-w-sm' onSubmit={handleSubmit}>
					<label htmlFor="username" className='label'>Username</label>
					<input name="username" id="username" type="text" className='input input-bordered' placeholder='Make it short and memorable.' />

					<label htmlFor="firstName" className='label'>First name</label>
					<input name="firstName" id="firstName" type="text" className='input input-bordered' placeholder='Your first name.' />

					<label htmlFor="lastName" className='label'>Last name</label>
					<input name="lastName" id="lastName" type="text" className='input input-bordered' placeholder='Your last name.' />

					<label htmlFor="description" className='label'>Short Description</label>
					<input name="description" id="description" type="text" className='input input-bordered' placeholder='Tell us something about yourself.' />

					<label htmlFor="password" className='label'>Password</label>
					<input name="password" id="password" type="password" className='input input-bordered' placeholder='Pick a secure password...' />

					<label htmlFor="rePassword" className='label'>Repeat password</label>
					<input name="rePassword" id="rePassword" type="password" className='input input-bordered' placeholder='... and repeat if here.' />

					<input type="submit" className='btn btn-accent mt-6' placeholder='username' value={'Sign up'} />
				</form>
			</div>
		</div>
	)
}
