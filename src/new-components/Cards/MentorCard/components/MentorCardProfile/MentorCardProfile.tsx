// Libraries
import React from 'react';
// Components
import {Text} from 'src/new-components/typography';
// Assets
import StarSvg from 'src/assets/icons/StarSvg';
import PinSvg from 'src/assets/icons/PinSvg';
// Styles
import styles from './MentorCardProfile.module.scss';

export interface MentorCardProfileProps {
	profileImg: string;
	reviews?: number;
	reviewsAmount?: number;
	location?: string;
	timeZone?: string;
}

const MentorCardProfile = (props: MentorCardProfileProps) => {
	const {profileImg, reviews, reviewsAmount, location, timeZone} = props;

	return (
		<div className={styles.wrapper}>
			<div className={styles.image}>
				<img src={profileImg} alt='Zdjęcie profilowe' />
			</div>
			<Text classes={styles.rating}>
				<StarSvg />
				<strong>{reviews}/5</strong> <small>({reviewsAmount} ocen)</small>
			</Text>
			<Text classes={styles.location}><PinSvg/>{location}</Text>
			<Text classes={styles.timeZone}>{timeZone}</Text>
		</div>
	);
};

export default MentorCardProfile;
