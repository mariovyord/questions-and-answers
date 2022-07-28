import React from 'react';

const UploadImageForm = () => {
	return (
		<form className='py-2'>
			<input type="file" />
			<button type='submit' className='btn btn-accent'>Upload</button>
		</form>
	)
}

export default UploadImageForm;