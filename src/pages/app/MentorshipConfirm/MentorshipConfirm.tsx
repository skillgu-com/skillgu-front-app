import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MentorServiceCard } from "src/components/Cards/MentorServiceCard";
import Button, { ButtonVariant } from "src/components/Button/Button";
import { Loader } from "src/components/_grouped/loader";
import { getSessionOrderSummary } from "@services/order/orderService";
import Container from "src/components/Container/Container";
import { Tag } from "@customTypes/tags";
import { SelectedDate } from "src/pages/app/BookSession/components";

import styles from "./OrderConfirm.module.scss";
import paths from "../../../paths";

type MentorshipData = {
  userEmail: string;
  sessionName: string;
  sessionPrice: number;
  sessionType: string;
  scheduleID: number;
  sessionDescription: string;
  terms?: Date[];
  sessionDuration?: number;
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
  const { id } = useParams<{ id: string }>();
  const [mentorship, setMentorship] = useState<MentorshipData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMentporshipOrder = async (id: string) => {
      try {
        setIsLoading(true);
        const data = await getSessionOrderSummary(id);
        setMentorship(data);
      } catch (err) {
        // Handle error if needed
      } finally {
        setIsLoading(false);
      }
    };

    if (id) getMentporshipOrder(id);
  }, [id]);

  if (!mentorship) {
    return (
      <>
        {isLoading ? (
          <Loader overlay spinner />
        ) : (
          <Container as={Tag.Section}>
            <p className={styles.subtitle}>Some error during fetching data</p>
          </Container>
        )}
      </>
    );
  }

  const getFormatedTime = (term: Date) => {
    return term
      ? term.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
  };

  return (
    <main>
      <Container as={Tag.Section}>
        <div className={styles.flexContainer}>
          <div className={styles.boxOuter}>
            <div className={styles.boxMobile}>
              <h3 className={styles.title}>Spotkanie zostało zarezerwowane</h3>
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
              maxAttendees={5}
              information="Link do spotkania przyjdzie na e-mail lub po zalogowaniu aplikacji w kalendarzu"
              avatar_url={mentorship.mentor?.avatarUrl}
              description={mentorship.sessionDescription}
              fullName={mentorship.sessionName}
              profession={mentorship.mentor?.profession}
              reviewsAvgRate={String(mentorship.mentor?.reviewsAvgRate)}
              reviewsCount={String(mentorship.mentor?.reviewsCount)}
              title={mentorship.sessionType}
              initialDescriptionHeight={90}
              servicePrice={mentorship.sessionPrice}
              serviceDuration={mentorship.sessionDuration || 45}
              timeZone={mentorship?.timeZone}
            />
            {mentorship?.terms?.map((term) => (
              <SelectedDate
                key={term.getTime()}
                selectedDate={term ? term.toLocaleDateString() : ""}
                selectedTime={getFormatedTime(term)}
              />
            ))}
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
