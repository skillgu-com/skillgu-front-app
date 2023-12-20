// Libraries
import React, {useEffect, useState, ChangeEvent} from 'react';
import classNames from 'classnames';
// Helpers
import validation from '../../helpers/improovedValidation';
// Styles
import styles from './Input.module.scss';

interface InputProps {
	id: string;
	type?: string;
	name: string;
	label: string;
	as?: 'input' | 'textarea';
	required?: boolean;
	value: string;
	errorMessage?: string;
	placeholder?: string;
	isValid?: boolean;
	valueChangeHandler: (name: string, value: any) => void;
	classes?: string;
}

export const defaultInput = {
	value: '',
	errorMessage: '',
	isValid: undefined,
};

const Input = (props: InputProps) => {
	const {
		id,
		type = 'text',
		name,
		label,
		as = 'input',
		required = false,
		value,
		placeholder,
		errorMessage,
		isValid,
		valueChangeHandler,
		classes,
	} = props;
	const Tag = as;

	const [touched, setTouched] = useState(false);

	const changeHandler = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const errorMessage = validation(touched, e.target.value, name, required);
		valueChangeHandler(name, {
			value: e.target.value,
			errorMessage,
			isValid: errorMessage === '' && touched,
		});
	};

	useEffect(() => {
		if (!touched) return;
		const errorMessage = validation(touched, value, name, required);

		valueChangeHandler(name, {
			value,
			errorMessage,
			isValid: errorMessage === '',
		});
	}, [touched]);

	return (
		<div
			className={classNames(styles.input, classes)}
			data-status={!!errorMessage ? 'error' : isValid ? 'success' : ''}>
			<label className={styles.inputLabel}>
				<span className={styles.inputLabelText}>
					{label}
					{required && ' *'}
				</span>
				<Tag
					id={id}
					name={name}
					className={styles.inputField}
					type={as === 'textarea' ? undefined : type}
					onChange={changeHandler}
					value={value}
					required={required}
					placeholder={placeholder}
					autoComplete='true'
					onBlur={() => setTouched(true)}
				/>
			</label>
			{/* <span className={styles.inputError}>{errorMessage}</span> */}
		</div>
	);
};

export default Input;
