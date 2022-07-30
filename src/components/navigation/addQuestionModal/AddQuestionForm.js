import React, { useState } from 'react';
import useNotificationContext from '../../../hooks/useNotificationContext';
import useUserData from '../../../hooks/useUserData';

import * as dataService from '../../../services/data.service';

import { Field, Formik } from 'formik';
import FormInput from '../../form/FormInput';
import FormSelect from '../../form/FormSelect';

import { toTitleCase } from '../../../utils/stringUtils';
import circles from '../../../data/circles/circles.json';


const AddQuestionForm = ({ handleModal }) => {
	const handleNotification = useNotificationContext();
	const userData = useUserData();
	const [userCircles, setUserCircles] = useState(null);

	const handleNotifications = useNotificationContext();

	const handleLoadUserCircles = () => {
		dataService.getUserCircles()
			.then(x => {
				setUserCircles(x.result)
			})
			.catch(err => {
				handleNotifications('error', 'Error fetching data from server')
			})
	}

	const validate = values => {
		const errors = {};
		const pattern = /^[A-Za-z0-9\s!?.,-]+$/

		// Question
		if (!values.question) {
			errors.question = 'Required';
		} else if (values.question.length < 6) {
			errors.question = 'Minimum length is 6 characters'
		} else if (values.question.length > 50) {
			errors.question = 'Maximum length is 50 characters'
		} else if (!pattern.test(values.question)) {
			errors.question = 'Special characters are not permitted'
		}
		// Circle
		if (!values.circle) {
			errors.circle = 'Required';
		}

		return errors;
	};

	return (
		<Formik
			initialValues={{
				question: '',
				circle: '',
				toggle: false,
			}}
			validate={validate}
			onSubmit={(values, { setSubmitting }) => {
				const [circlId, circleTitle] = values.circle.split('=');
				const data = {
					body: values.question.trim(),
					circle: circlId,
					owner: userData._id,
					meta: {
						circle: circleTitle
					},
				}

				handleNotification('info', 'Form send!')

				dataService.postQuestion(data)
					.then(x => {
						handleNotification('success', 'Success! Thank you for contributing!')
					})
					.then(x => {
						handleModal();
					})
					.catch(err => {
						handleNotification('error', err[0]?.message || 'Something went wrong')
					})
					.finally(() => {
						setSubmitting(false);
					});
			}}
		>
			{formik => (
				<form onSubmit={formik.handleSubmit} className='form-control'>
					<div>
						<FormInput
							label="Add question"
							id="question"
							name="question"
							type="text"
							placeholder="Here goes your question..."
						/>
					</div>
					<div>
						<FormSelect
							label="Select circle"
							id="circle"
							name="circle"
							type="text"
						>
							<option value='' disabled >Circles...</option>

							{userCircles && formik.values.toggle === true
								? userCircles.map(x => <option
									key={x._id}
									value={`${x._id}=${x.title}`}
								>
									{toTitleCase(x.title)}
								</option>)
								: circles.map(x => <option
									key={x._id}
									value={`${x._id}=${x.title}`}
								>
									{toTitleCase(x.title)}
								</option>)}


						</FormSelect>
					</div>
					<div className="form-control">
						<label className="label cursor-pointer">
							<span className="label-text">Select from user circles?</span>
							<label>
								<Field
									className="checkbox"
									type="checkbox"
									name="toggle"
									onChange={() => {
										formik.setFieldValue("toggle", !formik.values.toggle)
										formik.values.toggle === false && handleLoadUserCircles()
									}}
								/>
							</label>
						</label>
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

export default AddQuestionForm;