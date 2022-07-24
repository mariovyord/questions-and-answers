import { useEffect, useState } from 'react';

const OldSelect = ({ name, verify, errors, value, onChange, children }) => {
	const [showError, setShowError] = useState('');

	useEffect(() => {
		if (errors[name]) {
			setShowError(errors[name])
		} else {
			setShowError('');
		}
		const hideError = setTimeout(() => {
			setShowError('');
		}, 3000)

		return () => clearTimeout(hideError);

	}, [name, errors])

	return (
		<>
			<select
				className="select select-bordered w-full"
				name={name}
				onChange={onChange}
				value={value}
			>
				{children}
			</select>

			{showError
				? <div className="alert alert-warning shadow-lg float-left absolute w-fit" >
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
						<span className='text-sm'>{showError}</span>
					</div>
				</div>
				: null
			}
		</>
	)
}

export default OldSelect;