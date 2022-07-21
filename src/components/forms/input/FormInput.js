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
		setTimeout(() => {
			setShowError('');
		}, 3000)
	}, [name, errors])

	return (
		<>
			<input onChange={onChange} value={inputValue} onBlur={verify} type="text" name={name} className={`input input-bordered w-full ${showError ? 'input-error' : ''}`} />

			{showError
				? <div className="alert alert-warning shadow-lg float-left absolute w-fit" >
					<div>
						<span className='text-sm'>{showError}</span>
					</div>
				</div>
				: null
			}
		</>
	)
}

export default FormInput;