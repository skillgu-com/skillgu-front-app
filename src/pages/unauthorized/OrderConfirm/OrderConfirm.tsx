import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MentorServiceCard } from "src/components/Cards/MentorServiceCard";
import Button, { ButtonVariant } from "src/components/Button/Button";
import { Loader } from "src/components/_grouped/loader";
import { getSessionOrderSummary } from "@services/order/orderService";
import { useSelector } from "react-redux";
import { getRole } from "../../../redux/selectors/authSelectors";
import Container from "src/components/Container/Container";
import { Tag } from "@customTypes/tags";
import { SelectedDate } from "src/pages/app/BookSession/components";

import styles from "./OrderConfirm.module.scss";
import paths from "../../../paths";
import GuestBenefits from "./GuestBenefits";

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
  timeZone:string
};

export const OrderConfirmPage = () => {
  const { id } = useParams<{ id: string | "" }>();
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const role: "M" | "S" | "GUEST" = useSelector(getRole) || "GUEST";

  useEffect(() => {
    const getSessionOrder = async (id: string) => {
      try {
        setIsLoading(true);
        const data = await getSessionOrderSummary(id);
        setSession(data);
      } catch (err) {
        // Handle error if needed
      } finally {
        setIsLoading(false);
      }
    };

    if (id) getSessionOrder(id);
  }, [id]);

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
                  Co teraz? Otrzymasz e-mail z potwierdzeniem spotkania, który będzie zawierał link do spotkania.
                  Sprawdź swoją skrzynkę pocztową, aby uzyskać więcej szczegółów.{" "}
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
                  information="Link do spotkania przyjdzie na e-mail lub po zalogowaniu aplikacji w kalendarzu"
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
                  timeZone={session?.timeZone}
                  serviceType="session"
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
            {role === "GUEST" && <GuestBenefits />}
          </div>
        </Container>
      </main>
  );
};
