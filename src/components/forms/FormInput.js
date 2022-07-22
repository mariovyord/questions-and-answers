import { useEffect, useState } from 'react';

const FormInput = ({ name, verify, errors }) => {
	const [showError, setShowError] = useState('');
	const [inputValue, setInputValue] = useState();

	const onChange = (e) => {
		setInputValue(e.target.value);
	}

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
			<input onChange={onChange} value={inputValue} onBlur={verify} type="text" name={name} className={`input input-bordered w-full ${showError ? 'input-error' : ''}`} />

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

export default FormInput;