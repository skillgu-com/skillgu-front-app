import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Slider from "react-slick";
import clx from "classnames";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Button, { ButtonVariant } from "src/components/Button/Button";
import { ClientPortal } from "src/components/portal";
import Modal from "src/components/Modal/Modal";
import { PlanName } from "src/components/_base/PlanName";
import { Status } from "src/components/_base/Status";
import { Text } from "src/components/typography";
import { UserIdentity } from "src/components/_base/UserIdentity";
import { MentorshipFeedbackModal } from "../mentorship-feedback/MentorshipFeedbackModal";
import { EmptyState } from "src/components/EmptyState";
import { Skeleton, Typography } from "@mui/material";
import { ArrowLongRight } from "@icons/ArrowLongRight";

import { SubscriptionPlan } from "@customTypes/order";

import styles from "./Subscriptions.module.scss";

import { formatDate } from "src/utils";
import { cancelMentorship } from "@services/mentorship/cancelMentorship";
import { suspendMentorship } from "@services/mentorship/suspendMentorship";
import { restoreMentorship } from "@services/mentorship/restoreMentorship";
import { FetchStudentMentorsOutput } from "@services/mentee/fetchStudentMentors.types";
import { fetchMenteeSubscription } from "@services/mentee/fetchStudentMentors.service";
import { generatePath, Link } from "react-router-dom";
import paths from "../../../paths";
import { SectionTemplate } from "src/components/SectionTemplate";

const PER_PAGE = 5;

type Props = {
  title?: string;
};

type MentorShort = {
  id: number;
  fullName: string;
  plan: SubscriptionPlan;
  paidUntil: string;
};

export const StudentMentors = ({ title }: Props) => {
  const [data, setData] = useState<null | FetchStudentMentorsOutput>(null);
  const [pending, setPending] = useState<boolean>(true);
  const pageRef = useRef<number>(0);
  const [suspending, setSuspending] = useState<MentorShort | null>(null);
  const [confirmedSuspending, setConfirmedSuspending] =
    useState<MentorShort | null>(null);
  const [cancelling, setCancelling] = useState<MentorShort | null>(null);
  const [confirmedCanceling, setConfirmedCanceling] =
    useState<MentorShort | null>(null);

  const [cancelled, setCancelled] = useState<MentorShort | null>(null);
  const [restoring, setRestoring] = useState<MentorShort | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMenteeSubscription({
        take: PER_PAGE,
        skip: PER_PAGE * (pageRef.current - 1),
      });
      setData(data);
      setPending(false);
    };
    if (pageRef.current === 0) {
      pageRef.current = 1;
      fetchData();
    }
  }, []);
console.log(3, data)
  const settings = useMemo(() => {
    return {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: data?.mentors.length ? Math.min(3, data.mentors.length) : 3,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1060,
          settings: {
            slidesToShow: data?.mentors.length
              ? Math.min(2, data.mentors.length)
              : 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 560,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  }, [data?.mentors.length]);

  const handleCanceling = () => {
    const c = cancelling ? { ...cancelling } : ({} as MentorShort);
    setConfirmedCanceling(c);
    setCancelling(null);
  };

  const handleCancelConfirm = useCallback(async () => {
    const c = confirmedCanceling
      ? { ...confirmedCanceling }
      : ({} as MentorShort);
    await cancelMentorship(c.id);
    setCancelled(c);
    setConfirmedCanceling(null);
  }, [confirmedCanceling]);

  const handleSuspending = () => {
    const c = suspending ? { ...suspending } : ({} as MentorShort);
    setConfirmedSuspending(c);
    setSuspending(null);
  };
  const handleSuspendConfirm = useCallback(async () => {
    if (!confirmedSuspending) {
      return;
    }
    await suspendMentorship(confirmedSuspending?.id);
    setConfirmedSuspending(null);
  }, [confirmedSuspending]);

  const handleRestoreConfirm = useCallback(async () => {
    if (!restoring) {
      return;
    }
    await restoreMentorship(restoring?.id);
    setRestoring(null);
  }, [restoring]);

  return (
    <>
      <ClientPortal selector="modal-root">
        {suspending ? (
          <Modal
            className={styles.modal}
            classNameContent={styles.box}
            title={`Czy jesteś pewny, że chcesz zawiesić swój plan z ${suspending.fullName}?`}
            closeHandler={() => setSuspending(null)}
          >
            <div>
              {suspending.paidUntil && (
                <Text classes={styles.info}>
                  Dostęp do funkcji premium będziesz miał jeszcze do{" "}
                  {formatDate(suspending.paidUntil, "DD MMMM YYYY")} roku.
                </Text>
              )}
            </div>
            <div className={styles.btnBox}>
              <Button
                classes={styles.mainBtn}
                variant={ButtonVariant.Transparent}
                onClick={handleSuspending}
                fullWidth
              >
                Tak, zawieś subskrypcję
              </Button>
              <Button
                onClick={() => setSuspending(null)}
                variant={ButtonVariant.Light}
                fullWidth
              >
                Nie, jeszcze nie
              </Button>
            </div>
          </Modal>
        ) : null}
        {confirmedSuspending ? (
          <Modal
            className={styles.modal}
            classNameContent={styles.box}
            title={`Zawiesiłeś swój plan Pro z ${confirmedSuspending.fullName}?`}
            closeHandler={() => setConfirmedSuspending(null)}
          >
            <Text classes={styles.info}>
              Przykro nam, że odchodzisz! Zawsze możesz odwiesić swoją
              subskrypcję.
            </Text>

            <div className={styles.btnBox}>
              <Button
                classes={styles.mainBtn}
                variant={ButtonVariant.Transparent}
                onClick={() => setConfirmedSuspending(null)}
                fullWidth
              >
                Odwieś subskrypcję
              </Button>
              <Button
                variant={ButtonVariant.Light}
                onClick={handleSuspendConfirm}
                fullWidth
              >
                Wyjdź
              </Button>
            </div>
          </Modal>
        ) : null}
        {cancelling ? (
          <Modal
            className={styles.modal}
            classNameContent={styles.box}
            title={`Czy jesteś pewny, że chcesz anulować swój plan z ${cancelling.fullName}?`}
            closeHandler={() => setCancelling(null)}
          >
            {cancelling.paidUntil && (
              <Text classes={styles.info}>
                Dostęp do funkcji premium będziesz miał jeszcze do{" "}
                {formatDate(cancelling.paidUntil, "DD MMMM YYYY")} roku.
              </Text>
            )}
            <div className={styles.btnBox}>
              <Button
                classes={styles.mainBtn}
                variant={ButtonVariant.Transparent}
                onClick={handleCanceling}
                fullWidth
              >
                Tak, zakończ subskrypcję
              </Button>
              <Button
                variant={ButtonVariant.Light}
                onClick={() => setCancelling(null)}
                fullWidth
              >
                Nie, jeszcze nie
              </Button>
            </div>
          </Modal>
        ) : null}
        {confirmedCanceling ? (
          <Modal
            className={styles.modal}
            classNameContent={styles.box}
            title={`Anulowałeś swój plan Pro z ${confirmedCanceling.fullName}?`}
            closeHandler={() => setConfirmedCanceling(null)}
          >
            <Text classes={styles.info}>
              Przykro nam, że odchodzisz! Zawsze możesz wznowić swoją
              subskrypcję.
            </Text>

            <div className={styles.btnBox}>
              <Button
                classes={styles.mainBtn}
                variant={ButtonVariant.Transparent}
                onClick={() => setConfirmedCanceling(null)}
                fullWidth
              >
                Wznów subskrypcję
              </Button>
              <Button
                variant={ButtonVariant.Light}
                onClick={handleCancelConfirm}
                fullWidth
              >
                Wyjdź
              </Button>
            </div>
          </Modal>
        ) : null}
        {restoring ? (
          <Modal
            className={styles.modal}
            classNameContent={styles.box}
            title={`Wznów subskrypcję z ${restoring.fullName}`}
            closeHandler={() => setRestoring(null)}
          >
            <Text classes={styles.info}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus
              impedit atque numquam cum possimus vel?
            </Text>

            <div className={styles.btnBox}>
              <Button
                classes={styles.mainBtn}
                variant={ButtonVariant.Transparent}
                onClick={handleRestoreConfirm}
                fullWidth
              >
                Wznów subskrypcję
              </Button>
              <Button
                variant={ButtonVariant.Light}
                onClick={() => setRestoring(null)}
                fullWidth
              >
                Anuluj
              </Button>
            </div>
          </Modal>
        ) : null}
        {cancelled ? (
          <MentorshipFeedbackModal
            mentorshipId={cancelled.id}
            handleClose={() => setCancelled(null)}
          />
        ) : null}
      </ClientPortal>

      <SectionTemplate title={title || ""}>
        {pending ? (
          <Slider {...settings} className={styles.slick}>
            {new Array(PER_PAGE).fill(null).map((_, i) => (
              <div key={i} className={styles.slickItem}>
                <div className={styles.card}>
                  <UserIdentity
                    avatar={
                      <Skeleton
                        className={styles.img}
                        variant="circular"
                        width={56}
                        height={56}
                      />
                    }
                    title={<Skeleton style={{ width: "90%" }} variant="text" />}
                    subtitle={
                      <Skeleton style={{ width: "90%" }} variant="text" />
                    }
                  />
                </div>
              </div>
            ))}
          </Slider>
        ) : null}
        {!pending ? (
          data?.total && data.mentors && data.mentors.length > 0 ? (
            <Slider {...settings} className={styles.slick}>
              {data.mentors.map((m) => (
                <div key={m.id} className={styles.studentMentorSlickItem}>
                  <div className={styles.studentMentorCard}>
                    <div>
                      <UserIdentity
                        className={styles.userIdentity}
                        avatarSize={56}
                        avatarAlt={m.fullName}
                        avatarUrl={m.avatarUrl}
                        title={
                          <Typography variant="buttonLg" color="secondary">
                            {m.fullName}
                          </Typography>
                        }
                        subtitle={
                          <a
                            className={styles.profileLink}
                            href={`/mentor/${m.fullName}`}
                          >
                            Zobacz profil
                            <ArrowLongRight />
                          </a>
                        }
                      />
                      <PlanName plan={m.plan} pillBg />
                    </div>
                    <div className={styles.hr} />
                    {m.status === "awaiting" ? (
                      <>
                        <div className={styles.cardStatus}>
                          <Status text="Aplikacja w toku" variant="warning" />
                          <p>
                            Jeżeli zostanie zaakceptowana, poprosimy Cię o
                            wybranie terminów.
                          </p>
                        </div>
                        <div className={styles.buttons}>
                          <a
                            href={`/mentor-offer-details/${m?.serviceSessionDTO?.subscriptionId}`}
                            className={styles.tableBtn}
                          >
                            Zobacz aplikację mentee
                          </a>
                        </div>
                      </>
                    ) : null}
                    {m.status === "suspended" ? (
                      <>
                        <div className={styles.cardStatus}>
                          <Status
                            text="Mentoring zawieszony"
                            variant="warning"
                          />
                          <p>Zawiesiłeś współpracę z mentorem.</p>
                        </div>
                        <div className={styles.buttons}>
                          <button
                            className={styles.btn}
                            onClick={() =>
                              setRestoring({
                                id: m.id,
                                fullName: m.fullName,
                                plan: m.plan,
                                paidUntil: m.paidUntil,
                              })
                            }
                          >
                            Odwieś
                          </button>
                        </div>
                      </>
                    ) : null}
                    {m.status === "rejected" ? (
                      <>
                        <div className={styles.cardStatus}>
                          <Status text="Aplikacja odrzucona" variant="danger" />
                          <p>Mentor odrzucił Twoją aplikację.</p>
                        </div>
                        <div className={styles.buttons}>
                          <a className={styles.btn} href="/#">
                            Zobacz powód odrzucenia
                          </a>
                        </div>
                      </>
                    ) : null}
                    {m.status === "accepted" && !m.scheduleSet ? (
                      <>
                        <div className={styles.cardStatus}>
                          <Status
                            text="Aplikacja zaakceptowana"
                            variant="success"
                          />
                          <p>
                            Jeżeli zostanie zaakceptowana, poprosimy Cię o
                            wybranie terminów.
                          </p>
                        </div>
                        <div className={styles.buttons}>
                          <Link
                            to={generatePath(paths.studentSubscriptionDetail, {
                              mentorshipId: m.serviceSessionDTO.mentorshipId,
                              subscriptionId:
                                m.serviceSessionDTO.subscriptionId.toString(),
                            })}
                          >
                            <button className={styles.btn}>
                              Wybierz terminy spotkań
                            </button>
                          </Link>
                        </div>
                      </>
                    ) : null}
                    {m.status === "active" && m.scheduleSet ? (
                      <>
                        <div className={styles.cardStatus}>
                          <Status text="Aplikacja aktywna" variant="success" />
                        </div>
                        <div
                          className={clx(
                            styles.buttons,
                            styles.tooltipContainer
                          )}
                        >
                          <button
                            onClick={() =>
                              setSuspending({
                                id: m.id,
                                fullName: m.fullName,
                                plan: m.plan,
                                paidUntil: m.paidUntil,
                              })
                            }
                            className={styles.btn}
                            disabled
                          >
                            Zawieś subskrypcję
                          </button>
                          <span className={styles.tooltip}>
                            Funkcja chwilowo niedostępna
                          </span>
                          <button
                            onClick={() =>
                              setCancelling({
                                id: m.serviceSessionDTO.subscriptionId,
                                fullName: m.fullName,
                                plan: m.plan,
                                paidUntil: m.paidUntil,
                              })
                            }
                            className={clx(styles.btn, styles.btnRed)}
                          >
                            Zakończ subskrypcję
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <EmptyState text="Nie nawiązano współpracy z żadnym mentorem" />
          )
        ) : null}
      </SectionTemplate>
    </>
  );
};
