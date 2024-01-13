import React from 'react';
// Components
import MentorCardDescription from './components/MentorCardDescription/MentorCardDescription';
import MentorCardPrice from './components/MentorCardPrice/MentorCardPrice';
import MentorCardProfile from './components/MentorCardProfile/MentorCardProfile';
import Tag from 'src/new-components/Tag/Tag';
import Button, {ButtonTag} from 'src/new-components/Button/Button';
// Styles
import styles from './MentorCard.module.scss'

interface MentorCardProps {
	userID: string;
	fullName: string;
	position: string;
	logoUrl: string;
	companyName: string;
	contactOptions: string[];
	description: string;
	profileImg: string;
	reviews: number;
	reviewsAmount: number;
	skills: string[];
	price: number;
	quickResponder: boolean;
	categories: string[];
	location: string;
	timeZone: string;
	socialMedia: any
	languages: string[]
}

const MentorCard = (props: MentorCardProps) => {
	const {
		userID,
		fullName,
		profileImg,
		position,
		contactOptions,
		reviews,
		reviewsAmount,
		companyName,
		description,
		logoUrl,
		skills,
		price,
		location,
		timeZone,
		quickResponder,
		categories,
		socialMedia
	} = props;

	return (
		<div className={styles.wrapper}>
			<Tag classes={styles.tag} bgColor='#ECF7F2' text='Szybko odpowiada'/>
			<MentorCardProfile
				profileImg={profileImg}
				reviews={reviews}
				reviewsAmount={reviewsAmount}
				location={location}
				timeZone={timeZone}
			/>
			<MentorCardDescription
				fullName={fullName}
				position={position}
				contactOptions={contactOptions}
				descritpion={description}
				skills={skills}
			/>
			<MentorCardPrice price={price} logoUrl={logoUrl} companyName={companyName} />
			<Button as={ButtonTag.InternalLink} href={`/profile/${userID}`} classes={styles.button}>Zobacz profil</Button>
		</div>
	);
};

export default MentorCard;
