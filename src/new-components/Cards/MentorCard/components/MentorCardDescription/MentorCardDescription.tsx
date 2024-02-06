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
import {Common} from 'src/types/main';
import classNames from 'classnames';

interface MentorCardDescriptionProps extends Common {
	userID: number;
	fullName: string;
	jobPosition: {id: number; name: string}[];
	services: {id: number; name: string}[];
	description: string;
	skills: {id: number; name: string}[];
	isExtended?: boolean;
	categories?: {id: number; name: string}[];
	languages?: string[];
	socialMedia?: {
		linkedInURL?: string;
		youtubeURL?: string;
		instagramURL?: string;
		facebookURL?: string;
		websiteURL?: string;
		youtube?: string;
	};
}

const MentorCardDescription = (props: MentorCardDescriptionProps) => {
	const {
		userID,
		fullName,
		jobPosition,
		services,
		description,
		skills,
		isExtended,
		categories,
		languages,
		socialMedia,
		classes
	} = props;

	return (
		<div className={classNames(styles.wrapper, classes)} data-is-extended={isExtended}>
			<Title
				tag={TitleTag.h3}
				variant={TitleVariant.standard}
				classes={styles.userName}>
				{fullName}
				<small>
					{jobPosition?.map((element, index) => element.name).join(', ')}
				</small>
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
					<Tag key={skill.id + index} name={skill.name} bgColor='#EFF4F9' />
				))}
			</ul>
			{isExtended && categories && (
				<>
					<Title
						tag={TitleTag.h4}
						variant={TitleVariant.standard}
						classes={styles.smallTitle}>
						Kategorie:
					</Title>
					<ul className={styles.skills}>
						{categories?.map((category, index) => (
							<Tag key={category.id + index} name={category.name} bgColor='#EFF4F9' />
						))}
					</ul>
				</>
			)}
			{isExtended && languages && (
				<>
					<Title
						tag={TitleTag.h4}
						variant={TitleVariant.standard}
						classes={styles.smallTitle}>
						Języki:
					</Title>
					<ul className={styles.skills}>
						{languages?.map((language) => (
							<Tag key={language} name={language} bgColor='#EFF4F9' />
						))}
					</ul>
				</>
			)}
			{isExtended && !socialMedia && (
				<div className={socialMedia}>Social media</div>
			)}
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
