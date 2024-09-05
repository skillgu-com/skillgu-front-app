import React, { useEffect, useRef, useState } from "react";
import { Subscriptions } from "./Subscriptions";
import { useSubscriptionsReducer } from "src/reducers/subscriptions";
import { fetchMentorStudents } from "@services/mentor/fetchMentorStudents.service";
import { SubscriptionStatus } from "@customTypes/subscriptions";
import Pricing from "../pricing/Pricing";
import { SectionTemplate } from "src/components/SectionTemplate";

import styles from "./Subscriptions.module.scss";

const PER_PAGE = 5;

export const MentorSubscriptions = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("Free"); // Default to 'Free'

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
  };
  const sr = useSubscriptionsReducer();
  const pageRef = useRef<number>(0);
  const tabRef = useRef<SubscriptionStatus>("awaiting");

  const { tab, page } = sr.subscriptionsState;

  useEffect(() => {
    const fetchData = async () => {
      sr.setPending(true);
      const data = await fetchMentorStudents({
        take: PER_PAGE,
        skip: PER_PAGE * (page - 1),
        status: tab,
        sortBy: "status",
        sortMethod: "ASC",
      });
      sr.updateRecords({
        total: data.total,
        records: data.students,
        role: "M",
      });
      sr.setPending(false);
    };
    if (
      pageRef.current === 0 ||
      pageRef.current !== page ||
      tabRef.current !== tab
    ) {
      fetchData();
      pageRef.current = page;
      tabRef.current = tab;
    }
  }, [page, sr, tab]);

  return (
    <>
      <Subscriptions
        title="Status subskrypcji Twoich mentee"
        subtitle={
          <>
            Tutaj masz wykaz aktualnie wykupionych przez mentee Subskrypcji, a
            jeżeli chcesz zobaczyć historię swoich transakcji, przejdź do{" "}
            <a href="/payment">Płatnosci.</a>
          </>
        }
      />
      <SectionTemplate
        title="Twoje Plany"
        description={
          <>
            Jeżeli chcesz zobaczyć historię swoich transakcji, przejdź do{" "}
            <a href="/payment"> Stripe.</a>
          </>
        }
        className={styles.sectionPricing}
      >
        <div className={styles.flex}>
          <Pricing
            planTitle="Free"
            price={0}
            values={[
              "Pełny dostęp do aplikacji",
              "Nieograniczona liczba mentee",
              "18% prowizji od spotkania",
              "Brak darmowych spotkań",
            ]}
            selectedPlan={selectedPlan}
            handleSelectPlan={handleSelectPlan}
          />
          <Pricing
            planTitle="Mid"
            price={89}
            values={[
              "5 darmowych spotkań w miesiącu",
              "Gwarancja stałej opłaty miesięcznej",
              "Niższa prowizja: 10%",
              "Pełny dostęp do aplikacji",
              "Nieograniczona liczba mentee",
            ]}
            selectedPlan={selectedPlan}
            handleSelectPlan={handleSelectPlan}
          />
          <Pricing
            selectedPlan={selectedPlan}
            price={190}
            handleSelectPlan={handleSelectPlan}
            planTitle="Pro"
            values={[
              "Darmowe spotkania bez limitu",
              "Gwarancja stałej opłaty miesięcznej",
              "Brak prowizji",
              "Nieograniczona liczba mentee",
            ]}
          />
        </div>
      </SectionTemplate>
    </>
  );
};
