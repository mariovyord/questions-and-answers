import React from 'react';
import { Formik } from 'formik';
import FormInput from '../../form/FormInput';

import useNotificationContext from '../../../hooks/useNotificationContext';
import { editUser } from '../../../services/data.service';

const EditProfileForm = ({ profile, handleSetProfile }) => {
	const handleNotification = useNotificationContext();

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

		return errors;
	};

	return (
		<Formik
			initialValues={{
				username: profile.username,
				firstName: profile.firstName,
				lastName: profile.lastName,
				description: profile.description,
			}}
			validate={validate}
			onSubmit={(values, { setSubmitting }) => {
				handleNotification('info', 'Form send!')
				editUser(profile._id, values)
					.then(x => {
						handleNotification('success', 'Profile updated!');
						handleSetProfile(x.result)
					})
					.catch(err => {
						handleNotification('error', err[0]?.message || 'Something went wrong');
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
						<button
							disabled={formik.isSubmitting}
							type="submit"
							className='btn btn-accent mt-6 w-full'
						>
							Save info
						</button>
					</div>
				</form>
			)}
		</Formik >
	);
}

export default EditProfileForm