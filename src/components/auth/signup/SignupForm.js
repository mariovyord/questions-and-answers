import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import FormInput from '../../form/FormInput';
import { signup } from '../../../services/auth.service';
import useNotificationContext from '../../../hooks/useNotificationContext';
import { AuthContext } from '../../../contexts/AuthContext';

const SignupForm = () => {
	const handleNotification = useNotificationContext();
	const { handleLogin } = useContext(AuthContext);
	const navigate = useNavigate();

	const validate = values => {
		const errors = {};

		// Username
		if (!values.username) {
			errors.username = 'Required';
		} else if (values.firstName.length > 30) {
			errors.username = 'Must be 30 characters or less';
		} else if (values.username.length < 4) {
			errors.username = 'Must be 4 characters or more'
		} else if (/\W/.test(values.username)) {
			errors.username = 'Must be a single alphanumeric word'
		}
		// First name
		if (!values.firstName) {
			errors.firstName = 'Required';
		} else if (values.firstName.length > 30) {
			errors.firstName = 'Must be 30 characters or less';
		} else if (/\W/.test(values.firstName)) {
			errors.firstName = 'Must be a single alphanumeric word'
		}
		// Last name
		if (!values.lastName) {
			errors.lastName = 'Required';
		} else if (values.lastName.length > 30) {
			errors.lastName = 'Must be 30 characters or less';
		} else if (/\W/.test(values.lastName)) {
			errors.lastName = 'Must be a single alphanumeric word'
		}
		// Description (not required)
		if (values.description.length > 60) {
			errors.password = 'Must be 60 characters or less';
		}

		// Password
		if (!values.password) {
			errors.password = 'Required';
		} else if (values.password.length > 60) {
			errors.password = 'Must be 60 characters or less';
		} else if (values.password.length < 6) {
			errors.password = 'Must be 6 characters or more'
		} else if (/\W/.test(values.password)) {
			errors.password = 'Must be a single alphanumeric word'
		}
		// Repeat password
		if (values.rePassword !== values.password) {
			errors.rePassword = 'Repeat password';
		}
		return errors;
	};

	return (
		<Formik
			initialValues={{
				username: '',
				firstName: '',
				lastName: '',
				description: '',
				password: '',
				rePassword: '',
			}}
			validate={validate}
			onSubmit={(values, { setSubmitting }) => {
				handleNotification('info', 'Form send!')
				signup(values)
					.then(x => {
						handleLogin(x.result);
						handleNotification('success', 'Sign up successful!');
					})
					.then(x => {
						navigate('/');
					})
					.catch(err => {
						handleNotification('error', err[0].message || 'Something went wrong');
					})
					.finally(() => {
						setSubmitting(false);
					});;
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
							placeholder="Make it short and memorable."
						/>
					</div>
					<div>
						<FormInput
							label="First name"
							id="firstName"
							name="firstName"
							type="text"
							placeholder="Your first name."
						/>
					</div>
					<div>
						<FormInput
							label="Last name"
							id="lastName"
							name="lastName"
							type="text"
							placeholder="Your last name."
						/>
					</div>
					<div>
						<FormInput
							label="Short Description"
							id="description"
							name="description"
							type="text"
							placeholder="Tell us something about yourself (optional)."
						/>
					</div>
					<div>
						<FormInput
							label="Password"
							id="password"
							name="password"
							type="password"
							placeholder="Pick a secure password..."
						/>
					</div>
					<div>
						<FormInput
							label="Repeat password"
							id="rePassword"
							name="rePassword"
							type="password"
							placeholder="... and repeat if here."
						/>
					</div>
					<div>
						<button
							disabled={formik.isSubmitting}
							type="submit"
							className='btn btn-accent mt-6 w-full'
						>
							Sign up
						</button>
					</div>
				</form>
			)}
		</Formik >
	);
}

export default SignupForm;