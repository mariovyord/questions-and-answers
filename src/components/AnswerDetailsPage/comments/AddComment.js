import React, { useState } from 'react';
import { Formik } from 'formik';
import FormTextarea from '../../form/FormTextarea';
import useNotificationContext from '../../../hooks/useNotificationContext';
import { postComment } from '../../../services/data.service';
import useUserData from '../../../hooks/useUserData';

const AddComment = ({ answerId, addComment }) => {

	const userData = useUserData();
	const handleNotification = useNotificationContext();

	const validate = values => {
		const errors = {};
		if (!values.comment) {
			errors.comment = 'Required';
		} else if (values.comment.length < 6) {
			errors.comment = 'Must be 6 characters or more'
		} else if (values.comment.length > 200) {
			errors.comment = 'Must be 200 characters or less'
		}
		return errors;
	};
	return (
		<>
			<h2 className='font-bold text-2xl  mb-2'>Add comment</h2>
			<Formik
				initialValues={{
					comment: '',
				}}
				validate={validate}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					const newComment = {
						body: values.comment.trim(),
						owner: userData._id,
						answer: answerId,
					}

					handleNotification('info', 'Answer send!');
					postComment(newComment)
						.then(x => {
							handleNotification('success', 'Comment successful!');
							addComment(x.result);
						})
						.catch(err => {
							handleNotification('error', err[0]?.message || 'Something went wrong');
						})
						.finally(() => {
							resetForm();
							setSubmitting(false);
						});
				}}
			>
				{formik => (
					<>
						<form onSubmit={formik.handleSubmit} className='form-control'>
							<div>
								<FormTextarea
									label="Comment"
									id="comment"
									name="comment"
									type="text"
									placeholder="Your comment goes here..." />
							</div>
							<div>
								<button
									disabled={formik.isSubmitting}
									type="submit"
									className='btn btn-accent mt-6 w-full'
								>
									Submit
								</button>
							</div>
						</form>
					</>
				)}
			</Formik >
		</>
	)
}

export default AddComment