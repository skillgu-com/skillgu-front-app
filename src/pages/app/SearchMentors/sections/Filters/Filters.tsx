// Libraries
import React, {FormEvent, useEffect, useState} from 'react';
// Components
import Container from 'src/new-components/Container/Container';
import MentorCard from 'src/new-components/Cards/MentorCard/MentorCard';
import {Title} from 'src/new-components/typography';
import Button from 'src/new-components/Button/Button';
import Modal from 'src/new-components/Modal/Modal';
import MulitSelect from 'src/new-components/MultiSelect/MulitSelect';
import RangeInput from 'src/new-components/RangeInput/RangeInput';
// Assets
import FilterSvg from 'src/assets/icons/FilterSvg';
import SearchSvg from 'src/assets/icons/SearchSvg';
// API
import {getAllMentors} from 'src/services/UserProfileService';
import {getAllFilteredMentors} from 'src/services/MentorViewService';
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

const Filters = () => {
	const [filtersModal, setFiltersModal] = useState(false);

	const [form, setForm] = useState({
		mentorGroup: {
			...defaultInput,
			value: {
				test: {id: 'test', name: 'test', label: 'IT', ...defaultInput},
				test1: {id: 'test1', name: 'test1', label: 'IT', ...defaultInput},
				test2: {id: 'test2', name: 'test2', label: 'IT', ...defaultInput},
				test3: {id: 'test3', name: 'test3', label: 'IT', ...defaultInput},
				test4: {id: 'test3', name: 'test3', label: 'IT', ...defaultInput},
			},
		},
		languages: {
			...defaultInput,
			value: {
				test: {id: 'test', name: 'test', label: 'IT', ...defaultInput},
				test1: {id: 'test1', name: 'test1', label: 'IT', ...defaultInput},
				test2: {id: 'test2', name: 'test2', label: 'IT', ...defaultInput},
				test3: {id: 'test3', name: 'test3', label: 'IT', ...defaultInput},
				test4: {id: 'test3', name: 'test3', label: 'IT', ...defaultInput},
			},
		},
		timeZone: {
			...defaultInput,
			value: {
				test: {id: 'test', name: 'test', label: 'IT', ...defaultInput},
				test1: {id: 'test1', name: 'test1', label: 'IT', ...defaultInput},
				test2: {id: 'test2', name: 'test2', label: 'IT', ...defaultInput},
				test3: {id: 'test3', name: 'test3', label: 'IT', ...defaultInput},
				test4: {id: 'test3', name: 'test3', label: 'IT', ...defaultInput},
			},
		},
		price: {...defaultInput, value: [0, 100]},
		password: defaultInput,
	});

	const updateFormHandler = (name: string, value: any) => {
		console.log('jestem tutaj:!')
		setForm({...form, [name]: value});
	};

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
	};

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
					value={'alphabet'}
					valueChangeHandler={updateFormHandler}
					name='sort'
					id='sort'
					label='Sortowanie'
				/>
				<Select
					options={[
						{value: 'alphabet', label: 'Alfabetycznie'},
						{value: 'increase', label: 'Rosnąco'},
						{value: 'next', label: 'Kolejna'},
					]}
					value={'alphabet'}
					valueChangeHandler={updateFormHandler}
					name='categories'
					id='categories'
					label='Kategorie'
				/>
				<Select
					options={[
						{value: 'alphabet', label: 'Alfabetycznie'},
						{value: 'increase', label: 'Rosnąco'},
						{value: 'next', label: 'Kolejna'},
					]}
					value={'alphabet'}
					valueChangeHandler={updateFormHandler}
					name='skills'
					id='skills'
					label='Umiejętności'
				/>
				<button
					className={styles.more}
					onClick={() => {
						setFiltersModal(true);
					}}>
					Więcej filtrów <FilterSvg />
				</button>
				<button className={styles.clear}>Wyczyść filtry</button>
			</div>
			{filtersModal && (
				<Modal
					closeHandler={() => {
						setFiltersModal(false);
					}}
					title='Więcej filtrów wyszukiwania'>
					<MulitSelect
						name='mentorGroup'
						limit={4}
						classes={styles.select}
						value={form.mentorGroup.value}
						label='Grupa mentorów'
						onValueChange={updateFormHandler}
					/>
					<MulitSelect
						name='timeZone'
						limit={4}
						classes={styles.select}
						value={form.timeZone.value}
						label='Strefa czasowa'
						onValueChange={updateFormHandler}
					/>
					<MulitSelect
						name='languages'
						limit={4}
						classes={styles.select}
						value={form.languages.value}
						label='Język'
						onValueChange={updateFormHandler}
					/>
					<RangeInput
						id='price'
						label='Stawka'
						minValue={0}
						maxValue={100}
						currentMinValue={form.price.value[0]}
						currentMaxValue={form.price.value[1]}
						valueChangeHandler={updateFormHandler}
					/>
					<Button classes={styles.button}>Wyszukaj</Button>
				</Modal>
			)}
		</Container>
	);
};

export default Filters;
