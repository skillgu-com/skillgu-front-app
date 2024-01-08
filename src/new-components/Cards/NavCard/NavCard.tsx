// Libraries
import React from 'react';
import {Link} from 'react-router-dom';
// Styles
import styles from './NavCard.module.scss'

interface NavCardProps {
	link: string;
	text: React.ReactNode;
	icon: React.ReactNode;
}

const NavCard = (props: NavCardProps) => {
  const {link, icon, text} = props

	return <Link to={link} className={styles.card}>
    <span className={styles.cardIcon}>{icon}</span>
    <span className={styles.cardTitle}>{text}</span>
  </Link>;
};

export default NavCard;
