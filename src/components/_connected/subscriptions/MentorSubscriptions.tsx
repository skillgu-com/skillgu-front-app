import React, { useEffect, useRef, useState } from "react";
import { Subscriptions } from "./Subscriptions";
import { useSubscriptionsReducer } from "src/reducers/subscriptions";
import { fetchMentorStudents } from "@services/mentor/fetchMentorStudents.service";
import { SubscriptionStatus } from "@customTypes/subscriptions";
import Pricing from "../pricing/Pricing";
import { SectionTemplate } from "src/components/SectionTemplate";
import Modal from "src/components/Modal/Modal";
import styles from "./Subscriptions.module.scss";
import {
    fetchMentorPlan,
    updateMentorPlan,
} from "@services/subscription/mentorSubscription.service";
import Button, { ButtonTag, ButtonVariant } from "src/components/Button/Button";

const PER_PAGE = 5;

export const MentorSubscriptions = () => {
    const [selectedPlan, setSelectedPlan] = useState<string>("Free");
    const [canChangePlan, setCanChangePlan] = useState<boolean>(true);
    const [suspendingPlan, setSuspendingPlan] = useState<string | null>(null);

    // Fetch mentor's current plan
    useEffect(() => {
        const getMentorPlan = async () => {
            try {
                const response = await fetchMentorPlan();
                const { plan, startDate } = response;
                console.log('getMentorPlan:', response);

                setSelectedPlan(plan);

                // Konwersja startDate na obiekt Date
                const start = new Date(startDate);

                const now = new Date();
                const isStartOfMonth = now.getDate() === 1;
                const canChooseAnyPlan = isStartOfMonth || plan === "Free";

                setCanChangePlan(canChooseAnyPlan);
            } catch (error) {
                console.error("Error fetching mentor plan:", error);
            }
        };

        getMentorPlan();
    }, []);

    const handleSelectPlan = async (plan: string) => {
        if (!canChangePlan || plan === selectedPlan) {
            alert("Nie możesz zmienić planu w bieżącym miesiącu.");
            return;
        }

        try {
            await updateMentorPlan(plan);
            setSelectedPlan(plan);
            setCanChangePlan(false); // Po zmianie blokujemy możliwość zmiany do końca miesiąca
        } catch (error) {
            console.error("Błąd podczas zmiany planu:", error);
        }
    };

    const changeMentorPlan = async (plan: string) => {
        setSelectedPlan(plan);
        try {
            await updateMentorPlan(plan);
        } catch (error) {
            console.error("Error updating mentor plan:", error);
        }

        setSuspendingPlan(null);
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
        if (pageRef.current === 0 || pageRef.current !== page || tabRef.current !== tab) {
            fetchData();
            pageRef.current = page;
            tabRef.current = tab;
        }
    }, [page, sr, tab]);

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
                title="Twoje Plany"
                description={
                    <>
                        Jeżeli chcesz zobaczyć historię swoich transakcji, przejdź do{" "}
                        <a href="/payment">Stripe.</a>
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
                        planTitle="Pro"
                        price={190}
                        values={[
                            "Darmowe spotkania bez limitu",
                            "Gwarancja stałej opłaty miesięcznej",
                            "Brak prowizji",
                            "Nieograniczona liczba mentee",
                        ]}
                        selectedPlan={selectedPlan}
                        handleSelectPlan={handleSelectPlan}
                    />
                </div>
            </SectionTemplate>
        </>
    );
};
