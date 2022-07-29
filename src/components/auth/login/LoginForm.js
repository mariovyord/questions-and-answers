import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import FormInput from '../../form/FormInput';
import { login } from '../../../services/auth.service';
import useNotificationContext from '../../../hooks/useNotificationContext';
import { AuthContext } from '../../../contexts/AuthContext';

const LoginForm = () => {
	const handleNotification = useNotificationContext();
	const { handleLogin } = useContext(AuthContext);
	const navigate = useNavigate();

	const validate = values => {
		const errors = {};

		// Username
		if (!values.username) {
			errors.username = 'Required';
		} else if (/\W/.test(values.username)) {
			errors.username = 'Must be a single alphanumeric word'
		}
		// Password
		if (!values.password) {
			errors.password = 'Required';
		} else if (/\W/.test(values.password)) {
			errors.password = 'Must be a single alphanumeric word'
		}

		return errors;
	};

	return (
		<Formik
			initialValues={{
				username: '',
				password: '',
			}}
			validate={validate}
			onSubmit={(values, { setSubmitting }) => {
				handleNotification('info', 'Form send!')
				login(values)
					.then(x => {
						handleLogin(x.result);
						handleNotification('success', 'Login successful!');
					})
					.then(x => {
						navigate('/');
					})
					.catch(err => {
						handleNotification('error', err[0].message || 'Something went wrong');
					})
					.finally(() => {
						setSubmitting(false);
					});
			}}
		>
			{formik => (
				<form onSubmit={formik.handleSubmit} className='form-control'>
					<div>
						<FormInput
							label="Username"
							id="username"
							name="username"
							type="text"
							placeholder="Your username..."
						/>
					</div>
					<div>
						<FormInput
							label="Password"
							id="password"
							name="password"
							type="password"
							placeholder="... and your password."
						/>
					</div>
					<div>
						<button
							disabled={formik.isSubmitting}
							type="submit"
							className='btn btn-accent mt-6 w-full'
						>
							Login
						</button>
					</div>
				</form>
			)}
		</Formik >
	);
}

export default LoginForm;