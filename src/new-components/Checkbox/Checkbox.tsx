// Libraries
import React, {ChangeEvent} from 'react';
import classNames from 'classnames';
// Helpers
import validation from '../../helpers/improovedValidation';
// Styles
import styles from './Checkbox.module.scss';

interface CheckboxProps {
	id: string;
	name: string;
	label: React.ReactNode;
	type?: 'checkbox' | 'radio';
	required?: boolean;
	value: boolean;
	errorMessage?: string;
	isValid?: boolean;
	valueChangeHandler: (name: string, value: any) => void;
	classes?: string;
}

const Checkbox = (props: CheckboxProps) => {
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

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validation(true, e.target.checked, name, required);
		valueChangeHandler(name, {
			value: e.target.checked,
			errorMessage,
			isValid: errorMessage === '',
		});
	};

	return (
		<label
			className={classNames(styles.checkbox, classes)}
			data-is-error={!!errorMessage}
			data-is-radio={type === 'radio'}>
			<input
				id={id}
				name={name}
				className={styles.checkboxField}
				type={type}
				onChange={changeHandler}
				checked={value}
				required={required}
			/>
			<span className={styles.checkboxLabel}>
				{label}
				{required && ' *'}
			</span>
		</label>
	);
};

export default Checkbox;
