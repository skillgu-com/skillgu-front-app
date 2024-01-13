// Libraries
import React from 'react';
// Components
import { Title } from 'src/new-components/typography';
// Styles
import styles from './MentorCardPrice.module.scss'
// Types
import { TitleTag, TitleVariant } from 'src/new-components/typography/Title/Title';
interface MentorCardPriceProps {
	price: number;
	logoUrl: string;
	companyName: string;
}

const MentorCardPrice = (props: MentorCardPriceProps) => {
	const {price, logoUrl, companyName} = props;

	return (
		<div className={styles.wrapper}>
			<div className={styles.logo}>
				<img src={logoUrl} alt={companyName} />
			</div>
			<Title classes={styles.price} tag={TitleTag.h4} variant={TitleVariant.standard}>
				od <strong>{price}</strong>zł
			</Title>
		</div>
	);
};

export default MentorCardPrice;
