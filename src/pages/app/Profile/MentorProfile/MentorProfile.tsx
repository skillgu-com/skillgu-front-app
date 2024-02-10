// Libraries
import React from 'react';
// Components
import MentorCardProfile, {
	MentorCardProfileProps,
} from 'src/new-components/Cards/MentorCard/components/MentorCardProfile/MentorCardProfile';
import Tag from 'src/new-components/Tag/Tag';
// Styles
import styles from './MentorProfile.module.scss';

interface MentorProfileProps {
	quickResponse?: boolean;
	cardProfile: MentorCardProfileProps;
	fullName: string;
	position: string;
	services: {id: number; name: string}[];
}

const MentorProfile = (props: MentorProfileProps) => {
	const {cardProfile, fullName, position, services, quickResponse} = props;

	return (
		<div className={styles.wrapper}>
			{quickResponse && (
				<Tag name='Szybko odpowiada' bgColor='#ECF7F2' classes={styles.tag} />
			)}
			<MentorCardProfile {...cardProfile} />
			<h2 className={styles.userName}>{fullName}</h2>
			<h3 className={styles.userPosition}>{position}</h3>
			<ul className={styles.userScope}>
				{services.map(({id, name}) => (
					<li key={id}>{name}</li>
				))}
			</ul>
		</div>
	);
};

export default MentorProfile;
