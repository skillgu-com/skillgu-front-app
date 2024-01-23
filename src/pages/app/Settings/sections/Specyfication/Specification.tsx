// Libraries
import React, {useEffect, useState} from 'react';
// Components
import Button from '../../../../../new-components/Button/Button';
import {Text, Title} from 'src/new-components/typography';
// Helpers
import Input, {defaultInput} from 'src/new-components/Input/Input';
import MulitSelect from 'src/new-components/MultiSelect/MulitSelect';
// Types
import {
    TitleTag,
    TitleVariant,
} from 'src/new-components/typography/Title/Title';
// Styles
import styles from '../../Settings.module.scss';
import {
    getAllMentorCategories,
    getAllMentoringTopics,
    getAllMentorServices,
    getAllSkills,
} from '../../../../../services/MentorViewService';
import {fetchAllUserData, settingUser} from '../../../../../services/UserProfileService';
import ImageUpload from 'src/new-components/ImageUpload/ImageUpload';

type Skill = {
    id: string;
    text: string;
};

const Specification = () => {
    const [mentorForm, setMentorForm] = useState({
        mentorTopics: defaultInput,
        mentorCategory: defaultInput,
        companyName: defaultInput,
        services: defaultInput,
        skills: {...defaultInput, value: [] as Skill[]},
    });

    const [transformedData, setTransformedData] = useState({
        transformedSkills: [],
        transformedMentorCategories: [],
        transformedMentoringTopics: [],
        transformedMentorServices: [],
    });

    const updateMentorFormHandler = (name: string, value: any) => {
        setMentorForm({...mentorForm, [name]: value});
    };

    const submitFormHandler = (e: any) => {
        e.preventDefault();
        const skillsAsStringArray = mentorForm.skills.value.map(skillObject => skillObject.text);

        const userData = {
            skill: skillsAsStringArray,
            // lastName: form.lastName.value,
            // phone: form.phone.value,
            // position: form.position.value,
            // location: form.location.value,
            // linkedInURL: form.linkedin.value,
            // instagramURL: form.instagram.value,
            // facebookURL: form.facebook.value,
            // youtubeURL: form.facebook.value,
            // twitterURL: form.x.value,
            // descriptionAboutMe: form.description.value
        };


        settingUser(userData).then((res) => {
            console.log('Dane zostały wysłane:', res);
        }).catch((error) => {
            // Obsługa błędów
            console.error('Błąd wysyłania danych:', error);
        });
    };

    useEffect(() => {
        Promise.all([
            getAllSkills(),
            getAllMentorCategories(),
            getAllMentoringTopics(),
            getAllMentorServices(),
            fetchAllUserData(),
        ]).then(
            ([
                                    skillsRes,
                                    mentorCategories,
                                    mentorTopics,
                                    mentorServices]) => {
            const transformedSkills = skillsRes.data.map(
                (skill: string, index: number) => ({
                    id: index,
                    label: skill,
                    ...defaultInput,
                })
            );
            const transformedMentorCategories = mentorCategories.data.map(
                (category: string, index: number) => ({
                    id: `category-${index}`,
                    label: category,
                    ...defaultInput,
                })
            );

            const transformedMentoringTopics = mentorTopics.data.map(
                (mentorType: string, index: number) => ({
                    id: `mentorType-${index}`,
                    label: mentorType,
                    ...defaultInput,
                })
            );
            const transformedMentorServices = mentorServices.data.map(
                (mentorService: string, index: number) => ({
                    id: `services-${index}`,
                    label: mentorService,
                    ...defaultInput,
                })
            );
            const optionsFromBackend = transformedMentorCategories.reduce(
                (acc: { [x: string]: any }, category: { id: string | number }) => {
                    acc[category.id] = {...category, value: false};
                    return acc;
                },
                {}
            );

            setTransformedData({
                transformedSkills,
                transformedMentorCategories: optionsFromBackend,
                transformedMentoringTopics,
                transformedMentorServices,
            });
        });

    }, []);

    const submitHandler = (e: any) => {
        e.preventDefault();
    };

    return (
        <section className={styles.section}>
            <Title
                tag={TitleTag.h2}
                classes={styles.title}
                variant={TitleVariant.standard}>
                Twoje specjalizacje
            </Title>
            <Text classes={styles.text}>Powiedz więcej o sobie.</Text>

            <form className={styles.form} onSubmit={submitFormHandler}>
                <ImageUpload
                    classes={styles.companyLogo}
                    src='https://cdn.pixabay.com/photo/2015/10/31/12/54/google-1015751_640.png'
                    changeHandler={() => null}
                />
                <Input
                    id='companyName'
                    name='companyName'
                    type='text'
                    value={mentorForm.companyName.value}
                    errorMessage={mentorForm.companyName.errorMessage}
                    isValid={mentorForm.companyName.isValid}
                    valueChangeHandler={updateMentorFormHandler}
                    label='Nazwa firmy'
                />
                <MulitSelect
                    name='mentorTopics'
                    classes={styles.multiSelect}
                    label='Tematy Mentoringu'
                    limit={3}
                    value={{}}
                    onValueChange={updateMentorFormHandler}
                />

                <MulitSelect
                    classes={styles.multiSelect}
                    name='mentorCategory'
                    label='Moja kategoria'
                    limit={3}
                    value={{}}
                    onValueChange={updateMentorFormHandler}
                />
                <MulitSelect
                    classes={styles.multiSelect}
                    label='Usługi'
                    name='services'
                    limit={3}
                    value={{}}
                    onValueChange={updateMentorFormHandler}
                />
                <Input
                    classes={styles.input}
                    id='skills'
                    name='skills'
                    type='multi'
                    value={mentorForm.skills.value.map(skill => skill.text)}
                    errorMessage={mentorForm.skills.errorMessage}
                    isValid={mentorForm.skills.isValid}
                    valueChangeHandler={updateMentorFormHandler}
                    label='Umiejętności'
                />
                <div className={styles.formSubmit}>
                    <Button type='submit'>Zapisz zmiany</Button>
                </div>
            </form>
        </section>
    );
};

export default Specification;
