// Libraries
import React from 'react';
// Components
import {Title} from 'src/new-components/typography';
import MiniUserCard from 'src/new-components/Cards/MiniUserCard/MiniUserCard';
// Types
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
import {MiniUserCardProps} from 'src/new-components/Cards/MiniUserCard/MiniUserCard';
// Styles
import styles from './ProfileSection.module.scss';

interface ProfileSectionProps {
	usersList: MiniUserCardProps[];
}

const ProfileSection = (props: ProfileSectionProps) => {
	const {usersList} = props;

	return (
		<section className={styles.wrapper}>
			<Title tag={TitleTag.h2} variant={TitleVariant.standard}>
				Proponowani Mentorzy
			</Title>
			<div className={styles.list}>
				{usersList.map((user) => (
					<MiniUserCard {...user} key={user.id} />
				))}
			</div>
		</section>
	);
};

export default ProfileSection;
