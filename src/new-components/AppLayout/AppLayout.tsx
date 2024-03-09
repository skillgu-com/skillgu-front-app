// Libraries
import React from 'react';
// Components
import Navbar from './components/Navbar/Navbar';
import Topbar from './components/Topbar/Topbar';
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
				<Topbar/>
				{children}
			</div>
		</>
	);
};

export default AppLayout;
