// Libraries
import React, {FormEvent, useEffect, useState} from 'react';
// Components
import Container from 'src/new-components/Container/Container';
import MentorCard from 'src/new-components/Cards/MentorCard/MentorCard';
import {Title} from 'src/new-components/typography';
import Button from 'src/new-components/Button/Button';
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

const Filters = () => {
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
					valueChangeHandler={() => {}}
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
					valueChangeHandler={() => {}}
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
					valueChangeHandler={() => {}}
					name='skills'
					id='skills'
					label='Umiejętności'
				/>
				<button className={styles.more}>
					Więcej filtrów <FilterSvg />
				</button>
				<button className={styles.clear}>Wyczyść filtry</button>
			</div>
		</Container>
	);
};

export default Filters;
