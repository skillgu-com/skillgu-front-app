import React from "react";
import { StudentMentors } from "src/components/_connected";
import { MenteeSubscriptionHistory } from "../../../components/_connected/sessions-history/MenteeSubscriptionHistory";

export const MenteeSubscriptionsPage = () => {
  return (
    <main>
      <MenteeSubscriptionHistory
        title="Twoje subskrypcje"
        subtitle={
          <>
            Jeżeli chcesz zobaczyć historię swoich transakcji, przejdź do{" "}
            <a href="/reports">Raportów.</a>
          </>
        }
      />
      <StudentMentors title="Twoi aktywni mentorzy" />
    </main>
  );
};
