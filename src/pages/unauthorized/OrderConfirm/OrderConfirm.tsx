import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { SectionTemplate } from "src/components/SectionTemplate";
import { MentorServiceCard } from "src/components/Cards/MentorServiceCard";
import { ListStyleArtistIcon } from "@icons/ListStyleArtistIcon";
import Button, { ButtonVariant } from "src/components/Button/Button";

import styles from "./OrderConfirm.module.scss";

import paths from "src/paths";
import { getSingleSession } from "@services/session/sessionService";
import { SelectedDate } from "src/pages/app/BookSession/components";
import Container from "src/components/Container/Container";
import { Tag } from "@customTypes/tags";
import { Loader } from "src/components/_grouped/loader";
type SessionData = {
  userEmail: string;
  sessionName: string;
  sessionPrice: number;
  sessionType: string;
  scheduleID: number;
  sessionDescription: string;
  sessionTerm?: Date;
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
};
export const OrderConfirmPage = () => {
  const { id } = useParams<{ id: string | "" }>();
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      setIsLoading(true);
      const getSessionData = async (id: string) => {
        const data = await getSingleSession(id);
        setSession(data);
      };
      if (id) getSessionData(id);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (!session) {
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

  const formattedDate = session.sessionTerm
    ? session.sessionTerm.toLocaleDateString()
    : "";
  const formattedTime = session.sessionTerm
    ? session.sessionTerm.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <main>
      <Container as={Tag.Section}>
        <div className={styles.flexContainer}>
          <div className={styles.boxOuter}>
            <div className={styles.boxMobile}>
              <h3 className={styles.title}>Spotkanie zostało zarezerwowane</h3>
              <p className={styles.subtitle}>
                Potwierdzenie swojego spotkania dostaniesz również na e-maila{" "}
                <span className={styles.mail}>{session.userEmail}</span>
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
              information="Link do spotkania dostaniesz po zatwierdzeniu terminu"
              avatar_url={session.mentor?.avatarUrl}
              description={session.sessionDescription}
              fullName={session.sessionName}
              profession={session.mentor?.profession}
              reviewsAvgRate={String(session.mentor?.reviewsAvgRate)}
              reviewsCount={String(session.mentor?.reviewsCount)}
              title={session.sessionType}
              initialDescriptionHeight={90}
              servicePrice={session.sessionPrice}
              serviceDuration={session.sessionDuration || 45}
            />
            <SelectedDate
              selectedDate={formattedDate}
              selectedTime={formattedTime}
            />
            <Button
              href={paths.home}
              classes={styles.btnDesktop}
              variant={ButtonVariant.PrimaryLight}
            >
              Powrót do strony głównej
            </Button>
          </div>
          <div className={styles.box}>
            <p className={styles.title}>
              Zakładając konto zyskujesz wiele korzyści!
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <ListStyleArtistIcon />
                <p>Dostęp do kalendarza wszystkich spotkań</p>
              </li>
              <li className={styles.listItem}>
                <ListStyleArtistIcon />
                <p>System przypomnień i powiadomień</p>
              </li>
              <li className={styles.listItem}>
                <ListStyleArtistIcon />
                <p>Bezpośredni kontakt z mentorami</p>
              </li>
              <li className={styles.listItem}>
                <ListStyleArtistIcon />
                <p>Możliwość skorzystania z darmowych spotkań</p>
              </li>
            </ul>
            <Button href={paths.registerMentee} classes={styles.btn}>
              Stwórz konto
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
};
