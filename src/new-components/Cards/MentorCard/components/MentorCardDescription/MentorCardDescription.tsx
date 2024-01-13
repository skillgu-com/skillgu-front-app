// Libraries
import React from 'react';
// Components
import {Title, Text} from 'src/new-components/typography';
import Tag from 'src/new-components/Tag/Tag';
// Styles
import styles from './MentorCardDescription.module.scss';
// Types
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';

interface MentorCardDescriptionProps {
	fullName: string;
	position: string;
	contactOptions: string[];
	descritpion: string;
	skills: string[];
}

const MentorCardDescription = (props: MentorCardDescriptionProps) => {
	const {fullName, position, contactOptions, descritpion, skills} = props;

	return (
		<div className={styles.wrapper}>
			<Title
				tag={TitleTag.h3}
				variant={TitleVariant.standard}
				classes={styles.userName}>
				{fullName}
				<small>{position}</small>
			</Title>
			<ul className={styles.contact}>
				{contactOptions.map((option, index) => (
					<li key={option.slice(0, 3) + index}>{option}</li>
				))}
			</ul>
			<Title
				tag={TitleTag.h4}
				variant={TitleVariant.standard}
				classes={styles.smallTitle}>
				Opis
			</Title>
			<Text classes={styles.smallText}>{descritpion}</Text>
			<Title
				tag={TitleTag.h4}
				variant={TitleVariant.standard}
				classes={styles.smallTitle}>
				Umiejętności:
			</Title>
			<ul className={styles.skills}>
				{skills.map((skill, index) => (
					<Tag key={skill.slice(0, 3) + index} text={skill} bgColor='#EFF4F9' />
				))}
			</ul>
		</div>
	);
};

export default MentorCardDescription;
