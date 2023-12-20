// Libraries
import React from 'react';
import {Link} from 'react-router-dom';
// Components
import Container from '../../new-components/Container/Container';
import {Title} from '../../new-components/typography/index';
// Icons
import SkillGuru from '../../assets/icons/SkillGuru';
// Types
import {
	TitleTag,
	TitleVariant,
} from '../../new-components/typography/Title/Title';
import {Tag} from '../../types/tags';
import {Common} from '../../types/main';
// Styles
import styles from './JoinScreen.module.scss';

interface JoinScreenProps extends Common {
	title: string;
	formContent: React.ReactNode;
	redirect: {link: string; text: string};
}

const JoinScreen = (props: JoinScreenProps) => {
	const {title, formContent, redirect, children} = props;

	return (
		<Container as={Tag.Main} classes={styles.wrapper}>
			<aside className={styles.logo}>
				<SkillGuru />
			</aside>
			<section className={styles.formWrapper}>
				<div className={styles.form}>
					<Title tag={TitleTag.h1} variant={TitleVariant.section}>
						{title}
					</Title>
					{formContent}
					<div className={styles.inline}>
						<Link to={redirect.link}>{redirect.text}</Link>
						<Link to='/policy'>Warunki umowy i współpracy</Link>
					</div>
				</div>
				{children}
			</section>
		</Container>
	);
};

export default JoinScreen;
