// Libraries
import React from 'react';
// Components
import AppHeader from 'src/new-components/AppHeader/AppHeader';
import MentorCard from 'src/new-components/Cards/MentorCard/MentorCard';

const SearchMentors = () => {
	return (
		<>
			<AppHeader
				title='Znajdź mentora'
				text='Przeglądaj profile mentorów i wybierz tego, który spełnia twoje oczekiwania.'
			/>
			<MentorCard
				userID='test'
				fullName='Piotr Mazur'
				profileImg='https://cdn.pixabay.com/photo/2023/03/29/19/32/man-7886201_1280.jpg'
				position='Product manager key advisor'
				contactOptions={['Mentoring', 'Praca z zadaniami']}
				reviews={4.5}
				reviewsAmount={12}
				companyName='Google'
				description='Dzielę się wiedzą, umiejętnościami i/lub doświadczeniem, wspierając tym samym swojego podopiecznego i przyspieszając jego rozwój w danej dziedzinie. Dzielę się wiedzą, umiejętnościami i/lub doświadczeniem, wspierając tym samym swojego podopiecznego i przyspieszając jego rozwój w danej dziedzinie...'
				logoUrl=''
				skills={['Leadership', 'Resume CV review', 'Strategy Career']}
				price={230}
				location='Warszawa'
				timeZone='Poland (- 05:00 UTC)'
				socialMedia={{facebook:'', instagram: ''}}
				quickResponder={true}
				categories={['Przygotowanie CV']}
        languages={['Polski']}
			/>
		</>
	);
};

export default SearchMentors;
