// Libraries
import React, {FormEvent, useEffect, useState} from 'react';
// Components
import Container from 'src/new-components/Container/Container';
import {Title} from 'src/new-components/typography';
import Button from 'src/new-components/Button/Button';
import Modal from 'src/new-components/Modal/Modal';
import MulitSelect from 'src/new-components/MultiSelect/MulitSelect';
// Assets
import FilterSvg from 'src/assets/icons/FilterSvg';
import SearchSvg from 'src/assets/icons/SearchSvg';
// API
import {
	getAllMentorCategories,
	getAllMentoringTopics,
	getAllMentorServices,
	getAllSkills,
} from 'src/services/MentorViewService';
// Styles
import styles from './Filters.module.scss';
// Types
import {Tag} from 'src/types/tags';
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
import Select from 'src/new-components/Select/Select';
import {defaultInput} from 'src/new-components/Input/Input';
import CheckboxSelect from 'src/new-components/CheckboxSelect/CheckboxSelect';

const Filters = () => {
	const [filtersModal, setFiltersModal] = useState(false);
	const [mentorForm, setMentorForm] = useState<any>();

	useEffect(() => {
		Promise.all([
			getAllSkills(),
			getAllMentorCategories(),
			getAllMentoringTopics(),
			getAllMentorServices(),
		]).then(([skillsRes, mentorCategories, mentorTopics, mentorServices]) => {
			let transformedSkills: any = [];
			skillsRes.data.map((category: {id: string; name: string}) => {
				transformedSkills.push({id: category?.id, text: category?.name});
			});

			let transformedMentorCategories: any = {};
			mentorCategories.data.map((item: {id: string; name: string}) => {
				transformedMentorCategories[item?.id] = {
					id: item?.id,
					label: item?.name,
					...defaultInput,
					value: false,
				};
			});

			let transformedMentoringTopics: any = {};
			mentorTopics.data.map((item: {id: string; name: string}) => {
				transformedMentoringTopics[item?.id] = {
					id: item?.id,
					label: item?.name,
					...defaultInput,
					value: false,
				};
			});

			let transformedMentorServices: any = {};
			mentorServices.data.map((item: {id: string; name: string}) => {
				transformedMentorServices[item?.id] = {
					id: item?.id,
					label: item?.name,
					...defaultInput,
					value: false,
				};
			});

			setMentorForm({
				skills: {
					...defaultInput,
					value: transformedSkills,
				},
				categories: {
					...defaultInput,
					value: transformedMentorCategories,
				},
				topics: {
					...defaultInput,
					value: transformedMentoringTopics,
				},
				sort: {
					...defaultInput,
					value: [],
				},
				services: {
					...defaultInput,
					value: transformedMentorServices,
				},
			});
		});
	}, []);

	const updateFormHandler = (name: string, value: any) => {
		setMentorForm({...mentorForm, [name]: value});
	};

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
	};

	console.log(mentorForm);

	return (
		<Container as={Tag.Section} classes={styles.wrapper}>
			<Title tag={TitleTag.h2} variant={TitleVariant.standard}>
				Filtr wyszykiwań
			</Title>
			<div className={styles.filtersGroup}>
				<form onSubmit={submitHandler} className={styles.search}>
					<input type='text' placeholder='Szukaj po umiejetnosci lub tytule pracy' />
					<button type='submit'>
						<SearchSvg />
					</button>
				</form>
				<Select
					options={[
						{value: 'alphabet', label: 'Alfabetycznie'},
						{value: 'increase', label: 'Rosnąco'},
						{value: 'next', label: 'Kolejna'},
					]}
					value={mentorForm?.sort?.value}
					valueChangeHandler={updateFormHandler}
					name='sort'
					id='sort'
					label='Sortowanie'
				/>

				<CheckboxSelect
					name='categories'
					selectClasses={styles.topicsSelect}
					classes={styles.select}
					value={mentorForm?.categories.value}
					label='Kategorie'
					onValueChange={updateFormHandler}
				/>

				<CheckboxSelect
					name='topics'
					classes={styles.select}
					value={mentorForm?.topics.value}
					label='Umiejętności'
					onValueChange={updateFormHandler}
				/>

				<button className={styles.more} onClick={() => setFiltersModal(true)}>
					Więcej filtrów <FilterSvg />
				</button>
				<button className={styles.clear} onClick={() => null}>
					Wyczyść filtry
				</button>
			</div>
			{filtersModal && (
				<Modal
					closeHandler={() => setFiltersModal(false)}
					title='Więcej filtrów wyszukiwania'>
					<MulitSelect
						name='mentorGroup'
						limit={4}
						classes={styles.select}
						value={mentorForm.categories.value}
						label='Grupa mentorów'
						onValueChange={updateFormHandler}
					/>
					{/*<MulitSelect*/}
					{/*    name='timeZone'*/}
					{/*    limit={4}*/}
					{/*    classes={styles.select}*/}
					{/*    value={mentorForm.timeZone.value}*/}
					{/*    label='Strefa czasowa'*/}
					{/*    onValueChange={updateFormHandler}*/}
					{/*/>*/}
					{/*<MulitSelect*/}
					{/*    name='languages'*/}
					{/*    limit={4}*/}
					{/*    classes={styles.select}*/}
					{/*    value={form.languages.value}*/}
					{/*    label='Język'*/}
					{/*    onValueChange={updateFormHandler}*/}
					{/*/>*/}
					{/*<RangeInput*/}
					{/*    id='price'*/}
					{/*    label='Stawka'*/}
					{/*    minValue={0}*/}
					{/*    maxValue={100}*/}
					{/*    currentMinValue={form.price.value[0]}*/}
					{/*    currentMaxValue={form.price.value[1]}*/}
					{/*    valueChangeHandler={updateFormHandler}*/}
					{/*/>*/}
					<Button classes={styles.button}>Wyszukaj</Button>
				</Modal>
			)}
		</Container>
	);
};

export default Filters;