// Libraries
import React, {useEffect, useState} from 'react';
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
import styles from '../../Settings.module.scss';
// Types
import {UserData} from '../../Settings';
import {useDispatch, useSelector} from "react-redux";
import {settingUser} from "../../../../../services/UserProfileService";

interface YourDataProps {
    userData: UserData;
}

const YourData = (props: YourDataProps) => {
    const {userData} = props;
    const dispatch = useDispatch();
    const userSetting = useSelector((state: any) => state.userSetting.userSettingStep);


    const [form, setForm] = useState({
        firstName: defaultInput,
        lastName: defaultInput,
        phone: defaultInput,
        jobPosition: defaultInput,
        location: defaultInput,
        linkedin: defaultInput,
        instagram: defaultInput,
        facebook: defaultInput,
        x: defaultInput,
        www: defaultInput,
        youtube: defaultInput,
        description: defaultInput,
        highlited: {...defaultInput, value: false},
        hidden: {...defaultInput, value: false},
    });


    const updateFormHandler = (name: string, value: any) => {
        setForm({...form, [name]: value});
        dispatch({
            type: 'YOUR_DATA_USER_SETTING',
            payload: {
                id:userData.userID,
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                phone: form.phone.value,
                jobPosition: form.jobPosition.value,
                location: form.location.value,
                linkedin: form.linkedin.value,
                instagram: form.instagram.value,
                facebook: form.facebook.value,
                youtube: form.youtube.value,
                description: form.description.value,
                x: form.x.value,
                www: form.www.value
            }
        })
    };



    const handleSubmit = async (e: any) => {
        console.log(userSetting)
        e.preventDefault();
        settingUser(userSetting).then(r => {

        })

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
            <form className={styles.form} onSubmit={handleSubmit}>
                <ImageUpload
                    src='https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg'
                    changeHandler={() => null}
                />
                <Input
                    classes={styles.input}
                    id='firstName'
                    name='firstName'
                    type='text'
                    placeholder={userSetting.firstName}
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
                    placeholder={userSetting.lastName}
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
                    id='jobPosition'
                    name='jobPosition'
                    type='text'
                    placeholder={userData.jobPosition?.[0]?.name}
                    value={form.jobPosition.value}
                    errorMessage={form.jobPosition.errorMessage}
                    isValid={form.jobPosition.isValid}
                    valueChangeHandler={updateFormHandler}
                    label='Stanowisko'
                />
                <Input
                    classes={styles.input}
                    id='location'
                    name='location'
                    type='text'
                    placeholder={userData?.location ?? ''}
                    value={form.location.value}
                    errorMessage={form.location.errorMessage}
                    isValid={form.location.isValid}
                    valueChangeHandler={updateFormHandler}
                    label='Lokalizacja'
                />
                <Input
                    classes={classNames(styles.input, styles.textarea)}
                    id='description'
                    name='description'
                    as='textarea'
                    placeholder={userData?.description ?? ''}
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
                    placeholder={userData?.linkedInURL ?? ''}
                    value={form.linkedin.value}
                    errorMessage={form.linkedin.errorMessage}
                    isValid={form.linkedin.isValid}
                    valueChangeHandler={updateFormHandler}
                    label='Linked In'
                />
                <Input
                    classes={styles.input}
                    id='youtube'
                    name='youtube'
                    type='text'
                    placeholder={userData?.youtubeURL ?? ''}
                    value={form.youtube.value}
                    errorMessage={form.youtube.errorMessage}
                    isValid={form.youtube.isValid}
                    valueChangeHandler={updateFormHandler}
                    label='youtube'
                />
                <Input
                    classes={styles.input}
                    id='facebook'
                    name='facebook'
                    type='text'
                    placeholder={userData?.facebookURL ?? ''}
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
                    placeholder={userData?.xurl ?? ''}
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
                    placeholder={userData?.instagramURL ?? ''}
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
                    placeholder={userData?.websiteURL ?? ''}
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
                    value={form.highlited.value}
                    errorMessage={form.highlited.errorMessage}
                    isValid={form.highlited.isValid}
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
    );
};

export default YourData;
