// Libraries
import React, {useEffect, useState} from 'react';
// Components
import Button from '../../../../../new-components/Button/Button';
import {Text, Title} from 'src/new-components/typography';
// Helpers
import Input, {defaultInput} from 'src/new-components/Input/Input';
import MulitSelect from 'src/new-components/MultiSelect/MulitSelect';
// Types
import {TitleTag, TitleVariant,} from 'src/new-components/typography/Title/Title';
// Styles
import styles from '../../Settings.module.scss';
import {
    getAllMentorCategories, getAllMentorTypes, getAllSessionTypes, getAllSkills,
} from "../../../../../services/MentorViewService";

interface AllData {
    skills: any[];
    categories: any[];
    sessionTypes: any[];
    mentorTypes: any[];
}

const Specification = () => {
    const [mentorForm, setMentorForm] = useState({
        mentorTopics: defaultInput,
        mentorCategory: defaultInput,
        services: defaultInput,
        skills: {...defaultInput, value: [] as string[]}
    });
    // const [skills, setSkills] = useState([]);
    // const [categories, setCategories] = useState([]);
    // const [sessionTypes, setSessionTypes] = useState([]);
    // const [mentorTypes, setMentorTypes] = useState([]);
    //
    const [allData, setAllData] = useState<AllData>({
        skills: [],
        categories: [],
        sessionTypes: [],
        mentorTypes: []
    });

    const updateMentorFormHandler = (name: string, value: any) => {
        setMentorForm({...mentorForm, [name]: value});
    };

    useEffect(() => {
        Promise.all([
            getAllSkills(),
            getAllMentorCategories(),
            getAllSessionTypes(),
            getAllMentorTypes()
        ]).then(([skillsRes, categoriesRes, sessionTypesRes, mentorTypesRes]) => {
            const transformedSkills = skillsRes.data.map((skill: string, index: number) => ({
                id: `skill-${index}`,
                label: skill,
                ...defaultInput
            }));
            const transformedCategories = categoriesRes.data.map((category: string, index: number) => ({
                id: `category-${index}`,
                label: category,
                ...defaultInput
            }));
            const transformedSessionTypes = sessionTypesRes.data.map((sessionType: string, index: number) => ({
                id: `sessionType-${index}`,
                label: sessionType,
                ...defaultInput
            }));
            const transformedMentorTypes = mentorTypesRes.data.map((mentorType: string, index: number) => ({
                id: `mentorType-${index}`,
                label: mentorType,
                ...defaultInput
            }));

            setAllData({
                skills: transformedSkills,
                categories: transformedCategories,
                sessionTypes: transformedSessionTypes,
                mentorTypes: transformedMentorTypes
            });
        });
    }, []);

    const submitHandler = (e: any) => {
        e.preventDefault()
    }

    return (
        <section className={styles.section}>
            <Title
                tag={TitleTag.h2}
                classes={styles.title}
                variant={TitleVariant.standard}>
                Twoje specjalizacje
            </Title>
            <Text classes={styles.text}>Powiedz więcej o sobie.</Text>

            <form className={styles.form} onSubmit={submitHandler}>
                <MulitSelect
                    classes={styles.multiSelect}
                    label='Tematy Mentoringu'
                    limit={3}
                    options={{

                    }}
                    onValueChange={(state: any) => updateMentorFormHandler('mentorTopics', state)}
                />

                <MulitSelect
                    classes={styles.multiSelect}
                    label='Kategorie Mentoringu'
                    limit={3}
                    options={{
                        test: {id: 'test', name: 'test', label: 'IT', ...defaultInput},
                    }}
                    onValueChange={(state: any) => updateMentorFormHandler('mentorCategory', state)}
                />
                <MulitSelect
                    classes={styles.multiSelect}
                    label='Usługi'
                    limit={3}
                    options={{

                    }}
                    onValueChange={(state: any) => updateMentorFormHandler('services', state)}
                />
                <Input
                    classes={styles.input}
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
                    <Button type='submit'>Zapisz zmiany</Button>
                </div>
            </form>
        </section>
    );
};

export default Specification;
