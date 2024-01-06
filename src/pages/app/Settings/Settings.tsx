// Libraries
import React from 'react';
// Components
import AppHeader from 'src/new-components/AppHeader/AppHeader';
import Container from 'src/new-components/Container/Container';
// Sections
import DeleteAccount from './sections/DeleteAccount/DeleteAccount';
import Specyfication from './sections/Specyfication/Specyfication';
import ChangePassword from './sections/ChangePassword/ChangePassword';
import YourData from './sections/YourData/YourData';
// Types
import {Tag} from 'src/types/tags';
// Styles
import styles from './Settings.module.scss';

const Settings = () => {
	return (
		<>
			<AppHeader title='Ustawienia użytownika' text='Zarządzaj swoimi danymi.' />
			<Container as={Tag.Main} classes={styles.wrapper}>
				<YourData />
				<Specyfication />
				<ChangePassword />
				<DeleteAccount />
			</Container>
		</>
	);
};

export default Settings;
