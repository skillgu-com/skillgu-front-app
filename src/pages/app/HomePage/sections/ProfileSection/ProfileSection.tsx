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
import Tag from 'src/new-components/Tag/Tag';

interface ProfileSectionProps {
	usersList: MiniUserCardProps[];
}

const ProfileSection = (props: ProfileSectionProps) => {
	const {usersList} = props;

	return (
		<section className={styles.wrapper}>
			<div className={styles.user}>
				<div className={styles.userProfile}>
					<img
						src='https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg'
						alt='Jan Kowalski'
					/>
				</div>
				<Title
					classes={styles.userName}
					tag={TitleTag.h2}
					variant={TitleVariant.standard}>
					Jan Kowalski
				</Title>
				<h3 className={styles.userPosition}>UI/UX Design</h3>
				<div className={styles.userAttributes}>
					<h4 className={styles.userAttributesItem}>
						17<small>Sesji</small>
					</h4>
					<h4 className={styles.userAttributesItem}>
						180 zł<small>Stawka godz.</small>
					</h4>
					<h4 className={styles.userAttributesItem}>
						8/10<small>Ocena</small>
					</h4>
				</div>
			</div>
			<Title tag={TitleTag.h2} variant={TitleVariant.standard}>
				Proponowani Mentorzy
			</Title>
			<div className={styles.list}>
				{usersList.map((user) => (
					<MiniUserCard {...user} key={user.id} />
				))}
			</div>
			<Title tag={TitleTag.h2} variant={TitleVariant.standard}>
				Tagi
			</Title>
			<div className={styles.tags}>
				<Tag text='Mobile App' />
				<Tag text='Landing Page' />
			</div>
		</section>
	);
};

export default ProfileSection;
