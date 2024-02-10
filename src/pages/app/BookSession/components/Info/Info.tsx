import React from 'react';
// Components
import MentorProfile from 'src/pages/app/Profile/MentorProfile/MentorProfile';
import PlanScope from 'src/new-components/PlanScope/PlanScope';
// Styles
import styles from './Info.module.scss';

interface InfoProps {
	fullName: string;
	position: string;
	imageUrl: string;
	sessionTitle: string;
	price: number;
	time: number;
	descripiton: string;
}

const Info = (props: InfoProps) => {
	const {fullName, position, imageUrl, sessionTitle, price, time, descripiton} =
		props;

	return (
		<section className={styles.wrapper}>
			<div className={styles.profile}>
				<img src={imageUrl} alt={fullName} />
			</div>
			<h3 className={styles.name}>{fullName}</h3>
			<h4 className={styles.position}>{position}</h4>
			<div className={styles.details}>
				<h5 className={styles.sessionTitle}>{sessionTitle}</h5>
				<p className={styles.time}>{time} minut</p>
				<p className={styles.payment}>Do zapłaty</p>
				<p className={styles.price}>
					{price} <span>zł</span> <small>z VAT</small>
				</p>
			</div>
			<PlanScope title='Opis sesji:' elements={descripiton} />
		</section>
	);
};

export default Info;
