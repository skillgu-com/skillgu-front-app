import React, { ReactNode, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./SessionsHistory.module.scss";
import { PER_PAGE, useSessionsReducer } from "src/reducers/sessions";
import { Table, TableCell, TableRow } from "src/components/_base/Table";
import { Pagination } from "src/components/_grouped";
import { formatDate } from "src/utils";
import { Status } from "src/components/_base/Status";
import { SkeletonRow } from "./SkeletonRow";
import { Skeleton } from "@mui/material";
import { UserIdentity } from "src/components/_base/UserIdentity";
import { Scrollable } from "src/components/_base/Scrollable";
import { EmptyState } from "src/components/EmptyState";

import { getRole } from "src/redux/selectors/authSelectors";
import { SectionTemplate } from "src/components/SectionTemplate";

type Props = {
  title?: string;
  subtitle?: ReactNode;
  getProfileLink: (username: string) => string;
};

export const SubscriptionHistory = ({
  title = "Historia Twoich sesji",
  subtitle,
  getProfileLink,
}: Props) => {
  const role = useSelector(getRole);
  const sr = useSessionsReducer();
  const sessions = sr.sessionsState.sessions;
  const totalPages = Math.ceil(sr.sessionsState.totalRecords / PER_PAGE);

  const navigate = useNavigate();

  const handlePagination = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget as HTMLButtonElement;
      if (!!btn.value && sr.sessionsState.page !== Number(btn.value)) {
        sr.updatePage(Number(btn.value));
      }
    },
    [sr]
  );

  return (
    <SectionTemplate title={title} description={subtitle}>
      {sr.sessionsState.pending ? (
        <Table className={styles.table}>
          <TableRow heading>
            <TableCell
              flex={4}
              heading
              text={role === "M" ? "Mentee" : "Mentor"}
            />
            <TableCell flex={3} heading text="Data" />
            <TableCell flex={3} heading text="Status" />
            <TableCell flex={3} heading text="Rodzaj" />
            <TableCell flex={4} heading text="Plan" />
          </TableRow>

          {new Array(PER_PAGE).fill(null).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
          <TableRow borderTop>
            <TableCell flex>
              <div className={styles.PaginationSkeleton}>
                <Skeleton
                  style={{ width: "60px" }}
                  variant="text"
                  sx={{ fontSize: "1em" }}
                />
                <Skeleton
                  style={{ width: "60px" }}
                  variant="text"
                  sx={{ fontSize: "1em" }}
                />
                <Skeleton
                  style={{ width: "60px" }}
                  variant="text"
                  sx={{ fontSize: "1em" }}
                />
              </div>
            </TableCell>
          </TableRow>
        </Table>
      ) : (
        <Table className={styles.table}>
          {sessions && sessions.length ? (
            <Scrollable minWidth="920px">
              <TableRow heading>
                <TableCell
                  flex={4}
                  heading
                  text={role === "M" ? "Mentee" : "Mentor"}
                />
                <TableCell flex={3} heading text="Data" />
                <TableCell flex={3} heading text="Status" />
                <TableCell flex={3} heading text="Rodzaj" />
                <TableCell flex={4} heading text="Plan" />
              </TableRow>
              {sessions.map((s, ind) => (
                <TableRow
                  key={`${s.id}-${ind}`}
                  onClick={() => {
                    navigate(getProfileLink(s.userName));
                  }}
                >
                  <TableCell flex={4}>
                    <UserIdentity
                      className={styles.userIdentity}
                      avatarUrl={s.avatarUrl}
                      avatarAlt={s.fullName}
                      avatarSize={40}
                      title={s.fullName}
                    />
                  </TableCell>
                  <TableCell flex={3}>
                    {s.date
                      ? formatDate(s.date, "DD.MM.YYYY")
                      : "Data w trakcie ustalania"}
                  </TableCell>
                  <TableCell flex={3}>
                    {s.status === "accepted" ? (
                      <Status noWrap variant="info" text="Zaakceptowana" />
                    ) : s.status === "rejected" ? (
                      <Status noWrap variant="danger" text="Odrzucona" />
                    ) : s.status === "awaiting" ? (
                      <Status
                        noWrap
                        variant="warning"
                        text="Aplikacja w toku"
                      />
                    ) : s.status === "suspended" ? (
                      <Status noWrap variant="success" text="Zawieszona" />
                    ) : s.status === "active" ? (
                      <Status noWrap variant="success" text="Aktywna" />
                    ) : s.status === "completed" ? (
                      <Status noWrap variant="success" text="Zakończona" />
                    ) : null}
                  </TableCell>
                  <TableCell flex={3} className={styles.capitalize}>
                    {s.serviceType}
                  </TableCell>
                  <TableCell flex={4}>{s.serviceName}</TableCell>
                </TableRow>
              ))}

              <TableRow heading>
                <TableCell flex width="100%">
                  <Pagination
                    name="home-sessions-pagination"
                    current={sr.sessionsState.page}
                    last={totalPages}
                    fullWidth
                    onClick={handlePagination}
                  />
                </TableCell>
              </TableRow>
            </Scrollable>
          ) : (
            <>
              <TableRow heading>
                <TableCell
                  flex={4}
                  heading
                  text={role === "M" ? "Mentee" : "Mentor"}
                />
                <TableCell flex={3} heading text="Data" />
                <TableCell flex={3} heading text="Status" />
                <TableCell
                  flex={3}
                  heading
                  text="Rodzaj"
                  className={styles.mobileHidden}
                />
                <TableCell
                  flex={4}
                  heading
                  text="Plan"
                  className={styles.mobileHidden}
                />
              </TableRow>
              <TableRow>
                <TableCell flex>
                  <EmptyState text="Nie znaleziono żadnych Twoich sesji" />
                </TableCell>
              </TableRow>
              ;
            </>
          )}
        </Table>
      )}
    </SectionTemplate>
  );
};
