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
				<div className="alert alert-warning h-5 rounded-lg text-sm absolute max-w-sm">{meta.error}</div>
			) : null}
		</>
	);
};
export default FormInput