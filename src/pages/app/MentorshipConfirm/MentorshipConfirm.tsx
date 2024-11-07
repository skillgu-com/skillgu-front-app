import React, {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";

import {MentorServiceCard} from "src/components/Cards/MentorServiceCard";
import Button, {ButtonVariant} from "src/components/Button/Button";
import {Loader} from "src/components/_grouped/loader";
import Container from "src/components/Container/Container";

import styles from "./MentorshipConfirm.module.scss";

import paths from "../../../paths";
import {Tag} from "@customTypes/tags";
import {SubscriptionPlan} from "@customTypes/order";
import {getMentorshipOrderSummary} from "@services/mentorship/mentorshipConfirm";
import {displayPlanName} from "src/utils/plan";

type MentorshipData = {
    userEmail: string;
    plan: {
        id: number;
        plan: SubscriptionPlan;
        monthlyPrice: number;
        included: string[];
        sessionDuration: number;
        sessionsPerMonth: number;
        responseTime: number;
    };
    terms: Date[];
    mentor: {
        id: number;
        userName: string;
        avatarUrl: string;
        fullName: string;
        profession: string;
        reviewsAvgRate: number;
        reviewsCount: number;
    };
    timeZone: string;
};

export const MentorshipConfirmPage = () => {
    const {id} = useParams<{ id: string }>();
    const [mentorship, setMentorship] = useState<MentorshipData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const maxAttempts = 5; // maksymalna liczba prób
    const interval = 1000; // 2 sekundy przerwy między próbami

    useEffect(() => {
        let attempts = 0;

        const fetchSessionWithPolling = async (id: string) => {
            try {
                setIsLoading(true);
                const data = await getMentorshipOrderSummary(id);
                setMentorship(data);
                setIsLoading(false);
            } catch (err) {
                attempts++;
                if (attempts < maxAttempts) {

                    setTimeout(() => fetchSessionWithPolling(id), interval);
                } else {
                    setIsLoading(false);
                    console.error("Błąd pobierania danych:", err);
                }
            }
        };

        if (id) fetchSessionWithPolling(id);
    }, [id]);


    // useEffect(() => {
    //   const getMentorshipOrder = async (id: string) => {
    //     try {
    //       setIsLoading(true);
    //       const data = await getMentorshipOrderSummary(id);
    //       setMentorship(data);
    //     } catch (err) {
    //       // Handle error if needed
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };
    //
    //   if (id) getMentorshipOrder(id);
    // }, [id]);

    const getFormatedTime = (term: Date) => {
        return term
            ? term.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
            : "";
    };
    const formatedTerm = useMemo(() => {
        return mentorship?.terms
            ? mentorship?.terms.map((term) => ({
                selectedDate: term ? term.toLocaleDateString() : "",
                selectedTime: getFormatedTime(term),
            }))
            : [];
    }, [mentorship?.terms]);

    if (!mentorship) {
        return (
            <>
                {isLoading ? (
                    <Loader overlay spinner/>
                ) : (
                    <Container as={Tag.Section}>
                        <p className={styles.subtitle}>Some error during fetching data</p>
                    </Container>
                )}
            </>
        );
    }

    return (
        <main>
            <Container as={Tag.Section}>
                <div className={styles.flexContainer}>
                    <div className={styles.boxOuter}>
                        <div className={styles.boxMobile}>
                            <h3 className={styles.title}>Mentoring został zarezerwowany</h3>
                            <p className={styles.subtitle}>
                                Co teraz? Otrzymasz e-mail z potwierdzeniem spotkania, który
                                będzie zawierał link do spotkania. Sprawdź swoją skrzynkę
                                pocztową, aby uzyskać więcej szczegółów.{" "}
                                <span className={styles.mail}>{mentorship.userEmail}</span>
                            </p>
                            <Button
                                href={paths.home}
                                classes={styles.btnMobile}
                                variant={ButtonVariant.PrimaryLight}
                            >
                                Powrót do strony głównej
                            </Button>
                        </div>
                        <MentorServiceCard
                            meetingForm="video"
                            information="Link do spotkania przyjdzie na e-mail lub po zalogowaniu aplikacji w kalendarzu"
                            avatar_url={mentorship.mentor?.avatarUrl}
                            fullName={mentorship.mentor.fullName}
                            profession={mentorship.mentor?.profession}
                            reviewsAvgRate={String(mentorship.mentor?.reviewsAvgRate)}
                            reviewsCount={String(mentorship.mentor?.reviewsCount)}
                            title={displayPlanName(mentorship.plan.plan)}
                            initialDescriptionHeight={90}
                            servicePrice={mentorship.plan.monthlyPrice}
                            servicePerMonth={mentorship.plan.sessionsPerMonth}
                            serviceDuration={mentorship.plan.sessionDuration || 45}
                            timeZone={mentorship?.timeZone}
                            serviceType="mentorship"
                            serviceIncluded={mentorship.plan.included}
                            responseTime={mentorship.plan.responseTime}
                        />
                        {formatedTerm?.length ? (
                            <section className={styles.timeBox}>
                                <h4 className={styles.timeBoxTitle}>Wybrany termin</h4>
                                <ul className={styles.timeList}>
                                    {formatedTerm.map((term) => (
                                        <li className={styles.timeListItem}>
                                            <p className={styles.timeElem}>{term.selectedDate}</p>
                                            <p className={styles.timeElem}>{term.selectedTime}</p>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ) : null}
                        <Button
                            href={paths.home}
                            classes={styles.btnDesktop}
                            variant={ButtonVariant.PrimaryLight}
                        >
                            Powrót do strony głównej
                        </Button>
                    </div>
                </div>
            </Container>
        </main>
    );
};
