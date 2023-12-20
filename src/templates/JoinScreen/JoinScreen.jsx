// Librarie
import React from 'react';
// Components
// Styles
import styles from './JoinScreen.module.scss';

const JoinScreen = (props) => {
	const {children} = props;

	return (
		<main>
			<aside></aside>
			<section>{children}</section>
		</main>
	);
};

export default JoinScreen;
