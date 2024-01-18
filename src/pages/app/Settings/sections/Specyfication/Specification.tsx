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
import {fetchAllUserData} from '../../../../../services/UserProfileService';
import ImageUpload from 'src/new-components/ImageUpload/ImageUpload';

interface AllData {
	skills: any[];
	mentorCategories: any[];
	mentoringTopics: any[];
	mentorServices: any[];
}

const Specification = () => {
	const [mentorForm, setMentorForm] = useState({
		mentorTopics: defaultInput,
		mentorCategory: defaultInput,
		companyName: defaultInput,
		services: defaultInput,
		skills: {...defaultInput, value: [] as string[]},
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

	useEffect(() => {
		Promise.all([
			getAllSkills(),
			getAllMentorCategories(),
			getAllMentoringTopics(),
			getAllMentorServices(),
			fetchAllUserData(),
		]).then(([skillsRes, mentorCategories, mentorTopics, mentorServices]) => {
			const transformedSkills = skillsRes.data.map(
				(skill: string, index: number) => ({
					id: `skill-${index}`,
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
				(acc: {[x: string]: any}, category: {id: string | number}) => {
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

		fetchAllUserData().then((res) => {
			console.log(res.data);
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

			<form className={styles.form} onSubmit={submitHandler}>
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
					classes={styles.multiSelect}
					label='Tematy Mentoringu'
					limit={3}
					options={{}}
					onValueChange={(state: any) =>
						updateMentorFormHandler('mentorTopics', state)
					}
				/>

				<MulitSelect
					classes={styles.multiSelect}
					label='Moja kategoria'
					limit={3}
					options={{}}
					onValueChange={(state: any) =>
						updateMentorFormHandler('mentorCategory', state)
					}
				/>
				<MulitSelect
					classes={styles.multiSelect}
					label='Usługi'
					limit={3}
					options={{}}
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
