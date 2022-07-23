import { useField } from 'formik';

const FormInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<>
			<label htmlFor={props.id || props.name} className="label" >{label}</label>
			<input
				className={`input input-bordered w-full ${meta.touched && meta.error ? "border-error" : null}`}
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<div className="bg-base-200 py-1 px-2 rounded-lg text-sm absolute max-w-sm">{meta.error}</div>
			) : null}
		</>
	);
};
export default FormInput