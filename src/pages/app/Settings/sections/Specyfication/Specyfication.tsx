// Libraries
import React, {useState} from 'react';
// Components
import Button from '../../../../../new-components/Button/Button';
import {Title, Text} from 'src/new-components/typography';
import Input from 'src/new-components/Input/Input';
import MulitSelect from 'src/new-components/MultiSelect/MulitSelect';
// Helpers
import {defaultInput} from 'src/new-components/Input/Input';
// Types
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
// Styles
import styles from '../../Settings.module.scss';

const Specyfication = () => {
	const [mentorForm, setMentorForm] = useState({
		titles: defaultInput,
		skills: defaultInput,
		services: defaultInput,
		market: defaultInput,
	});

	const upadateMentorFormHandler = (name: string, value: any) => {
		setMentorForm({...mentorForm, [name]: value});
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
			<form className={styles.form}>
				<MulitSelect
					classes={styles.multiSelect}
					label='Tematy mentoringu'
					limit={3}
					options={{
						test: {
							id: 'test',
							name: 'test',
							label: 'testowy temat mentoringu 1',
							...defaultInput,
						},
						test1: {
							id: 'test1',
							name: 'test1',
							label: 'testowy temat mentoringu 2',
							...defaultInput,
						},
						test2: {
							id: 'test2',
							name: 'test2',
							label: 'testowy temat mentoringu 3',
							...defaultInput,
						},
						test3: {
							id: 'test3',
							name: 'test3',
							label: 'testowy temat mentoringu 4',
							...defaultInput,
						},
						test4: {
							id: 'test4',
							name: 'test4',
							label: 'testowy temat mentoringu 5',
							...defaultInput,
						},
						test5: {
							id: 'test5',
							name: 'test5',
							label: 'testowy temat mentoringu 6',
							...defaultInput,
						},
					}}
					onValueChange={(state: any) => upadateMentorFormHandler('titles', state)}
				/>
				<MulitSelect
					classes={styles.multiSelect}
					label='Branża'
					limit={3}
					options={{
						test: {
							id: 'test',
							name: 'test',
							label: 'testowa branża 1',
							...defaultInput,
						},
						test1: {
							id: 'test1',
							name: 'test1',
							label: 'testowa branża 2',
							...defaultInput,
						},
						test2: {
							id: 'test2',
							name: 'test2',
							label: 'testowa branża 3',
							...defaultInput,
						},
						test3: {
							id: 'test3',
							name: 'test3',
							label: 'testowa branża 4',
							...defaultInput,
						},
						test4: {
							id: 'test4',
							name: 'test4',
							label: 'testowa branża 5',
							...defaultInput,
						},
						test5: {
							id: 'test5',
							name: 'test5',
							label: 'testowa branża 6',
							...defaultInput,
						},
					}}
					onValueChange={(state: any) => upadateMentorFormHandler('market', state)}
				/>
				<Input
					classes={styles.input}
					id='skills'
					name='skills'
					type='text'
					value={mentorForm.skills.value}
					errorMessage={mentorForm.skills.errorMessage}
					isValid={mentorForm.skills.isValid}
					valueChangeHandler={upadateMentorFormHandler}
					label='Umiejętności'
				/>
				<Input
					classes={styles.input}
					id='services'
					name='services'
					type='text'
					value={mentorForm.services.value}
					errorMessage={mentorForm.services.errorMessage}
					isValid={mentorForm.services.isValid}
					valueChangeHandler={upadateMentorFormHandler}
					label='Usługi'
				/>
				<div className={styles.formSubmit}>
					<Button type='submit'>Zapisz zmiany</Button>
				</div>
			</form>
		</section>
	);
};

export default Specyfication;
