import React from "react";
import {ListStyleArtistIcon} from "@icons/ListStyleArtistIcon";
import Button from "src/components/Button/Button";

import styles from "./OrderConfirm.module.scss";

import paths from "src/paths";

const GuestBenefits: React.FC = () => (
    <div className={styles.box}>
        <p className={styles.title}>Zakładając konto zyskujesz wiele korzyści!</p>
        <ul className={styles.list}>
            <li className={styles.listItem}>
                <ListStyleArtistIcon />
                <p>Dostęp do kalendarza wszystkich spotkań</p>
            </li>
            <li className={styles.listItem}>
                <ListStyleArtistIcon />
                <p>System przypomnień i powiadomień</p>
            </li>
            <li className={styles.listItem}>
                <ListStyleArtistIcon />
                <p>Bezpośredni kontakt z mentorami</p>
            </li>
            <li className={styles.listItem}>
                <ListStyleArtistIcon />
                <p>Możliwość zapisania się na regularne sesje mentoringowe</p>
            </li>
        </ul>
        <Button href={paths.registerMentee} classes={styles.btn}>
            Stwórz konto
        </Button>
    </div>
);

export default GuestBenefits;
