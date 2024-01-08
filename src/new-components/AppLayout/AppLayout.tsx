// Libraries
import React from 'react';
// Components
import Navbar from './components/Navbar/Navbar';
import Notifications from './components/Notifications/Notifications';
// Types
import {Common} from '../../types/main';
// Styles
import styles from './AppLayout.module.scss';

const AppLayout = (props: Common) => {
	const {children} = props;
	return (
		<>
			<Navbar />
			<div className={styles.content}>
				<Notifications />
				{children}
			</div>
		</>
	);
};

export default AppLayout;
