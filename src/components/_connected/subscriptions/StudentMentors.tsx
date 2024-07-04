import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Subscriptions.module.scss";
import {
  HorizontalTabs,
  HorizontalTabsButton,
} from "src/components/_base/HorizontalTabs";
import { SubscriptionStatus } from "@customTypes/subscriptions";
import { Table, TableCell, TableRow } from "src/components/_base/Table";
import { Scrollable } from "src/components/_base/Scrollable";
import { Pagination } from "src/components/_grouped";
import { formatDate } from "src/utils";
import { UserIdentity } from "src/components/_base/UserIdentity";
import { CrownIcon } from "@icons/CrownIcon";
import { Status } from "src/components/_base/Status";
import { Tag } from "src/types/tags";
import Container from "src/components/Container/Container";
import { SearchSvg2 } from "@icons/SearchSvg2";
import { SkeletonRow } from "./SkeletonRow";
import {
  OverflowMenu,
  OverflowMenuList,
  OverflowMenuOption,
  OverflowMenuToggle,
} from "src/components/_grouped/overflow-menu";
import { useNavigate } from "react-router-dom";
import { useSubscriptionsReducer } from "src/reducers/subscriptions";
import { Skeleton, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PlanName } from "src/components/_base/PlanName";
import SendArrow from "@icons/SendArrow";
import { fetchStudentMentors } from "@services/mentee/fetchStudentMentors.service";
import { FetchStudentMentorsOutput } from "@services/mentee/fetchStudentMentors.types";
import Button from "src/components/Button/Button";
import Arrow from "@icons/Arrow";
import { ArrowLongRight } from "@icons/ArrowLongRight";
import clx from "classnames";
import { ClientPortal } from "src/components/portal";
import { SubscriptionPlan } from "@customTypes/order";
import Modal from "src/components/Modal/Modal";
import { MentorshipFeedbackModal } from "../mentorship-feedback/MentorshipFeedbackModal";
import { cancelMentorship } from "@services/mentorship/cancelMentorship";
import { suspendMentorship } from "@services/mentorship/suspendMentorship";
import { resumeMentorship } from "@services/mentorship/resumeMentorship";

const PER_PAGE = 5;

const renderStatus = (status: SubscriptionStatus) => {
  switch (status) {
    case "awaiting":
      return <Status variant="info" text="Aplikacja w toku" />;
    case "inactive":
      return <Status variant="danger" text="Aplikacja odrzucona" />;
    case "suspended":
      return <Status variant="warning" text="Zawieszona" />;
    case "active":
      return <Status variant="success" text="Aplikacja zaakceptowana" />;
    default:
      return null;
  }
};

type Props = {
  title?: string;
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1060,
      settings: {
        slidesToShow: 2,
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
  const [resuming, setResuming] = useState<MentorShort | null>(null);
  const [suspending, setSuspending] = useState<MentorShort | null>(null);
  const [cancelling, setCancelling] = useState<MentorShort | null>(null);
  const [cancelled, setCancelled] = useState<MentorShort | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudentMentors({
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

  const handleCancelConfirm = useCallback(async () => {
    const c = cancelling ? {...cancelling} : {} as MentorShort
    await cancelMentorship(c.id)
    setCancelled(c);
    setCancelling(null);
  }, [cancelling]);

  const handleSuspendConfirm = useCallback(async () => {
    if(!suspending){
      return
    }
    await suspendMentorship(suspending?.id)
    setSuspending(null);
  }, [suspending]);

  const handleResumeConfirm = useCallback(async () => {
    if(!resuming){
      return
    }
    await resumeMentorship(resuming?.id)
    setResuming(null);
  }, [resuming]);

  return (
    <>
      <ClientPortal selector="modal-root">
        {cancelling ? (
          <Modal title="" closeHandler={() => setCancelling(null)}>
            <div>
              <h2>
                Czy jesteś pewny, że chcesz anulować swój plan z{" "}
                {cancelling.fullName}?
              </h2>
              <p>
                Dostęp do funkcji premium będziesz miał jeszcze do{" "}
                {formatDate(cancelling.paidUntil, "DD MMMM YYYY")} roku.
              </p>
            </div>
            <button onClick={handleCancelConfirm}>
              Tak, zakończ subskrypcję
            </button>
            <button onClick={() => setCancelling(null)}>
              Nie, jeszcze nie
            </button>
          </Modal>
        ) : null}
        {suspending ? (
          <Modal title="" closeHandler={() => setSuspending(null)}>
            <div>
              <h2>
                Czy jesteś pewny, że chcesz zawiesić swój plan z{" "}
                {suspending.fullName}?
              </h2>
              <p>
                Dostęp do funkcji premium będziesz miał jeszcze do{" "}
                {formatDate(suspending.paidUntil, "DD MMMM YYYY")} roku.
              </p>
            </div>
            <button onClick={handleSuspendConfirm}>
              Tak, zawieś subskrypcję
            </button>
            <button onClick={() => setSuspending(null)}>
              Nie, jeszcze nie
            </button>
          </Modal>
        ) : null}
        {cancelled ? (
          <MentorshipFeedbackModal
            mentorshipId={cancelled.id}
            handleClose={() => setCancelled(null)}
          />
        ) : null}
      </ClientPortal>

      <Container as={Tag.Section}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h2>{title}</h2>
          </div>

          <div className={styles.body}>
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
                        title={
                          <Skeleton style={{ width: "90%" }} variant="text" />
                        }
                        subtitle={
                          <Skeleton style={{ width: "90%" }} variant="text" />
                        }
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            ) : null}
            {!pending &&
            data &&
            data?.total &&
            data.mentors &&
            data.mentors.length > 0 ? (
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
                              href={`/mentor/${m.id}`}
                            >
                              Zobacz profil
                              <ArrowLongRight />
                            </a>
                          }
                        />
                        <PlanName
                          plan={m.plan}
                          pillBg
                          className={styles.planPill}
                        />
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
                            <a className={styles.btn} href="/#">
                              Zobacz aplikację
                            </a>
                          </div>
                        </>
                      ) : null}
                      {m.status === "rejected" ? (
                        <>
                          <div className={styles.cardStatus}>
                            <Status
                              text="Aplikacja odrzucona"
                              variant="danger"
                            />
                            <p>Mentor odrzucił Twoją aplikację.</p>
                          </div>
                          <div className={styles.buttons}>
                            <a className={styles.btn} href="/#">
                              Zobacz powód odrzucenia
                            </a>
                          </div>
                        </>
                      ) : null}
                      {m.status === "accepted" && !m.scheduled ? (
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
                            <a className={styles.btn} href="/#">
                              Wybierz terminy spotkań
                            </a>
                          </div>
                        </>
                      ) : null}
                      {m.status === "accepted" && m.scheduled ? (
                        <>
                          <div className={styles.buttons}>
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
                            >
                              Zawieś subskrypcję
                            </button>
                            <button
                              onClick={() =>
                                setCancelling({
                                  id: m.id,
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
            ) : null}
          </div>
        </div>
      </Container>
    </>
  );
};
