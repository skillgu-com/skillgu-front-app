// Libraries
import React, {useState} from 'react';
import classNames from 'classnames';
// Components
import Button from '../../../../../new-components/Button/Button';
import { Title, Text } from 'src/new-components/typography';
import Input from 'src/new-components/Input/Input';
import Checkbox from 'src/new-components/Checkbox/Checkbox';
// Helpers
import { defaultInput } from 'src/new-components/Input/Input';
// Types
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
// Styles
import styles from '../../Settings.module.scss'

const YourData = () => {
  const [form, setForm] = useState({
		firstName: defaultInput,
		lastName: defaultInput,
		phone: defaultInput,
		position: defaultInput,
		location: defaultInput,
		linkedin: defaultInput,
		instagram: defaultInput,
		facebook: defaultInput,
		x: defaultInput,
		www: defaultInput,
		description: defaultInput,
		highlited: {...defaultInput, value: false},
		hidden: {...defaultInput, value: false},
	});

  const upadateFormHandler = (name: string, value: any) => {
		setForm({...form, [name]: value});
	};
  return (
    <section className={styles.section}>
    <Title
      tag={TitleTag.h2}
      classes={styles.title}
      variant={TitleVariant.standard}>
      Twoje dane
    </Title>
    <Text classes={styles.text}>Zmień dane swojego profilu.</Text>
    <form className={styles.form}>
      <Input
        classes={styles.input}
        id='firstName'
        name='firstName'
        type='text'
        value={form.firstName.value}
        errorMessage={form.firstName.errorMessage}
        isValid={form.firstName.isValid}
        valueChangeHandler={upadateFormHandler}
        label='Imię'
      />
      <Input
        classes={styles.input}
        id='lastName'
        name='lastName'
        type='text'
        value={form.lastName.value}
        errorMessage={form.lastName.errorMessage}
        isValid={form.lastName.isValid}
        valueChangeHandler={upadateFormHandler}
        label='Nazwisko'
      />
      <Input
        classes={styles.input}
        id='phone'
        name='phone'
        type='phone'
        value={form.phone.value}
        errorMessage={form.phone.errorMessage}
        isValid={form.phone.isValid}
        valueChangeHandler={upadateFormHandler}
        label='Numer telefonu'
      />
      <Input
        classes={styles.input}
        id='position'
        name='position'
        type='text'
        value={form.position.value}
        errorMessage={form.position.errorMessage}
        isValid={form.position.isValid}
        valueChangeHandler={upadateFormHandler}
        label='Stanowisko'
      />
      <Input
        classes={styles.input}
        id='location'
        name='location'
        type='text'
        value={form.location.value}
        errorMessage={form.location.errorMessage}
        isValid={form.location.isValid}
        valueChangeHandler={upadateFormHandler}
        label='Loklizacja'
      />
      <Input
        classes={classNames(styles.input, styles.textarea)}
        id='description'
        name='description'
        as='textarea'
        value={form.description.value}
        errorMessage={form.description.errorMessage}
        isValid={form.description.isValid}
        valueChangeHandler={upadateFormHandler}
        label='Opis'
      />
      <Input
        classes={styles.input}
        id='linkedin'
        name='linkedin'
        type='text'
        value={form.linkedin.value}
        errorMessage={form.linkedin.errorMessage}
        isValid={form.linkedin.isValid}
        valueChangeHandler={upadateFormHandler}
        label='Linked In'
      />
      <Input
        classes={styles.input}
        id='facebook'
        name='facebook'
        type='text'
        value={form.facebook.value}
        errorMessage={form.facebook.errorMessage}
        isValid={form.facebook.isValid}
        valueChangeHandler={upadateFormHandler}
        label='Facebook'
      />
      <Input
        classes={styles.input}
        id='x'
        name='x'
        type='text'
        value={form.x.value}
        errorMessage={form.x.errorMessage}
        isValid={form.x.isValid}
        valueChangeHandler={upadateFormHandler}
        label='X'
      />
      <Input
        classes={styles.input}
        id='instagram'
        name='instagram'
        type='text'
        value={form.instagram.value}
        errorMessage={form.instagram.errorMessage}
        isValid={form.instagram.isValid}
        valueChangeHandler={upadateFormHandler}
        label='Instagram'
      />
      <Input
        classes={styles.input}
        id='www'
        name='www'
        type='text'
        value={form.www.value}
        errorMessage={form.www.errorMessage}
        isValid={form.www.isValid}
        valueChangeHandler={upadateFormHandler}
        label='Strona internetowa'
      />
      <div></div>
      <Checkbox
        classes={styles.input}
        id='highlited'
        name='highlited'
        value={form.highlited.value}
        errorMessage={form.highlited.errorMessage}
        isValid={form.highlited.isValid}
        valueChangeHandler={upadateFormHandler}
        label='Chcę być promowany'
      />
      <Checkbox
        classes={styles.input}
        id='hidden'
        name='hidden'
        value={form.hidden.value}
        errorMessage={form.hidden.errorMessage}
        isValid={form.hidden.isValid}
        valueChangeHandler={upadateFormHandler}
        label='Ukryj mnie przed innymi mentorami'
      />
      <div className={styles.formSubmit}>
        <Button type='submit'>Zapisz zmiany</Button>
      </div>
    </form>
  </section>
  )
}

export default YourData