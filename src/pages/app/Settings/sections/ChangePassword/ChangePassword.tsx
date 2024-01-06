// Libraries
import React, {useState} from 'react';
import classNames from 'classnames';
// Components
import Button from '../../../../../new-components/Button/Button';
import { Title, Text } from 'src/new-components/typography';
import Input from 'src/new-components/Input/Input';
import PasswordValidator from 'src/new-components/PasswordValidator/PasswordValidator';
// Helpers
import { defaultInput } from 'src/new-components/Input/Input';
// Types
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
// Styles
import styles from '../../Settings.module.scss'

const ChangePassword = () => {
  const [passwordForm, setPasswordForm] = useState({
		password: defaultInput,
	});

	const upadatePasswordFormHandler = (name: string, value: any) => {
		setPasswordForm({...passwordForm, [name]: value});
	};

  return (
    <section className={styles.section}>
    <Title
      tag={TitleTag.h2}
      classes={styles.title}
      variant={TitleVariant.standard}>
      Zmień hasło
    </Title>
    <Text classes={styles.text}>
      Po zatwierdzeniu zmian zostaniesz wylogowany z serwisu.
    </Text>
    <form className={styles.form}>
      <Input
        classes={classNames(styles.input, styles.password)}
        id='password'
        name='password'
        type='password'
        value={passwordForm.password.value}
        errorMessage={passwordForm.password.errorMessage}
        isValid={passwordForm.password.isValid}
        valueChangeHandler={upadatePasswordFormHandler}
        label='Nowe hasło'
        required
      />
      <PasswordValidator password={passwordForm.password.value} />
      <div className={styles.formSubmit}>
        <Button type='submit' disableButton={!!!passwordForm.password.isValid}>
          Zapisz zmiany
        </Button>
      </div>
    </form>
  </section>
  )
}

export default ChangePassword