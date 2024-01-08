// Libraries
import React from 'react';
import {useSelector} from 'react-redux';
// Components
import AppHeader from 'src/new-components/AppHeader/AppHeader';
import Container from 'src/new-components/Container/Container';
// Selectors
import {getRole} from 'src/redux/selectors/authSelectors';
// Sections
import NavSection from './sections/NavSection/NavSection';
import ProfileSection from './sections/ProfileSection/ProfileSection';
import ListSection from './sections/ListSection/ListSection';
// Types
import {Tag} from 'src/types/tags';
// Styles
import styles from './HomePage.module.scss';

const HomePage = () => {
	const role = useSelector(getRole);

	return (
		<>
			<AppHeader
				title={role === 'M' ? 'Witaj Mentorze!' : 'Witaj Studencie!'}
				text='Zarządzaj i sprawdzaj swoje spotkania, zadania, informacje.'
			/>
			<Container as={Tag.Main} classes={styles.wrapper}>
				<NavSection />
				<ProfileSection />
				<ListSection />
			</Container>
		</>
	);
};

export default HomePage;
