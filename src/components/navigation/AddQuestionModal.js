import { useCallback, useEffect, useState } from 'react';
import Modal from '../common/Modal';
import circles from '../../data/circles.json';
import { toTitleCase } from '../../utils/stringUtils';
import useUserDataContext from '../hooks/useUserDataContext';
import { postQuestion } from '../../services/data.service';
import FormInput from '../forms/input/FormInput';

const AddQuestionModal = () => {
	const [openModal, SetOpenModal] = useState(false);
	const [errors, setErrors] = useState({});
	const userData = useUserDataContext();

	const handleModal = () => {
		SetOpenModal(!openModal);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const question = formData.get('body');
		const circle = formData.get('circle');
		const owner = userData._id;
		const meta = {
			circle: 'history'
		}

		const data = {
			body: question,
			circle,
			owner,
			meta,
		}

		console.log(data)
		postQuestion(data)
			.then(x => {
				// Show success 
			})
			.then(x => {
				SetOpenModal(!openModal)
			})
			.catch(err => {
				console.log(err);
			})

	}

	const clearErrors = useCallback(() => {
		setTimeout(() => {
			setErrors({});
		}, 3000)
	}, [])

	const verifyQuestion = (e) => {
		const body = e.target.value;
		if (body.length < 6) {
			setErrors({
				...errors,
				body: 'Minimum length is 6 characters'
			})
			clearErrors()
		} else if (body.length > 50) {
			setErrors({
				...errors,
				body: 'Maximum length is 50 characters'
			})
			clearErrors()
		}
	}

	return (
		<>
			<button onClick={() => handleModal()} className="btn btn-secondary modal-button">Ask question</button>
			{
				openModal && <Modal handleModal={handleModal} handleSubmit={handleSubmit} contents={{ title: 'Add question', button: 'Submit' }} >
					<div className='my-4 '>
						<FormInput name="body" verify={verifyQuestion} errors={errors} />
					</div>
					<select class="select select-bordered w-full" name="circle">
						<option disabled selected>Select circle</option>
						{circles.map(x => <option key={x._id} value={x._id}>{toTitleCase(x.title)}</option>)}
					</select>
				</Modal>
			}
		</>
	)
}

export default AddQuestionModal