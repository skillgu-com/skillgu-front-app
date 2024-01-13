// Libraries
import React, {useEffect, useState} from 'react';
// Components
import Container from 'src/new-components/Container/Container';
import MentorCard from 'src/new-components/Cards/MentorCard/MentorCard';
import { Title } from 'src/new-components/typography';
import Button from 'src/new-components/Button/Button';
// API
import {getAllMentors} from 'src/services/UserProfileService';
import {getAllFilteredMentors} from 'src/services/MentorViewService';
// Styles
import styles from './MentorsList.module.scss'
// Types
import {Tag} from 'src/types/tags';
import { TitleTag, TitleVariant } from 'src/new-components/typography/Title/Title';

const MENTORS_PLACEHOLDER = [
	{
		userID: 'test',
		fullName: 'Piotr Mazur',
		profileImg:
			'https://cdn.pixabay.com/photo/2023/03/29/19/32/man-7886201_1280.jpg',
		position: 'Product manager key advisor',
		contactOptions: ['Mentoring', 'Praca z zadaniami'],
		reviews: 4.5,
		reviewsAmount: 12,
		companyName: 'Google',
		description:
			'Dzielę się wiedzą, umiejętnościami i/lub doświadczeniem, wspierając tym samym swojego podopiecznego i przyspieszając jego rozwój w danej dziedzinie. Dzielę się wiedzą, umiejętnościami i/lub doświadczeniem, wspierając tym samym swojego podopiecznego i przyspieszając jego rozwój w danej dziedzinie...',
		logoUrl:
			'https://cdn.pixabay.com/photo/2015/10/31/12/54/google-1015751_640.png',
		skills: ['Leadership', 'Resume CV review', 'Strategy Career'],
		price: 230,
		location: 'Warszawa',
		timeZone: 'Poland (- 05:00 UTC)',
		socialMedia: {facebook: '', instagram: ''},
		quickResponder: true,
		categories: ['Przygotowanie CV'],
		languages: ['Polski'],
	},
	{
		userID: 'test 2',
		fullName: 'Piotr Mazur',
		profileImg:
			'https://cdn.pixabay.com/photo/2023/03/29/19/32/man-7886201_1280.jpg',
		position: 'Product manager key advisor',
		contactOptions: ['Mentoring', 'Praca z zadaniami'],
		reviews: 4.5,
		reviewsAmount: 12,
		companyName: 'Google',
		description:
			'Dzielę się wiedzą, umiejętnościami i/lub doświadczeniem, wspierając tym samym swojego podopiecznego i przyspieszając jego rozwój w danej dziedzinie. Dzielę się wiedzą, umiejętnościami i/lub doświadczeniem, wspierając tym samym swojego podopiecznego i przyspieszając jego rozwój w danej dziedzinie...',
		logoUrl:
			'https://cdn.pixabay.com/photo/2015/10/31/12/54/google-1015751_640.png',
		skills: ['Leadership', 'Resume CV review', 'Strategy Career'],
		price: 230,
		location: 'Warszawa',
		timeZone: 'Poland (- 05:00 UTC)',
		socialMedia: {facebook: '', instagram: ''},
		quickResponder: false,
		categories: ['Przygotowanie CV'],
		languages: ['Polski'],
	},
];

const MentorsList = () => {
	const [mentors, setMentors] = useState(MENTORS_PLACEHOLDER);
	const [filteredMentors, setFilteredMentors] = useState([]);

	return (
		<Container as={Tag.Section} classes={styles.wrapper}>
			<Title tag={TitleTag.h2} variant={TitleVariant.standard}>
				Wyniki wyszukiwania
			</Title>
			<div className={styles.mentorsList}>
				{mentors.map((item) => (
					<MentorCard key={item.userID} {...item} />
				))}
			</div>
      <Button classes={styles.loadMore}>Załaduj więcej</Button>
		</Container>
	);
};

export default MentorsList;
