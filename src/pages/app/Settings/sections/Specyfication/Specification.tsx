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

interface AllData {
	skills: any[];
	mentorCategories: any[];
	mentoringTopics: any[];
	mentorServices: any[];
}

const Specification = (props: {default: any; userData: UserData}) => {
	const [mentorForm, setMentorForm] = useState({
		mentorTopics: props.default.topics,
		mentorCategory: props.default.categories,
		companyName: defaultInput,
		services: props.default.services,
		skills: props.default.skills,
	});

	const updateMentorFormHandler = (name: string, value: any) => {
		setMentorForm({...mentorForm, [name]: value});
	};

	const submitHandler = (e: any) => {
		e.preventDefault();
	};
console.log(props.userData);
	useEffect(() => {
		let services = mentorForm.services.value;
		props.userData.services?.map(({id}) => {
			services[id].value = true;
		});
		let skills = mentorForm.skills.value;
		props.userData.skill?.map(({id}) => {
			skills[id].value = true;
		});
		// let mentorCategory = mentorForm.mentorCategory.value;
		// props.userData.mentorCategory?.map(({id}) => {
		// 	mentorCategory[id].value = true;
		// });
		let mentorTopics = mentorForm.mentorTopics.value;
		props.userData.mentorTopics?.map(({id}) => {
			mentorTopics[id].value = true;
		});

		setMentorForm({
			...mentorForm,
			services: {...mentorForm.services, value: services},
			skills: {...mentorForm.skills, value: skills},
			mentorTopics: {...mentorForm.mentorTopics, value: mentorTopics},
			// mentorCategory: {...mentorForm.mentorCategory, value: mentorCategory},
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

			<form className={styles.form} onSubmit={submitHandler}>
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
					label='Moja kategoria'
					limit={3}
					value={mentorForm.mentorCategory.value}
					onValueChange={updateMentorFormHandler}
				/>
				<MulitSelect
					classes={styles.multiSelect}
					label='Usługi'
					name='services'
					limit={3}
					value={mentorForm.services.value}
					onValueChange={updateMentorFormHandler}
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
					<Button type='submit'>Zapisz zmiany</Button>
				</div>
			</form>
		</section>
	);
};

export default Specification;
