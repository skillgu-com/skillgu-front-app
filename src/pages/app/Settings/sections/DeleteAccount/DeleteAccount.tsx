// Libraries
import React, {useState, useMemo} from 'react';
import classNames from 'classnames';
// Components
import Button, {ButtonVariant} from '../../../../../new-components/Button/Button';
import { Title, Text } from 'src/new-components/typography';
import Input from 'src/new-components/Input/Input';
// Helpers
import { generateRandomText } from 'src/helpers/generateRandomText';
import { defaultInput } from 'src/new-components/Input/Input';
// Types
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
// Styles
import styles from '../../Settings.module.scss'

const DeleteAccount = () => {
  const [removeAccountForm, setRemoveAccountForm] = useState({
		removeAccount: defaultInput,
	});

  const upadateRemoveAccountFormHandler = (name: string, value: any) => {
		setRemoveAccountForm({...removeAccountForm, [name]: value});
	};

	const textToDeleteAccount = useMemo(() => generateRandomText(20), [])

	return (
		<section className={styles.section}>
			<Title
				tag={TitleTag.h2}
				classes={styles.title}
				variant={TitleVariant.standard}>
				Usuń konto
			</Title>
			<Text classes={styles.text}>Konto zostanie trwale usunięte!</Text>
			<form className={styles.form}>
				<Input
					classes={classNames(styles.input, styles.inputDelete)}
					id='removeAccount'
					name='removeAccount'
					type='removeAccount'
					value={removeAccountForm.removeAccount.value}
					errorMessage={removeAccountForm.removeAccount.errorMessage}
					isValid={removeAccountForm.removeAccount.isValid}
					valueChangeHandler={upadateRemoveAccountFormHandler}
					label={`Aby usunąć konto wpisz: ${textToDeleteAccount}`}
				/>
				<div className={styles.formSubmit}>
					<Button
						type='submit'
						variant={ButtonVariant.Danger}
						disableButton={
							removeAccountForm.removeAccount.value !== textToDeleteAccount
						}>
						Usuń konto
					</Button>
				</div>
			</form>
		</section>
	);
};

export default DeleteAccount;
