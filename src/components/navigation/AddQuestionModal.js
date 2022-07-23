import { useCallback, useEffect, useState } from 'react';
import Modal from '../common/Modal';
import circles from '../../data/circles.json';
import { toTitleCase } from '../../utils/stringUtils';
import useUserDataContext from '../hooks/useUserDataContext';
import { postQuestion } from '../../services/data.service';
import FormInput from '../forms/OldInput';
import useNotificationContext from '../hooks/useNotificationContext';
import FormSelect from '../forms/OldSelect';

const AddQuestionModal = () => {
	const [openModal, SetOpenModal] = useState(false);
	const [errors, setErrors] = useState('');
	const [body, setBody] = useState('');
	const [circle, setCircle] = useState({ value: 'select' });

	const userData = useUserDataContext();

	const handleNotification = useNotificationContext()

	const handleModal = () => {
		SetOpenModal(!openModal);
	}

	const onChangeBody = (e) => {
		const v = e.target.value;
		isInvalidQuesion(v);
		setBody(v);
	}

	const onChangeCircle = (e) => {
		setCircle({
			value: e.target.value,
			title: e.target[e.target.selectedIndex].getAttribute('data-title'),
		});
	}

	const clearErrors = useCallback(() => {
		setTimeout(() => {
			setErrors('')
		}, 3000)
	}, [])

	useEffect(() => {
		setBody('')
		setCircle({ value: 'select' })
	}, [openModal])

	useEffect(() => {
		if (errors) {
			clearErrors()
		}
		return () => {
			clearErrors()
		}
	}, [errors, clearErrors])

	const handleSubmit = async (e) => {
		e.preventDefault();

		const bodyErrors = isInvalidQuesion(body)
		if (bodyErrors) {
			return setErrors({ ...errors, body: bodyErrors })
		}

		if (circle.value === 'select' || circle.title === undefined) {
			return setErrors(() => ({ ...errors, circle: 'Please select a circle' }))
		}

		const data = {
			body: body.trim(),
			circle: circle.value,
			owner: userData._id,
			meta: {
				circle: circle.title
			},
		}

		postQuestion(data)
			.then(x => {
				handleNotification('success', 'Success! Thank you for contributing!')
			})
			.then(x => {
				SetOpenModal(!openModal)
			})
			.catch(err => {
				// Change it to something more relevant
				handleNotification('error', err?.errors[0]?.message || 'Error connecting to server!')
			})
	}

	const isInvalidQuesion = (value = '') => {
		const pattern = /^[A-Za-z0-9\s!?.,-]+$/
		const v = value.trim();

		if (v === '') return 'Question cannot be empty';
		if (v.length < 6) return 'Minimum length is 6 characters'
		if (v.length > 50) return 'Maximum length is 50 characters'
		if (!pattern.test(v)) return 'Only letters and punctuation are allowed in questions'
		return false;
	}

	return (
		<>
			<button onClick={() => handleModal()} className="btn btn-secondary modal-button">Ask question</button>
			{
				openModal && <Modal handleModal={handleModal} handleSubmit={handleSubmit} contents={{ title: 'Add question', button: 'Submit' }} >
					<div className='my-4 '>

						<FormInput
							name="body"
							error={errors.body}
							onChange={onChangeBody}
							value={body}
							placeholder="Ask the community"
						/>

					</div>
					<FormSelect
						name="circle"
						errors={errors}
						onChange={onChangeCircle}
						value={circle.value}
					>
						<option disabled value="select">Select circle</option>
						{circles.map(x => <option key={x._id} value={x._id} data-title={x.title} >{toTitleCase(x.title)}</option>)}
					</FormSelect>
				</Modal>
			}
		</>
	)
}

export default AddQuestionModal