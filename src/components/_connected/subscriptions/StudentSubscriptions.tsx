import React, { useEffect, useRef } from "react";
import { Subscriptions } from "./Subscriptions";
import { useSubscriptionsReducer } from "src/reducers/subscriptions";
import { fetchStudentMentors } from "@services/mentee/fetchStudentMentors.service";
import { SubscriptionStatus } from "@customTypes/subscriptions";

const PER_PAGE = 5;

/*
    Tymczasowo rezygnujemy z tego componentu, nie używamy go w aplikacji
*/
export const StudentSubscriptions = () => {
  const sr = useSubscriptionsReducer();
  const pageRef = useRef<number>(0);
  const tabRef = useRef<SubscriptionStatus>('awaiting');

  const { tab, page } = sr.subscriptionsState;

  useEffect(() => {
    const fetchData = async () => {
      sr.setPending(true);
      const data = await fetchStudentMentors({
        take: PER_PAGE,
        skip: PER_PAGE * (page - 1),
        status: tab,
        sortBy: "status",
        sortMethod: "ASC",
      });
      sr.updateRecords({
        total: data.total,
        records: data.mentors,
        role: "S",
      });
      sr.setPending(false);
    };
    if (pageRef.current === 0 || pageRef.current !== page || tabRef.current !== tab) {
      fetchData();
      pageRef.current = page;
      tabRef.current = tab;
    }
  }, [page, sr, tab]);

  return (
    <Subscriptions
      title="Twoje subskrypcje"
      subtitle={
        <>
          Jeżeli chcesz zobaczyć historię swoich transakcji, przejdź do{" "}
          <a href="/reports">Raportów</a>.
        </>
      }
    />
  );
};
