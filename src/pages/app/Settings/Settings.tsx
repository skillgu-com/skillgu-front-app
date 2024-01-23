// Libraries
import React from 'react';
// Components
import AppHeader from 'src/new-components/AppHeader/AppHeader';
import Container from 'src/new-components/Container/Container';
// Hooks
import {useAccountType} from 'src/hooks/useAccountType';
// Sections
import DeleteAccount from './sections/DeleteAccount/DeleteAccount';
import Specification from './sections/Specyfication/Specification';
import ChangePassword from './sections/ChangePassword/ChangePassword';
import YourData from './sections/YourData/YourData';
// Types
import {Tag} from 'src/types/tags';
// Styles
import styles from './Settings.module.scss';

const Settings = () => {
	const {isMentor} = useAccountType();

	return (
		<>
			<AppHeader title='Ustawienia użytownika' text='Zarządzaj swoimi danymi.' />
			<Container as={Tag.Main} classes={styles.wrapper}>
				<YourData />
				{isMentor && <Specification />}
				<ChangePassword />
				<DeleteAccount />
			</Container>
		</>
	);
};
export default Settings;
