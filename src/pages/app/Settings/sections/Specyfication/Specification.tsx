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
		skills: {...defaultInput, value: [] as string[]},
		services: defaultInput,
		market: defaultInput,
	});

	const updateMentorFormHandler = (name: string, value: any) => {
		setMentorForm({...mentorForm, [name]: value});
	};

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
						test: {id: 'test', name: 'test', label: 'Budowanie Zespołu', ...defaultInput},
						test22: {id: 'test22', name: 'test22', label: 'Budowanie Zespołu Zdalnego', ...defaultInput},
						test24: {id: 'test24', name: 'test24', label: 'Być Lepszym Mentorem', ...defaultInput},
						test11: {id: 'test11', name: 'test11', label: 'CEO i Founderzy', ...defaultInput},
						test1: {id: 'test1', name: 'test1', label: 'Ekspert - Konsultacje', ...defaultInput},
						test18: {id: 'test18', name: 'test18', label: 'IT - Budowanie Zespołu', ...defaultInput},
						test6: {id: 'test6', name: 'test6', label: 'IT - Rozwój', ...defaultInput},
						test7: {id: 'test7', name: 'test7', label: 'IT - Mentoring', ...defaultInput},
						test3: {id: 'test3', name: 'test3', label: 'Interaktywny Design', ...defaultInput},
						test17: {id: 'test17', name: 'test17', label: 'Nauka Umiejętności', ...defaultInput},
						test19: {id: 'test19', name: 'test19', label: 'Narzędzia - Nauka', ...defaultInput},
						test20: {id: 'test20', name: 'test20', label: 'Osiągnięcia - Podwyżki', ...defaultInput},
						test21: {id: 'test21', name: 'test21', label: 'Odpowiedzialność', ...defaultInput},
						test9: {id: 'test9', name: 'test9', label: 'Projekty - Zarządzanie', ...defaultInput},
						test14: {id: 'test14', name: 'test14', label: 'Produkt - Rozwój', ...defaultInput},
						test25: {id: 'test25', name: 'test25', label: 'Rozwój Celów', ...defaultInput},
						test4: {id: 'test4', name: 'test4', label: 'Rozwój Zawodowy', ...defaultInput},
						test8: {id: 'test8', name: 'test8', label: 'Rozwój Umiejętności', ...defaultInput},
						test15: {id: 'test15', name: 'test15', label: 'Zmiana Kariery', ...defaultInput},
						test10: {id: 'test10', name: 'test10', label: 'Strategie Biznesowe', ...defaultInput},
						test12: {id: 'test12', name: 'test12', label: 'Startupy - Zarządzanie', ...defaultInput},
						test13: {id: 'test13', name: 'test13', label: 'Biznes - Rozwój', ...defaultInput},
						test23: {id: 'test23', name: 'test23', label: 'Szkolenie Menadżerów', ...defaultInput},
						test16: {id: 'test16', name: 'test16', label: 'Rozmowy Kwalifikacyjne', ...defaultInput},
						test2: {id: 'test2', name: 'test2', label: 'Wspólne Programowanie', ...defaultInput},
						test5: {id: 'test5', name: 'test5', label: 'CV - Optymalizacja', ...defaultInput},
						test26: {id: 'test26', name: 'test26', label: 'Programowanie', ...defaultInput},
					}}
					onValueChange={(state: any) => updateMentorFormHandler('titles', state)}
				/>

				<MulitSelect
					classes={styles.multiSelect}
					label='Kategorie Mentoringu'
					limit={3}
					options={{
						test: {id: 'test', name: 'test', label: 'IT', ...defaultInput},
						test1: {id: 'test1', name: 'test1', label: 'DESIGN', ...defaultInput},
						test2: {id: 'test2', name: 'test2', label: 'BIZNES', ...defaultInput},
						test3: {id: 'test3', name: 'test3', label: 'KARIERA', ...defaultInput},
					}}
					onValueChange={(state: any) => updateMentorFormHandler('mentorCategory', state)}
				/>
				<MulitSelect
					classes={styles.multiSelect}
					label='Usługi'
					limit={3}
					options={{
						test: {id: 'test', name: 'test', label: 'Regularne spotkania', ...defaultInput},
						test1: {id: 'test1', name: 'test1', label: 'Konsultacje eksperckie', ...defaultInput},
						test2: {id: 'test2', name: 'test2', label: 'Tylko sesje', ...defaultInput},
						test4: {id: 'test4', name: 'test4', label: 'Tylko chat', ...defaultInput},
						test5: {id: 'test5', name: 'test5', label: 'Praca z zadaniami', ...defaultInput},
						test6: {id: 'test6', name: 'test6', label: 'Rozwiązywanie zadań', ...defaultInput},
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

export default Specyfication;
