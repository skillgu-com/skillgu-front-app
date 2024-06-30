import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
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
import { Skeleton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PlanName } from "src/components/_base/PlanName";
import SendArrow from "@icons/SendArrow";
import { fetchStudentMentors } from "@services/mentee/fetchStudentMentors.service";

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

export const StudentMentors = ({ title }: Props) => {
  const sr = useSubscriptionsReducer();
  const pageRef = useRef<number>(0);
  const tabRef = useRef<SubscriptionStatus>('awaiting');

  const { tab, page, role, pending, total, records } = sr.subscriptionsState;

  useEffect(() => {
    const fetchData = async () => {
      sr.setPending(true);
      const data = await fetchStudentMentors({
        take: PER_PAGE,
        skip: PER_PAGE * (page - 1),
        status: tab,
        sortBy: "status",
        sortMethod: "ASC",
      });
      sr.updateRecords({
        total: data.total,
        records: data.mentors,
        role: "S",
      });
      sr.setPending(false);
    };
    if (pageRef.current === 0 || pageRef.current !== page || tabRef.current !== tab) {
      fetchData();
      pageRef.current = page;
      tabRef.current = tab;
    }
  }, [page, sr, tab]);

  return role === "S" ? (
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
          {!pending && total && records && records.length > 0 ? (
            <Slider {...settings} className={styles.slick}>
              {records.map((m) => (
                <div key={m.id} className={styles.slickItem}>
                  <div className={styles.card}>
                    <UserIdentity
                      avatarSize={56}
                      avatarAlt={m.fullName}
                      avatarUrl={m.avatarUrl}
                      title={m.fullName}
                      subtitle={
                        <a
                          className={styles.profileLink}
                          href={`/mentor/${m.id}`}
                        >
                          Zobacz profil
                          <SendArrow />
                        </a>
                      }
                    />
                    <PlanName plan={"basic"} planName={m.planName} />
                  </div>
                </div>
              ))}
            </Slider>
          ) : null}
        </div>
      </div>
    </Container>
  ) : null;
};
