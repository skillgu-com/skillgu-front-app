import React from "react";
import {StudentMentors,} from "src/components/_connected";
import Container from "src/components/Container/Container";
import {Tag} from "src/types/tags";
import styles from "./Subscriptions.module.scss";
import {MenteeSubscriptionHistory} from "../../../components/_connected/sessions-history/MenteeSubscriptionHistory";

export const MenteeSubscriptionsPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Container as={Tag.Main}>
        <MenteeSubscriptionHistory
          title="Twoje subskrypcje"
          subtitle={
            <>
              Jeżeli chcesz zobaczyć historię swoich transakcji, przejdź do{" "}
              <a href="/reports">Raportów.</a>
            </>
          }
        />
      </Container>

      <StudentMentors
        title="Twoi aktywni mentorzy"
      />
    </div>
  );
};
