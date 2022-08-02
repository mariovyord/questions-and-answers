import { Formik } from 'formik';
import useNotificationContext from '../../../hooks/useNotificationContext';
import { uploadPicture } from '../../../services/data.service';

const UploadImageForm = ({ userId, handleSetProfile }) => {
	const handleNotification = useNotificationContext();

	const validate = values => {
		const errors = {};

		return errors;
	};

	const handleSubmit = (values, { setSubmitting }) => {
		// Convert to base64 and upload
		const file = values.file;

		if (file.size > 300000) return handleNotification('warning', 'Maximum image size is 300 kb!');

		const reader = new FileReader();
		reader.onloadend = () => {
			handleNotification('info', 'Loading...')
			uploadPicture(userId, reader.result)
				.then(x => {
					handleNotification('success', 'Image uploaded!')
					handleSetProfile({ imageUrl: x.result.imageUrl })
				})
				.catch(err => {
					handleNotification('error', 'Upload failed!')
				})
				.finally(() => {
					setSubmitting(false);
				})
		}
		reader.readAsDataURL(file);
	}

	return (
		<Formik
			initialValues={{
				file: '',
			}}
			validate={validate}
			onSubmit={handleSubmit}
		>
			{formik => (
				<form onSubmit={formik.handleSubmit} className='form-control'>
					<div className='overflow-hidden'>
						<input
							id="file"
							name="file"
							type="file"
							onChange={(event) => {
								formik.setFieldValue("file", event.currentTarget.files[0]);
							}} />
					</div>
					<div>
						<button
							disabled={formik.isSubmitting}
							type="submit"
							className='btn btn-accent mt-6 w-full'
						>
							Upload
						</button>
					</div>
				</form>
			)}
		</Formik >
	);
}

export default UploadImageForm;