import { useCallback, useEffect, useState } from 'react';
import Modal from '../common/Modal';
import circles from '../../data/circles.json';
import { toTitleCase } from '../../utils/stringUtils';
import useUserDataContext from '../hooks/useUserDataContext';
import { postQuestion } from '../../services/data.service';
import FormInput from '../forms/FormInput';

const AddQuestionModal = () => {
	const [openModal, SetOpenModal] = useState(false);
	const [errors, setErrors] = useState({});
	const [circle, setCircle] = useState({ value: 'select' });
	const userData = useUserDataContext();

	useEffect(() => {
		setErrors({})
		setCircle({ value: 'select' })
	}, [openModal])

	const handleModal = () => {
		SetOpenModal(!openModal);
	}

	const onChangeCircle = (e) => {
		setCircle({
			value: e.target.value,
			title: e.target[e.target.selectedIndex].getAttribute('data-title'),
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const body = formData.get('body').trim();

		// Prevent request if errors are not cleared
		if (errors.body) {
			return setErrors(() => ({ ...errors }))
		}

		const data = {
			body: body,
			circle: circle.value,
			owner: userData._id,
			meta: {
				circle: circle.title
			},
		}

		postQuestion(data)
			.then(x => {
				// Show success notification
			})
			.then(x => {
				SetOpenModal(!openModal)
			})
			.catch(err => {
				// Show notification
				console.log(err);
			})

	}

	const verifyQuestion = (e) => {
		const pattern = /^[A-Za-z0-9\s!?.,-]+$/
		const body = e.target.value.trim();
		if (body.length < 6) {
			setErrors({
				...errors,
				body: 'Minimum length is 6 characters'
			})
		} else if (body.length > 50) {
			setErrors({
				...errors,
				body: 'Maximum length is 50 characters'
			})
		} else if (!pattern.test(body)) {
			setErrors({
				...errors,
				body: 'Only letters and punctuation are allowed in questions'
			})
		} else {
			setErrors({
				...errors,
				body: '',
			})
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
					<select class="select select-bordered w-full" name="circle" onChange={onChangeCircle} value={circle.value}>
						<option disabled value="select">Select circle</option>
						{circles.map(x => <option key={x._id} value={x._id} data-title={x.title} >{toTitleCase(x.title)}</option>)}
					</select>
				</Modal>
			}
		</>
	)
}

export default AddQuestionModal