import React from 'react';
import { Formik } from 'formik';
import FormTextarea from '../../forms/FormTextarea';

const AddComment = () => {
	return (
		<>
			<h2 className='font-bold text-2xl'>Add comment</h2>
			<Formik
				initialValues={{
					text: '',
				}}
				validate={() => console.log('validate')}
				onSubmit={(values, { setSubmitting }) => {
					console.log(values);
				}}
			>
				{formik => (
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
				)}
			</Formik >
		</>
	)
}

export default AddComment