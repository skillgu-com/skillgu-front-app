// Libraries
import React from 'react';
// Components
import MentorProfile from './MentorProfile/MentorProfile';
import Container from 'src/new-components/Container/Container';
import MentorCardPrice from 'src/new-components/Cards/MentorCard/components/MentorCardPrice/MentorCardPrice';
import MentorCard from 'src/new-components/Cards/MentorCard/MentorCard';
// Types
import {Tag} from 'src/types/tags';
import MentorCardDescription from 'src/new-components/Cards/MentorCard/components/MentorCardDescription/MentorCardDescription';
// Styles
import styles from './Profile.module.scss';

const Profile = () => {
	return (
		<Container as={Tag.Section}>
			<MentorProfile
				cardProfile={{
					profileImg:
						'https://cdn.pixabay.com/photo/2023/10/24/21/15/nature-8339115_1280.jpg',
					reviews: 2,
					reviewsAmount: 3,
					location: 'Poznań',
					timeZone: 'Poland (- 05:00 UTC)',
				}}
				fullName='Piotr Mazur'
				position='Product manager key advisor'
				services={[
					{id: 1, name: 'Mentoring'},
					{id: 2, name: 'Praca z zadaniami'},
					{id: 3, name: 'Weekandowe spotkania'},
					{id: 4, name: 'Intensywna praca'},
				]}
			/>
			<div className={styles.mobileDescription}>
				<MentorCardDescription
					classes={styles.mobileDescriptionText}
					userID={1}
					fullName='Piotr Mazur'
					jobPosition={[{id: 1, name: 'Product manager key advisor'}]}
					services={[
						{id: 1, name: 'Mentoring'},
						{id: 2, name: 'Praca z zadaniami'},
						{id: 3, name: 'Weekandowe spotkania'},
						{id: 4, name: 'Intensywna praca'},
					]}
					description='Dzielę się wiedzą, umiejętnościami i/lub doświadczeniem, wspierając tym samym swojego podopiecznego i przyspieszając jego rozwój w danej dziedzinie. Dzielę się wiedzą, umiejętnościami i/lub doświadczeniem, wspierając tym samym swojego podopiecznego i przyspieszając jego rozwój w danej dziedzinie...'
					skills={[{id: 1, name: 'Test'}]}
					isExtended={true}
					categories={[{id: 1, name: 'Test'}]}
					languages={['Polish']}
					socialMedia={{}}
				/>
				<MentorCardPrice price={350} logoUrl='https://cdn.pixabay.com/photo/2015/10/31/12/54/google-1015751_1280.png' companyName='Google' />
			</div>
			<MentorCard
				profileImg='https://cdn.pixabay.com/photo/2023/10/24/21/15/nature-8339115_1280.jpg'
				logoUrl=''
				companyName=''
				reviews={2}
				reviewsAmount={3}
				location='Poznań'
				timeZone='Poland (- 05:00 UTC)'
				services={[
					{id: 1, name: 'Mentoring'},
					{id: 2, name: 'Praca z zadaniami'},
					{id: 3, name: 'Weekandowe spotkania'},
					{id: 4, name: 'Intensywna praca'},
				]}
				userID={1}
				quickResponder={true}
				firstName='Piotr'
				lastName='Mazur'
				jobPosition={[{id: 1, name: 'Product manager key advisor'}]}
				description='Dzielę się wiedzą, umiejętnościami i/lub doświadczeniem, wspierając tym samym swojego podopiecznego i przyspieszając jego rozwój w danej dziedzinie. Dzielę się wiedzą, umiejętnościami i/lub doświadczeniem, wspierając tym samym swojego podopiecznego i przyspieszając jego rozwój w danej dziedzinie...'
				skill={[{id: 1, name: 'Test'}]}
				isExtended={true}
				categories={[{id: 1, name: 'Test'}]}
				languages={['Polish']}
				socialMedia={{}}
			/>
		</Container>
	);
};

export default Profile;
