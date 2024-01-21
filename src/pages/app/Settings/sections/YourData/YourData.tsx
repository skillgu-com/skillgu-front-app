// Libraries
import React, {useState} from 'react';
import classNames from 'classnames';
// Components
import Button from '../../../../../new-components/Button/Button';
import {Title, Text} from 'src/new-components/typography';
import Input from 'src/new-components/Input/Input';
import Checkbox from 'src/new-components/Checkbox/Checkbox';
// Helpers
import {defaultInput} from 'src/new-components/Input/Input';
// Types
import {
    TitleTag,
    TitleVariant,
} from 'src/new-components/typography/Title/Title';
import ImageUpload from 'src/new-components/ImageUpload/ImageUpload';
// Styles
import styles from '../../Settings.module.scss'
import {settingUser} from "../../../../../services/UserProfileService";

const YourData = () => {
    const [form, setForm] = useState({
        profileImage: '', // puste wartości dla dodatkowych pól
        mentorCategory: '',
        mentorTopic: [],
        skill: [],
        services: [],
        mentoringLanguages: [],
        jobPosition: '',
        descriptionAboutMe: '',
        firstName: defaultInput, // te pola były już zdefiniowane na froncie
        lastName: defaultInput,
        phone: defaultInput,
        position: defaultInput,
        location: defaultInput,
        linkedin: defaultInput,
        instagram: defaultInput,
        facebook: defaultInput,
        x: defaultInput, // zakładam, że to pole istnieje na froncie
        www: defaultInput, // zakładam, że to pole istnieje na froncie
        description: defaultInput,
        highlighted: {...defaultInput, value: false},
        hidden: {...defaultInput, value: false},
        oldEmail: '',
        newEmail: '',
        facebookURL: '',
        instagramURL: '',
        twitterURL: '',
        linkedInURL: '',
        youtubeURL: '',
        timeZone: '',
        mentorLocation: ''
    });

    const updateFormHandler = (name: string, value: any) => {
        setForm({...form, [name]: value});
    };

    const submitFormHandler = () => {

        const userData = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            phone: form.phone.value,
            position: form.position.value,
            location: form.location.value,
            linkedInURL: form.linkedin.value,
            instagramURL: form.instagram.value,
            facebookURL: form.facebook.value,
            youtubeURL: form.facebook.value,
            twitterURL: form.x.value,
            descriptionAboutMe: form.description.value
            // Dodaj inne pola zgodnie z potrzebami
        };

        settingUser(userData).then((res) => {
            console.log('Dane zostały wysłane:', res);
        }).catch((error) => {
            // Obsługa błędów
            console.error('Błąd wysyłania danych:', error);
        });
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
            <form className={styles.form} onSubmit={submitFormHandler}>
                <ImageUpload src='https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg'
                             changeHandler={() => null}/>
                <Input
                    classes={styles.input}
                    id='firstName'
                    name='firstName'
                    type='text'
                    value={form.firstName.value}
                    errorMessage={form.firstName.errorMessage}
                    isValid={form.firstName.isValid}
                    valueChangeHandler={updateFormHandler}
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
                    valueChangeHandler={updateFormHandler}
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
                    valueChangeHandler={updateFormHandler}
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
                    valueChangeHandler={updateFormHandler}
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
                    valueChangeHandler={updateFormHandler}
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
                    valueChangeHandler={updateFormHandler}
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
                    valueChangeHandler={updateFormHandler}
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
                    valueChangeHandler={updateFormHandler}
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
                    valueChangeHandler={updateFormHandler}
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
                    valueChangeHandler={updateFormHandler}
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
                    valueChangeHandler={updateFormHandler}
                    label='Strona internetowa'
                />
                <div></div>
                <Checkbox
                    classes={styles.input}
                    id='highlited'
                    name='highlited'
                    value={form.highlighted.value}
                    errorMessage={form.highlighted.errorMessage}
                    isValid={form.highlighted.isValid}
                    valueChangeHandler={updateFormHandler}
                    label='Chcę być promowany'
                />
                <Checkbox
                    classes={styles.input}
                    id='hidden'
                    name='hidden'
                    value={form.hidden.value}
                    errorMessage={form.hidden.errorMessage}
                    isValid={form.hidden.isValid}
                    valueChangeHandler={updateFormHandler}
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