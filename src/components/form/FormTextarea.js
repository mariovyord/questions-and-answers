import { useField } from 'formik';

const FormTextarea = ({ label, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<>
			<textarea
				className={`textarea textarea-bordered resize-none w-full p-4 ${meta.touched && meta.error ? "border-error" : null}`}
				{...field}
				{...props}
			>
			</textarea>
			{meta.touched && meta.error ? (
				<div className="bg-base-200 py-1 px-2 rounded-lg text-sm absolute max-w-sm">{meta.error}</div>
			) : null}
		</>
	);
}

export default FormTextarea;