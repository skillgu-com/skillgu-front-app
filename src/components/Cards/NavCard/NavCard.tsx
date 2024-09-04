import React from 'react';
import { Link } from 'react-router-dom';
// Styles
import styles from './NavCard.module.scss';
import Arrow from '@icons/Arrow';

interface NavCardProps {
    link: string;
    title: string;
    text: React.ReactNode;
    icon: React.ReactNode;
    disabled?: boolean;
}

const NavCard = (props: NavCardProps) => {
    const { link, icon, title, text, disabled } = props;

    if (disabled) {
        return (
            <div className={`${styles.card} ${styles.disabled}`}>
                <span className={styles.cardIcon}>{icon}</span>
                <span className={styles.cardTitle}>
                    <span>{title}</span>
                    <Arrow />
                </span>
                <span className={styles.cardText}>{text}</span>
                <span className={styles.tooltip}>Chat będzie dostępny wkrótce</span> {/* Tooltip */}
            </div>
        );
    }

    return (
        <Link to={link} className={styles.card}>
            <span className={styles.cardIcon}>{icon}</span>
            <span className={styles.cardTitle}>
                <span>{title}</span>
                <Arrow />
            </span>
            <span className={styles.cardText}>{text}</span>
        </Link>
    );
};

export default NavCard;
