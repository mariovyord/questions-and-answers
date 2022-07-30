import useNotificationContext from '../../../hooks/useNotificationContext';
import useUserData from '../../../hooks/useUserData';

import { Formik } from 'formik';
import FormInput from '../../form/FormInput';
import * as dataService from '../../../services/data.service';
import { useNavigate } from 'react-router-dom';

const CreateCircleForm = ({ handleModal, defaultVals, handleNewData }) => {
	const handleNotification = useNotificationContext();
	const userData = useUserData();
	const navigate = useNavigate();

	const validate = values => {
		const errors = {};
		const pattern = /^[A-Za-z0-9\s!?.,-]+$/

		// Title
		if (!values.title) {
			errors.title = 'Required';
		} else if (values.title.length < 3) {
			errors.title = 'Minimum length is 3 characters'
		} else if (values.title.length > 50) {
			errors.title = 'Maximum length is 50 characters'
		} else if (!pattern.test(values.title)) {
			errors.title = 'Special characters are not permitted'
		}

		// Description
		if (!values.description) {
			errors.description = 'Required';
		} else if (values.description.length < 6) {
			errors.description = 'Minimum length is 6 characters'
		} else if (values.description.length > 50) {
			errors.description = 'Maximum length is 50 characters'
		} else if (!pattern.test(values.description)) {
			errors.description = 'Special characters are not permitted'
		}

		// Image Url
		if (!values.imageUrl) {
			errors.imageUrl = 'Required';
		}

		return errors;
	};

	return (
		<Formik
			initialValues={{
				title: defaultVals?.title || '',
				description: defaultVals?.description || '',
				imageUrl: defaultVals?.imageUrl || '',
			}}
			validate={validate}
			onSubmit={(values, { setSubmitting }) => {
				const data = {
					title: values.title.trim().toLowerCase(),
					description: values.description.trim(),
					imageUrl: values.imageUrl.trim(),
					owner: userData._id,
				}

				handleNotification('info', 'Form send!')

				// PUT request if there are default values; POST if there are not
				if (defaultVals) {
					dataService.editCircle(defaultVals._id, data)
						.then(x => {
							handleNotification('success', 'Success! Thank you for contributing!')
							handleModal();
							handleNewData(x.result)
						})
						.catch(err => {
							handleNotification('error', err[0]?.message || 'Something went wrong')
						})
						.finally(() => {
							setSubmitting(false);
						});
				} else {
					dataService.createCircle(data)
						.then(x => {
							handleNotification('success', 'Success! Thank you for contributing!')
							handleModal();
							navigate(`/circles/${x.result._id}`);
						})
						.catch(err => {
							handleNotification('error', err[0]?.message || 'Something went wrong')
						})
						.finally(() => {
							setSubmitting(false);
						});
				}
			}}
		>
			{formik => (
				<form onSubmit={formik.handleSubmit} className='form-control'>
					<div>
						<FormInput
							label="Circle title"
							id="title"
							name="title"
							type="text"
							placeholder="Make it short and clear."
						/>
					</div>
					<div>
						<FormInput
							label="Description"
							id="description"
							name="description"
							type="text"
							placeholder="Present it in few words."
						/>
					</div>
					<div>
						<FormInput
							label="Image URL"
							id="imageUrl"
							name="imageUrl"
							type="text"
							placeholder="Find a cool picture and place the URL here."
						/>
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
	);
}

export default CreateCircleForm;