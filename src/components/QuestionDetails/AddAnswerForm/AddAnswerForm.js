import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import useUserData from '../../../hooks/useUserData';
import useNotificationContext from '../../../hooks/useNotificationContext';

import { postAnswer } from '../../../services/data.service';

const AddAnswerForm = ({ question, addAnswers, showTextarea }) => {
	const [answerErrors, setAnswerErrors] = useState('')
	const [isSubmitting, setSubmitting] = useState(false);
	const [textValue, setTextValue] = useState("");
	const userData = useUserData();
	const handleNotification = useNotificationContext();
	const handleOnClear = (e) => {
		e?.preventDefault();
		setTextValue('');
	}

	const isValidAnswer = (v) => {
		if (v.length < 30) {
			setAnswerErrors('Must be 30 characters or more')
			return false;
		} else if (v.length > 1500) {
			setAnswerErrors('Must be 1500 characters or less')
			return false;
		}
		setAnswerErrors('')
		return true;
	}

	const handleSubmit = (textValue) => {
		const isValid = isValidAnswer(textValue.trim());
		if (isValid === false) return undefined;
		if (isSubmitting === true) return undefined;

		const newAnswer = {
			body: textValue.trim(),
			owner: userData._id,
			question: question._id,
			circle: question.circle,
			meta: {
				question: question.body,
				circle: question.meta.circle,
			}
		}

		setSubmitting(true);
		handleNotification('info', 'Answer send!');
		postAnswer(newAnswer)
			.then(x => {
				addAnswers(x.result);
				handleNotification('success', 'Answer successful!');
				handleOnClear();
				showTextarea();
			})
			.catch(err => {
				handleNotification('error', err[0].message || 'Something went wrong');
			})
			.finally(() => {
				setSubmitting(false);
			});
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(textValue)
			}}
		>
			<div className="container" data-theme="cmyk">

				<MDEditor
					value={textValue}
					onChange={setTextValue}
					preview={'edit'}
					autoFocus={true}
					previewOptions={{
						rehypePlugins: [[rehypeSanitize]],
					}}
				/>
				{answerErrors && <div className="bg-base-200 py-1 px-2 rounded-lg text-sm absolute max-w-sm">{answerErrors}</div>}
			</div>

			<div className='flex justify-end gap-4 my-2'>
				<button className='btn' onClick={handleOnClear}>Clear</button>
				<button className='btn btn-primary' disabled={isSubmitting}>Submit</button>
			</div>
		</form>
	)
}

export default AddAnswerForm