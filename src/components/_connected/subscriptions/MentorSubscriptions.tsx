import React, { useEffect, useRef, useState } from "react";
import { Subscriptions } from "./Subscriptions";
import { useSubscriptionsReducer } from "src/reducers/subscriptions";
import { fetchMentorStudents } from "@services/mentor/fetchMentorStudents.service";
import { SubscriptionStatus } from "@customTypes/subscriptions";
import { SectionTemplate } from "src/components/SectionTemplate";
import Modal from "src/components/Modal/Modal";
import styles from "./Subscriptions.module.scss";
import {
  cancelMentorSubscription,
  fetchCurrentSubscription,
  fetchMentorPlan,
  updateMentorPlan,
} from "@services/subscription/mentorSubscription.service";
import Button, { ButtonTag, ButtonVariant } from "src/components/Button/Button";
import { Pricing } from "../pricing/Pricing";
import { Basic } from "@icons/Basic";
import { Pro } from "@icons/Pro";
import { MentorPaymentSubscription } from "../../../pages/app/MentorPaymentSubscription/elements/MentorPaymentSubscription";

const PER_PAGE = 5;

export const MentorSubscriptions = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("Free");
  const [canChangePlan, setCanChangePlan] = useState<boolean>(true);
  const [suspendingPlan, setSuspendingPlan] = useState<string | null>(null);
  const [isCancelingPlan, setIsCancelingPlan] = useState<boolean>(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);

  const sr = useSubscriptionsReducer();
  const pageRef = useRef<number>(0);
  const tabRef = useRef<SubscriptionStatus>("awaiting");

  const { tab, page } = sr.subscriptionsState;

  useEffect(() => {
    const getMentorPlan = async () => {
      try {
        const { plan, canChangePlan } = await fetchMentorPlan();
        setSelectedPlan(plan);
        setCanChangePlan(canChangePlan);
      } catch (error) {
        console.error("Error fetching mentor plan:", error);
      }
    };

    const getSubscriptionDetails = async () => {
      try {
        const details = await fetchCurrentSubscription(); // get payment details
        setSubscriptionDetails(details);
      } catch (error) {
        console.error("Error fetching subscription details:", error);
      }
    };

    getMentorPlan();
    getSubscriptionDetails();
  }, []);

  const handleSelectPlan = (plan: string) => {
    if (!canChangePlan && plan !== selectedPlan) {
      alert(
          "Nie możesz zmienić planu w bieżącym miesiącu. Możliwość zmiany będzie dostępna od początku przyszłego miesiąca."
      );
      return;
    }

    if (canChangePlan && plan !== selectedPlan) {
      setSuspendingPlan(plan);
    }
  };

  const changeMentorPlan = async (plan: string) => {
    try {
      await updateMentorPlan(plan); // API call to update plan
      setSelectedPlan(plan); // Set the selected plan as active
      setSuspendingPlan(null); // Closing the popup
      setCanChangePlan(false); // After changing the plan, blocking the possibility of another change
    } catch (error) {
      console.error("Błąd podczas zmiany planu:", error);
      alert("Wystąpił błąd podczas zmiany planu.");
    }
  };

  const handleCancelSubscription = async () => {
    try {
      await cancelMentorSubscription(); // API call to cancel subscription
      const updatedDetails = await fetchCurrentSubscription();
      setSubscriptionDetails(updatedDetails);
      setIsCancelingPlan(false);
    } catch (error) {
      console.error("Błąd podczas anulowania subskrypcji:", error);
    }
  };

  console.log('subscriptionDetails: ',subscriptionDetails);

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

  const canSelectPlan = (plan: string) => {
    if (selectedPlan === "Mid" && plan === "Pro") {
      return true;
    }
    if (selectedPlan === "Pro") {
      return false;
    }
    if (selectedPlan === "Free" && plan !== "Free") {
      return true;
    }
    return false;
  };

  return (
    <>
      {suspendingPlan && (
        <Modal
          title={
            <p className={styles.modalSubtitle}>
              Czy na pewno chcesz zmienić swój aktualny plan na{" "}
              <span className={styles.modalPlan}>{suspendingPlan}</span>?
            </p>
          }
          className={styles.modal}
          closeHandler={() => setSuspendingPlan(null)}
        >
          <div className={styles.modalBtnBox}>
            <Button
              as={ButtonTag.Button}
              variant={ButtonVariant.Outline}
              onClick={() => setSuspendingPlan(null)}
            >
              Anuluj
            </Button>
            <Button
              as={ButtonTag.Button}
              onClick={() => changeMentorPlan(suspendingPlan)}
            >
              Zmień plan
            </Button>
          </div>
        </Modal>
      )}
      {isCancelingPlan && (
        <Modal
          withClose={false}
          title={
            <p className={styles.title}>
              Czy na pewno chcesz anulować swój plan?
            </p>
          }
          classNameContent={styles.modalCancel}
          closeHandler={() => setIsCancelingPlan(false)}
        >
          <p className={styles.info}>
            {`Możesz nadal korzystać z korzyści wynikających z planu do dnia
            ${subscriptionDetails?.endDate}.`}
          </p>
          <div className={styles.modalCancelBtnBox}>
            <Button
              as={ButtonTag.Button}
              variant={ButtonVariant.Transparent}
              onClick={() => setIsCancelingPlan(false)}
            >
              Zamknij
            </Button>
            <Button
              as={ButtonTag.Button}
              variant={ButtonVariant.Transparent}
              classes={styles.mainBtn}
              onClick={handleCancelSubscription}
            >
              Tak, anuluj plan
            </Button>
          </div>
        </Modal>
      )}
      <Subscriptions
        title="Status subskrypcji Twoich mentee"
        subtitle={
          <>
            Tutaj masz wykaz aktualnie wykupionych przez mentee subskrypcji, a
            jeżeli chcesz zobaczyć historię swoich transakcji, przejdź do{" "}
            <a href="/payment">Płatności.</a>
          </>
        }
      />
      <div className={styles.sectionContainer}>
        <section className={styles.currentPlan}>
          <div className={styles.titleBox}>
            <h2 className={styles.title}>Aktualny plan</h2>
            <p className={styles.subtitle}>
              Tutaj możesz zobaczyć swój aktualny plan, anulować subskrypcję lub
              przejść na wyższy plan.
            </p>
          </div>
          <div className={styles.currentPlanInfoBox}>
            {subscriptionDetails?.status === "canceled" ? (
              <>
                <p className={styles.planItem}>
                  Twoja subskrypcja została anulowana.
                </p>
                <p className={styles.planItem}>
                  Ostatnia subskrypcja wygaśnie: {subscriptionDetails?.endDate}
                </p>
                <p className={styles.planItem}>
                  Ostatnia nazwa subskrypcji :{" "}
                  {subscriptionDetails?.lastPlanName}
                </p>
              </>
            ) : subscriptionDetails?.planName === "Free" ? (
              <>
                <p className={styles.planItem}>
                  Obecnie korzystasz z darmowego planu.
                </p>
                <p className={styles.planItem}>
                  Pełny dostęp do aplikacji bez kosztów.
                </p>
              </>
            ) : (
              <>
                <div className={styles.planHeader}>
                  <div className={styles.iconBox}>
                    {subscriptionDetails?.planName === "Mid" && <Basic />}
                    {subscriptionDetails?.planName === "Pro" && <Pro />}
                  </div>
                  <h4 className={styles.planName}>
                    Plan {subscriptionDetails?.planName || "N/A"}
                  </h4>
                </div>
                <ul className={styles.planInfoList}>
                  <li className={styles.planItem}>
                    Data odnowy subskrypcji:{" "}
                    <span className={styles.planItemValue}>
                      {subscriptionDetails?.endDate || "N/A"}
                    </span>
                  </li>
                  <li className={styles.planItem}>
                    Kwota do zapłaty{" "}
                    <span className={styles.planItemValue}>
                      {subscriptionDetails?.planAmount || "N/A"}
                    </span>
                  </li>
                </ul>
                {subscriptionDetails?.status !== "canceled" && (
                  <Button
                    onClick={() => setIsCancelingPlan(true)}
                    variant={ButtonVariant.PrimaryLight}
                    as={ButtonTag.Button}
                    type="button"
                    fontVariant="button-md"
                  >
                    Anuluj subskrypcję
                  </Button>
                )}
              </>
            )}
          </div>
        </section>
        <SectionTemplate
          title=""
          description=""
          className={styles.sectionPricing}
        >
          <div className={styles.flex}>
            <Pricing
              planTitle="Free"
              price={0}
              values={[
                "Pełny dostęp do aplikacji",
                "Nieograniczona liczba mentee",
                "10% prowizji od spotkania",
                "Brak darmowych spotkań",
              ]}
              selectedPlan={selectedPlan}
              handleSelectPlan={handleSelectPlan}
              canChangePlan={canSelectPlan("Free")}
              currentPlan={subscriptionDetails?.planName || "Free"}
            />
            <Pricing
              planTitle="Mid"
              price={89}
              values={[
                "20 darmowych spotkań w miesiącu",
                "Gwarancja stałej opłaty miesięcznej",
                "Niższa prowizja: 5%",
                "Pełny dostęp do aplikacji",
                "Nieograniczona liczba mentee",
              ]}
              selectedPlan={selectedPlan}
              handleSelectPlan={handleSelectPlan}
              canChangePlan={canSelectPlan("Mid")}
              currentPlan={subscriptionDetails?.planName || "Free"}
            />
            <Pricing
              planTitle="Pro"
              price={189}
              values={[
                "Darmowe spotkania bez limitu",
                "Gwarancja stałej opłaty miesięcznej",
                "Brak prowizji",
                "Nieograniczona liczba mentee",
              ]}
              selectedPlan={selectedPlan}
              handleSelectPlan={handleSelectPlan}
              canChangePlan={canSelectPlan("Pro")}
              currentPlan={subscriptionDetails?.planName || "Free"}
            />
          </div>
        </SectionTemplate>
        <div className={styles.subscriptionHistoryContainer}>
          <MentorPaymentSubscription />
        </div>
      </div>
    </>
  );
};
