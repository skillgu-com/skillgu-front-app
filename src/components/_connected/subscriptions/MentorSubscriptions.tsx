import React, {useEffect, useRef, useState} from "react";
import {Subscriptions} from "./Subscriptions";
import {useSubscriptionsReducer} from "src/reducers/subscriptions";
import {fetchMentorStudents} from "@services/mentor/fetchMentorStudents.service";
import {SubscriptionStatus} from "@customTypes/subscriptions";
import {SectionTemplate} from "src/components/SectionTemplate";
import Modal from "src/components/Modal/Modal";
import styles from "./Subscriptions.module.scss";
import {
    cancelMentorSubscription,
    fetchCurrentSubscription,
    fetchMentorPlan,
    updateMentorPlan,
} from "@services/subscription/mentorSubscription.service";
import Button, {ButtonTag, ButtonVariant} from "src/components/Button/Button";
import {Pricing} from "../pricing/Pricing";

const PER_PAGE = 5;

export const MentorSubscriptions = () => {
    const [selectedPlan, setSelectedPlan] = useState<string>("Free");
    const [canChangePlan, setCanChangePlan] = useState<boolean>(true);
    const [suspendingPlan, setSuspendingPlan] = useState<string | null>(null);
    const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);


    useEffect(() => {
        const getMentorPlan = async () => {
            try {
                const {plan, canChangePlan} = await fetchMentorPlan();
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
            alert("Nie możesz zmienić planu w bieżącym miesiącu. Możliwość zmiany będzie dostępna od początku przyszłego miesiąca.");
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
        } catch (error) {
            console.error("Błąd podczas anulowania subskrypcji:", error);
            alert("Wystąpił błąd podczas anulowania subskrypcji.");
        }
    };

    const sr = useSubscriptionsReducer();
    const pageRef = useRef<number>(0);
    const tabRef = useRef<SubscriptionStatus>("awaiting");

    const {tab, page} = sr.subscriptionsState;

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
        if (pageRef.current === 0 || pageRef.current !== page || tabRef.current !== tab) {
            fetchData();
            pageRef.current = page;
            tabRef.current = tab;
        }
    }, [page, sr, tab]);


    console.log("Selected Plan:", selectedPlan);
    console.log("Can Change Plan:", canChangePlan);
    console.log("Czy plan Free jest aktywny:", selectedPlan === "Free");
    console.log("Czy plan Mid jest aktywny:", selectedPlan === "Mid");

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

            <SectionTemplate
                title="Wybierz Plan"
                description={
                    subscriptionDetails?.isCanceled || subscriptionDetails?.status === 'canceled' ? (
                        <>
                            <p>Twoja subskrypcja została anulowana.</p>
                            <p>Subskrypcja wygaśnie: {subscriptionDetails?.endDate}</p>
                        </>
                    ) : subscriptionDetails?.planName === "free" ? (
                        <>
                            <p>Obecnie korzystasz z darmowego planu.</p>
                            <p>Pełny dostęp do aplikacji bez kosztów.</p>
                        </>
                    ) : (
                        <>
                            <p>Aktualna subskrypcja:</p>
                            <ul>
                                <li>Plan: {subscriptionDetails?.planName || "N/A"}</li>
                                <li>Status: {subscriptionDetails?.status}</li>
                                <li>Data rozpoczęcia: {subscriptionDetails?.startDate}</li>
                                <li>Data zakończenia: {subscriptionDetails?.endDate}</li>
                                <li>Kwota: {subscriptionDetails?.planAmount}</li>
                            </ul>
                            <Button
                                as={ButtonTag.Button}
                                variant={ButtonVariant.Outline}
                                onClick={handleCancelSubscription}
                            >
                                Anuluj subskrypcję
                            </Button>
                        </>
                    )
                }
                className={styles.sectionPricing}
            >
                {subscriptionDetails && (
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
                            canChangePlan={canChangePlan}
                            currentPlan={subscriptionDetails.planName || "Free"}  // default if value is `subscriptionDetails.planName` or `undefined`

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
                            canChangePlan={canChangePlan}
                            currentPlan={subscriptionDetails.planName || "Free"}

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
                            canChangePlan={canChangePlan}
                            currentPlan={subscriptionDetails.planName || "Free"}
                        />
                    </div>
                )}
            </SectionTemplate>
        </>
    );
};
