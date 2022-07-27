import React from 'react';
import { useField } from 'formik';

const FormSelect = ({ label, children, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<>
			<label htmlFor={props.id || props.name} className="label" >{label}</label>
			<select
				className={`select select-bordered w-full ${meta.touched && meta.error ? "border-error" : null}`}
				{...field}
				{...props}
			>
				{children}
			</select>
			{meta.touched && meta.error ? (
				<div className="bg-base-200 py-1 px-2 rounded-lg text-sm absolute max-w-sm">{meta.error}</div>
			) : null}
		</>
	);
}

export default FormSelect;