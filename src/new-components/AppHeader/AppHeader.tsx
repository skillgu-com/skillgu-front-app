// Libraires
import React from 'react';
// Components
import Container from '../Container/Container';
import {Title, Text} from '../typography';
// Types
import {TitleTag, TitleVariant} from '../typography/Title/Title';
import {Tag} from 'src/types/tags';
// Styles
import styles from './AppHeader.module.scss';
import {Common} from 'src/types/main';

interface AppHeaderProps extends Common {
	title: string;
	text: string;
}

const AppHeader = (props: AppHeaderProps) => {
	const {title, text} = props;

	return (
		<Container as={Tag.Header} classes={styles.header}>
			<Title tag={TitleTag.h1} variant={TitleVariant.main}>
				{title}
			</Title>
			<Text>{text}</Text>
		</Container>
	);
};

export default AppHeader;
