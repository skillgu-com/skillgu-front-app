// Libraries
import React from 'react';
import classNames from 'classnames';
// Helpers
import validation from '../helpers/improovedValidation';

const Checkbox = (props) => {
	const {
		id,
		name,
		label,
		type = 'checkbox',
		required = false,
		value,
		errorMessage,
		valueChangeHandler,
		classes,
	} = props;

	const changeHandler = (e) => {
		const errorMessage = validation(true, e.target.checked, name, required);
		valueChangeHandler(name, {
			value: e.target.checked,
			errorMessage,
			isValid: errorMessage === '',
		});
	};

	return (
		<label
			className={classNames('checkbox', classes)}
			data-is-error={!!errorMessage}>
			<input
				id={id}
				name={name}
				className='checkbox__field'
				type={type}
				onChange={changeHandler}
				checked={value}
				required={required}
			/>
			<span className='checkbox__label'>
				{label}
				{required && ' *'}
			</span>
		</label>
	);
};

export default Checkbox;
