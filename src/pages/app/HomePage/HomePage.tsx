// Libraries
import React from 'react';
// Components
import AppHeader from 'src/new-components/AppHeader/AppHeader';
import Container from 'src/new-components/Container/Container';
// Sections
import NavSection from './sections/NavSection/NavSection';
import ProfileSection from './sections/ProfileSection/ProfileSection';
import ListSection from './sections/ListSection/ListSection';
// Types
import {Tag} from 'src/types/tags';
// Styles
import styles from './HomePage.module.scss';

const HomePage = () => {
	return (
		<>
			<AppHeader
				title='Witaj Mentorze!'
				text='Zarządzaj i sprawdzaj swoje spotkania, zadania, informacje.'
			/>
			<Container as={Tag.Main} classes={styles.wrapper}>
				<NavSection />
				<ProfileSection
					usersList={[
						{
							id: 'test',
							name: 'Product manager key advisor',
							link: '/',
							image:
								'https://cdn.pixabay.com/photo/2023/12/08/07/27/woman-8437007_640.jpg',
						},
						{
							id: 'test 2',
							name: 'Product manager key advisor',
							link: '/',
							image:
								'https://cdn.pixabay.com/photo/2023/12/08/07/27/woman-8437007_640.jpg',
						},
						{
							id: 'test 3',
							name: 'Product manager key advisor',
							link: '/',
							image:
								'https://cdn.pixabay.com/photo/2023/12/08/07/27/woman-8437007_640.jpg',
						},
					]}
				/>
				<ListSection />
			</Container>
		</>
	);
};

export default HomePage;
