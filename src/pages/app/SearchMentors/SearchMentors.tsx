// Libraries
import React from 'react';
// Components
import AppHeader from 'src/new-components/AppHeader/AppHeader';
// Components
import MentorsList from './sections/MentorsList/MentorsList';
import Filters from './sections/Filters/Filters';

const SearchMentors = () => {
	return (
		<>
			<AppHeader
				title='Znajdź mentora '
				text='Przeglądaj profile mentorów i wybierz tego, który spełnia twoje oczekiwania.'
			/>
			<Filters />
			<MentorsList />
		</>
	);
};

export default SearchMentors;
