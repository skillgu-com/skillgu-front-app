// Libraries
import React from 'react';
// Components
import {Title, Text} from 'src/new-components/typography';
import Tag from 'src/new-components/Tag/Tag';
import Button, {ButtonTag} from 'src/new-components/Button/Button';
// Styles
import styles from './MentorCardDescription.module.scss';
// Types
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
interface mentorSkill {
	id: number;
	name: string;
}

interface MentorCardDescriptionProps {

	userID: number;
	fullName: string;
	jobPosition: string;
	services: { id: number; name: string }[];
	description: string;
	skills: { id: number; name: string }[];
}

const MentorCardDescription = (props: MentorCardDescriptionProps) => {
	const {userID, fullName, jobPosition, services, description, skills} =
		props;




	return (
		<div className={styles.wrapper}>
			<Title
				tag={TitleTag.h3}
				variant={TitleVariant.standard}
				classes={styles.userName}>
				{fullName}
				<small>{jobPosition}</small>
			</Title>
			<ul className={styles.contact}>
				{services?.map((element, index) => (
					<li key={element.id + index}>{element.name}</li>
				))}
			</ul>
			<Title
				tag={TitleTag.h4}
				variant={TitleVariant.standard}
				classes={styles.smallTitle}>
				Opis
			</Title>
			<Text classes={styles.smallText}>{description}</Text>
			<Title
				tag={TitleTag.h4}
				variant={TitleVariant.standard}
				classes={styles.smallTitle}>
				Umiejętności:
			</Title>
			<ul className={styles.skills}>
				{skills?.map((skill, index) => (
					<Tag key={skill.id + index} text={skill.name} bgColor='#EFF4F9' />
				))}
			</ul>
			<Button
				as={ButtonTag.InternalLink}
				href={`/profile/${userID}`}
				classes={styles.button}>
				Zobacz profil
			</Button>
		</div>
	);
};

export default MentorCardDescription;
