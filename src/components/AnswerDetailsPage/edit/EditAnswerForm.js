import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import useNotificationContext from '../../../hooks/useNotificationContext';
import { editAnswer } from '../../../services/data.service';

const EditAnswerForm = ({ answerId, question, handleChange, values, handleSetNewBody }) => {
	const [answerErrors, setAnswerErrors] = useState('')
	const [isSubmitting, setSubmitting] = useState(false);
	const [textValue, setTextValue] = useState("");

	const handleNotification = useNotificationContext();

	useEffect(() => {
		if (values) {
			setTextValue(values);
		}
	}, [values]);

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
		}

		setSubmitting(true);
		handleNotification('info', 'Answer update send!');
		editAnswer(answerId, newAnswer)
			.then(x => {
				handleNotification('success', 'Answer update successful!');
				handleSetNewBody(x.result.body)
				handleChange();
			})
			.catch(err => {
				handleNotification('error', err[0]?.message || 'Something went wrong');
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

export default EditAnswerForm;