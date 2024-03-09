import React from 'react';
// Container
import Container from '@newComponents/Container/Container';
import Notifications from '../Notifications/Notifications';
// Types
import {Tag} from '@customTypes/tags';
// Styles
import styles from './Topbar.module.scss';
import {useSelector} from 'react-redux';

const Topbar = () => {
	const email = useSelector((state: any) => state.auth?.user?.email);

	return (
		<Container as={Tag.Aside} classes={styles.wrapper}>
			<div className={styles.profile}>
				<div className={styles.profileImage}>
					<img src='https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg' alt={email} />
				</div>
				<span>{email}</span>
			</div>
			<Notifications />
		</Container>
	);
};

export default Topbar;
