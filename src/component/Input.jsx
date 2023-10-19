// Libraries
import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
// Helpers
import validation from '../helpers/improovedValidation';
import { min } from 'lodash';

const Input = (props) => {
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
		step = undefined,
		min = undefined
	} = props;
	const Tag = as;

	const [touched, setTouched] = useState(false);

	const changeHandler = (e) => {
		const errorMessage = validation(touched, e.target.value, name, required);
		valueChangeHandler(name, {
			value: e.target.value,
			errorMessage,
			isValid: errorMessage === '' && touched,
		});
	};

	useEffect(() => {
		const errorMessage = validation(touched, value, name, required);

		valueChangeHandler(name, {
			value,
			errorMessage,
			isValid: errorMessage === '',
		});
	}, [touched]);

	return (
		<div
			className={classNames('input', classes)}
			data-status={!!errorMessage ? 'error' : isValid ? 'success' : ''}>
			<label className='input__label'>
				<span className='input__label-text'>
					{label}
					{required && ' *'}
				</span>
				<Tag
					id={id}
					name={name}
					className='input__field'
					type={as === 'textarea' ? undefined : type}
					onChange={changeHandler}
					value={value}
					required={required}
					placeholder={placeholder}
					autoComplete='true'
					onBlur={() => setTouched(true)}
					step={step}
					min={min}
				/>
			</label>
			<span className='input__error'>{errorMessage}</span>
		</div>
	);
};

export default Input;
