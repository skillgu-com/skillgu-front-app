import React from 'react';
// Components
import Container from '@newComponents/Container/Container';
import {Title, Text} from '@newComponents/typography';
import Button, {
	ButtonTag,
	ButtonVariant,
} from '@newComponents/Button/Button';
// Icons
import Schedules from 'src/assets/icons/Schedules';
// Types
import {Tag} from 'src/types/tags';
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
// Styles
import styles from './EmptySchedules.module.scss'

const EmptySchedules = () => {
	return (
		<Container as={Tag.Section} classes={styles.wrapper}>
			<Title classes={styles.header} tag={TitleTag.h1} variant={TitleVariant.section}>
				Harmonogram spotkań
			</Title>
			<Schedules />
			<Text>Aby dodać sesję, najpierw ustal choć 1 harmonogram</Text>
			<Button
				as={ButtonTag.InternalLink}
				variant={ButtonVariant.Outline}
				href='/schedules/add-schedule'>
				Nowy harmonogram
			</Button>
		</Container>
	);
};

export default EmptySchedules;
