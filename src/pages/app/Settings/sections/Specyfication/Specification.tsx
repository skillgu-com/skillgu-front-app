// Libraries
import React, {useEffect, useState} from 'react';
// Components
import Button from '../../../../../new-components/Button/Button';
import {Text, Title} from 'src/new-components/typography';
// Helpers
import Input, {defaultInput} from 'src/new-components/Input/Input';
import MulitSelect from 'src/new-components/MultiSelect/MulitSelect';
// API
import {
    getAllMentorCategories,
    getAllMentoringTopics,
    getAllMentorServices,
    getAllSkills,
} from 'src/services/MentorViewService';
// Types
import {
    TitleTag,
    TitleVariant,
} from 'src/new-components/typography/Title/Title';
// Styles
import styles from '../../Settings.module.scss';

import ImageUpload from 'src/new-components/ImageUpload/ImageUpload';
import classNames from 'classnames';
import {UserData} from '../../Settings';
import {useResolvedPath} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";


interface Service {
    id: string;
    label: string;
    value: boolean;
}

interface MentorCategory {
    id: string;
    label: string;
    value: boolean;
}

interface MentorTopic {
    id: string;
    label: string;
    value: boolean;
    name: string;
}

interface Skill {
    id: string;
    name: string;
}


const Specification = (props: { default: any; userData: UserData }) => {


    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedMentorCategories, setSelectedMentorCategories] = useState<string[]>([]);
    const [selectedMentorTopics, setSelectedMentorTopics] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const dispatch = useDispatch();
    const userSetting = useSelector((state: any) => state.userSetting.userSettingStep);

    const [mentorForm, setMentorForm] = useState({
        mentorTopics: props.default.topics,
        mentorCategory: props.default.categories,
        companyName: defaultInput,
        services: props.default.services,
        skills: {...defaultInput, value: [] as any},
    });


    const prepareDataForSubmission = () => {
        // Przygotowanie danych z mentorForm do wysłania

        return {// companyName: mentorForm.companyName.value,
            // mentorTopics: mentorForm.mentorTopics.value.map((topic: Topic) => topic.id),
            // mentorCategory: mentorForm.mentorCategory.value.map((category: Category) => category.id),
            // mentorCategory: Object.values(props.userData.mentorCategory),
            // services: mentorForm.services.value.map((service: Service) => service.id),
            skills: selectedSkills,
            // skills: mentorForm.skills.value.map((skill: Skill) => skill.name),
            services: selectedServices,
            mentorCategory: selectedMentorCategories,
            mentorTopics: selectedMentorTopics

        };


        // Możesz tutaj dodać logikę walidacji lub dodatkowe przekształcenia


        // return formData;
    };

    const handleServiceChange = (name: string, value: { value: Record<number, Service> }) => {
        if (name === 'services') {
            const servicesArray: Service[] = Object.values(value.value);
            const selectedIds = servicesArray
                .filter((service: Service) => service.value)
                .map((service: Service) => service.id);

            setSelectedServices(selectedIds);
        } else if (name === 'mentorCategory') {
            const mentorCategoriesArray: MentorCategory[] = Object.values(value.value);
            const selectedIds = mentorCategoriesArray
                .filter((mentorCategory: MentorCategory) => mentorCategory.value)
                .map((mentorCategory: MentorCategory) => mentorCategory.id);
            setSelectedMentorCategories(selectedIds);

        } else {
            updateMentorFormHandler(name, value);

        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const dataToSend = prepareDataForSubmission();

        console.log(dataToSend)
    };


    const updateMentorFormHandler = (name: string, newValue: any) => {

        if (name === 'mentorCategory') {
            const mentorCategoriesArray: MentorCategory[] = Object.values(newValue.value);
            const selectedIds = mentorCategoriesArray
                .filter((mentorCategory: MentorCategory) => mentorCategory.value)
                .map((mentorCategory: MentorCategory) => mentorCategory.id);

            setSelectedMentorCategories(selectedIds);
        } else if (name === 'mentorTopics') {
            const mentorTopicsArray: MentorTopic[] = Object.values(newValue.value);
            const selectedIds = mentorTopicsArray
                .filter((mentorTopic: MentorTopic) => mentorTopic.value)
                .map((mentorTopic: MentorTopic) => mentorTopic.id);
            setSelectedMentorTopics(selectedIds);
        }  else if (name==='skills'){
            setSelectedSkills(newValue);
        }
        setMentorForm({...mentorForm, [name]: newValue});

        dispatch({
            type: 'SPECIFICATION_USER_SETTING',
            payload: {
                mentorTopics: selectedMentorTopics,
                mentorCategory: selectedMentorCategories,
                services: selectedServices,
                skills: mentorForm.skills
            }
        })
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
    };

    useEffect(() => {

        let mentorCategory = mentorForm.mentorCategory.value;
        props.userData.mentorCategory?.map(({id}) => {
            mentorCategory[id].value = true;
        });

        let mentorTopics = mentorForm.mentorTopics.value;
        props.userData.mentorTopics?.map(({id}) => {
            mentorTopics[id].value = true;
        });

        let services = mentorForm.services.value;
        props.userData.services?.map(({id}) => {
            services[id].value = true;
        });

        setMentorForm({
            ...mentorForm,
            services: {...mentorForm.services, value: services},
            skills: {...mentorForm.skills, value: props.userData.skill},
            mentorTopics: {...mentorForm.mentorTopics, value: mentorTopics},
            mentorCategory: {...mentorForm.mentorCategory, value: mentorCategory},

        });
    }, [props.userData]);

    return (
        <section className={styles.section}>
            <Title
                tag={TitleTag.h2}
                classes={styles.title}
                variant={TitleVariant.standard}>
                Twoje specjalizacje
            </Title>
            <Text classes={styles.text}>Powiedz więcej o sobie.</Text>

            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    id='companyName'
                    name='companyName'
                    type='text'
                    classes={styles.companyName}
                    value={mentorForm.companyName.value}
                    errorMessage={mentorForm.companyName.errorMessage}
                    isValid={mentorForm.companyName.isValid}
                    valueChangeHandler={updateMentorFormHandler}
                    label='Nazwa firmy'
                />
                <ImageUpload
                    classes={styles.companyLogo}
                    src='https://cdn.pixabay.com/photo/2015/10/31/12/54/google-1015751_640.png'
                    changeHandler={() => null}
                />
                <MulitSelect
                    name='mentorTopics'
                    classes={styles.multiSelect}
                    label='Tematy Mentoringu'
                    limit={3}
                    value={mentorForm.mentorTopics.value}
                    onValueChange={updateMentorFormHandler}
                />

                <MulitSelect
                    classes={styles.multiSelect}
                    name='mentorCategory'
                    label='mentorCategory'
                    limit={3}
                    value={mentorForm.mentorCategory.value}
                    onValueChange={updateMentorFormHandler}
                />
                <MulitSelect
                    classes={styles.multiSelect}
                    label='services'
                    name='services'
                    limit={3}
                    value={mentorForm.services.value}
                    onValueChange={handleServiceChange}

                    // onValueChange={updateMentorFormHandler}
                />
                <Input
                    classes={classNames(styles.input, styles.skillsInput)}
                    id='skills'
                    name='skills'
                    type='multi'
                    value={mentorForm.skills.value}
                    errorMessage={mentorForm.skills.errorMessage}
                    isValid={mentorForm.skills.isValid}
                    valueChangeHandler={updateMentorFormHandler}
                    label='Umiejętności'
                />
                <div className={styles.formSubmit}>
                    <Button type='submit'>Zapisz zmiany TEST</Button>
                </div>
            </form>
        </section>
    );
};

export default Specification;
