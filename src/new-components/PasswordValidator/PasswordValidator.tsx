// Libraries
import React from 'react';
// Icons
import ErrorSign from '../../assets/icons/ErrorSign';
import SuccessSign from '../../assets/icons/SuccessSign';
// Styles
import styles from './PasswordValidator.module.scss';

interface PasswordValidatorProps {
	isLong: boolean;
	hasNum: boolean;
	hasBigSign: boolean;
}

const PasswordValidator = (props: PasswordValidatorProps) => {
	const {isLong, hasNum, hasBigSign} = props;

	return (
		<ul className={styles.list}>
			<li className={styles.listItem} data-is-valid={isLong}>
				{isLong ? <SuccessSign /> : <ErrorSign />}Hasło musi mieć co najmniej 8
				znaków
			</li>
			<li className={styles.listItem} data-is-valid={hasNum}>
				{hasNum ? <SuccessSign /> : <ErrorSign />}Hasło musi mieć w sobie liczbę
			</li>
			<li className={styles.listItem} data-is-valid={hasBigSign}>
				{hasBigSign ? <SuccessSign /> : <ErrorSign />}Hasło musi mieć jedną dużą
				literę
			</li>
		</ul>
	);
};

export default PasswordValidator;
