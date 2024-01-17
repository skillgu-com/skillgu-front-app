// Libraries
import React, {useEffect, useState} from 'react';
// Components
import AppHeader from 'src/new-components/AppHeader/AppHeader';
// Components
import MentorsList from './sections/MentorsList/MentorsList';
import Filters from './sections/Filters/Filters';
// API
import {getAllMentors} from 'src/services/UserProfileService';
import {getAllFilteredMentors} from 'src/services/MentorViewService';
// Types
import {Tag} from 'src/types/tags';
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';

const SearchMentors = () => {
	let [selectedCategory, setSelectedCategory] = useState('');
	let [filterCriteria, setFilters] = useState({
		category: '',
		skill: '',
		sessionType: '',
		mentorType: '',
	});

	// useEffect(() => {
	// 		getAllMentors()
	// 				.then((response) => {
	// 						setMentors(response.data);
	// 						setFilteredMentors(response.data);
	// 				})
	// 				.catch((error) => {
	// 						throw new Error(error.message);
	// 				});
	// }, []);

	// useEffect(() => {
	// 		const filtered = mentors.filter((mentor: any) =>
	// 				selectedCategory === '' || mentor.category.includes(selectedCategory)
	// 		);
	// 		setFilteredMentors(filtered);
	// }, [selectedCategory, mentors]);

	// useEffect(() => {
	// 		const user = {
	// 				skill: filterCriteria.skill,
	// 				category: filterCriteria.category,
	// 				sessionType: filterCriteria.sessionType,
	// 				mentorType: filterCriteria?.mentorType,
	// 		};
	// 		getAllFilteredMentors(user)
	// 				.then((response) => {
	// 						setMentors(response.data); // aktualizacja mentorów z przefiltrowanymi danymi
	// 						setFilteredMentors(response.data); // aktualizacja przefiltrowanych mentorów
	// 				})
	// 				.catch((error) => {
	// 						throw new Error(error.message);
	// 				});
	// }, [filterCriteria]); // nasłuchiwanie zmian w filterCriteria

	// const handleFilterChange = (element: any) => {
	// 		setFilters(prevFilters => ({...prevFilters, ...element}));
	// };

	return (
		<>
			<AppHeader
				title='Znajdź mentora'
				text='Przeglądaj profile mentorów i wybierz tego, który spełnia twoje oczekiwania.'
			/>
			<Filters />
			<MentorsList />
		</>
	);
};

export default SearchMentors;
