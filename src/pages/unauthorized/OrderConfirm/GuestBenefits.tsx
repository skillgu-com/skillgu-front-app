import React from "react";
import clx from 'classnames'
import { ListStyleArtistIcon } from "@icons/ListStyleArtistIcon";
import Button from "src/components/Button/Button";

import styles from "./OrderConfirm.module.scss";

import paths from "src/paths";

const GuestBenefits: React.FC = () => (
  <div className={clx(styles.box, styles.quest)}>
    <p className={styles.title}>Zakładając konto zyskujesz wiele korzyści!</p>
    <ul className={styles.list}>
      <li className={styles.listItem}>
        <div className={styles.listIconBox}>
          <ListStyleArtistIcon />
        </div>
        <p>Dostęp do kalendarza wszystkich spotkań</p>
      </li>
      <li className={styles.listItem}>
        <div className={styles.listIconBox}>
          <ListStyleArtistIcon />
        </div>
        <p>System przypomnień i powiadomień</p>
      </li>
      <li className={styles.listItem}>
        <div className={styles.listIconBox}>
          <ListStyleArtistIcon />
        </div>
        <p>Bezpośredni kontakt z mentorami</p>
      </li>
      <li className={styles.listItem}>
        <div className={styles.listIconBox}>
          <ListStyleArtistIcon />
        </div>
        <p>Możliwość zapisania się na regularne sesje mentoringowe</p>
      </li>
    </ul>
    <Button href={paths.registerMentee} classes={styles.btn}>
      Stwórz konto
    </Button>
  </div>
);

export default GuestBenefits;
