import React from 'react';
// Components
import Container from '@newComponents/Container/Container';
import {Title, Text} from '@newComponents/typography';
import Button, {ButtonTag, ButtonVariant} from '@newComponents/Button/Button';
// Icons
import Schedules from '@icons/Schedules';
import Add from '@icons/Add';
// Types
import {Tag} from 'src/types/tags';
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
// Styles
import styles from './Empty.module.scss';
import classNames from 'classnames';

interface EmptyProps {
	title?: string;
	text: string;
	icon?: React.ReactNode;
	button: {
		text: string;
		link: string;
	};
}

const Empty = (props: EmptyProps) => {
	const {
		title,
		text,
		button: {text: buttonText, link},
		icon,
	} = props;

	return (
		<Container
			as={Tag.Section}
			classes={classNames(styles.wrapper, {[styles.wrapperNoTitle]: !!!title})}>
			{title && (
				<Title
					classes={styles.header}
					tag={TitleTag.h1}
					variant={TitleVariant.section}>
					{title}
				</Title>
			)}
			{icon ?? <Schedules />}
			<Text classes={styles.text}>{text}</Text>
			<Button
				as={ButtonTag.InternalLink}
				variant={ButtonVariant.Outline}
				href={link}
				classes={styles.button}>
				{buttonText} <Add />
			</Button>
		</Container>
	);
};

export default Empty;
