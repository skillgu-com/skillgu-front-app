// Libraries
import React from 'react';
// Components
import {Title, Text} from 'src/new-components/typography';
import Container from 'src/new-components/Container/Container';
// Sections
import NavSection from './sections/NavSection/NavSection';
import ProfileSection from './sections/ProfileSection/ProfileSection';
// Types
import {Tag} from 'src/types/tags';
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
// Styles
import styles from './HomePage.module.scss';

const HomePage = () => {
	return (
		<>
			<Container as={Tag.Header}>
				<Title tag={TitleTag.h1} variant={TitleVariant.main}>
					Witaj Mentorze!
				</Title>
				<Text>Zarządzaj i sprawdzaj swoje spotkania, zadania, informacje. </Text>
			</Container>
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
			</Container>
		</>
	);
};

export default HomePage;
