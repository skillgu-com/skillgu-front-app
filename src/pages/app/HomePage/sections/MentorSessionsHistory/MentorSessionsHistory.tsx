import React, { useCallback, useEffect, useRef, useState } from "react";
import clx from "classnames";
import styles from "./MentorSessionsHistory.module.scss";
import { fetchMentorSessions } from "@services/mentor/fetchMentorSessions.service";
import { useSessionsReducer, PER_PAGE } from "src/reducers/sessions";
import { Table, TableCell, TableRow } from "src/components/_base/Table";
import { Pagination } from "src/components/_grouped";
import { formatDate } from "src/utils";
import { formatPrice } from "src/utils/price";
import { ReportStatus, Report } from "@customTypes/reports";
import { Status } from "src/components/_base/Status";
import { OverflowMenu } from "src/components/_grouped/overflow-menu/OverflowMenu";
import { OverflowMenuToggle } from "src/components/_grouped/overflow-menu/OverflowMenuToggle";
import { OverflowMenuList } from "src/components/_grouped/overflow-menu/OverflowMenuList";
import { OverflowMenuOption } from "src/components/_grouped/overflow-menu/OverflowMenuOption";
import { useNavigate } from "react-router-dom";
import { Spinner } from "src/components/_base/Spinner";
import { Loader } from "src/components/_grouped/loader";
import { Skeleton } from "@mui/material";
import { SkeletonRow } from "./SkeletonRow";
import SearchSvg from "@icons/SearchSvg";
import { SearchSvg2 } from "@icons/SearchSvg2";
import { OverflowMenu } from "src/components/_grouped/overflow-menu/OverflowMenu";
import { OverflowMenuToggle } from "src/components/_grouped/overflow-menu/OverflowMenuToggle";
import { OverflowMenuList } from "src/components/_grouped/overflow-menu/OverflowMenuList";
import { OverflowMenuOption } from "src/components/_grouped/overflow-menu/OverflowMenuOption";
import { useNavigate } from 'react-router-dom';

export const MentorSessionsHistory = () => {
  const sr = useSessionsReducer();
  const pageRef = useRef<number>(0);

  useEffect(() => {
    const fetchData = async (page: number) => {
      sr.setPending(true);
      try {
        const { students, total } = await fetchMentorSessions({
          sortBy: "status",
          sortMethod: "ASC",
          skip: PER_PAGE * (page - 1),
          take: PER_PAGE,
        });
        sr.updateRecords(students, total);
      } catch (e) {
        sr.updateStatus("Wystąpił błąd podczas pobierania danych.");
      }
      sr.setPending(false);
    };
    if (pageRef.current === 0 || pageRef.current !== sr.sessionsState.page) {
      fetchData(sr.sessionsState.page);
      pageRef.current = sr.sessionsState.page;
    }
  }, [sr, sr.sessionsState.page]);

  const sessions: any[] = []; //sr.sessionsState.sessions;
  const totalPages = Math.ceil(sr.sessionsState.totalRecords / PER_PAGE);

  const [overflowMenuIndex, setOverflowMenuIndex] = useState<number | null>(
    null
  );

  const handleEdit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const id = Number(btn.value);
    const action = btn.name as "suspend" | "cancel";
    if (id && action === "suspend") {
      console.log("Przełóż spotkanie o id: ", id);
    }
    if (id && action === "cancel") {
      console.log("Odwołaj spotkanie o id: ", id);
    }
    setOverflowMenuIndex(null);
  }, []);

  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Historia Twoich sesji</h3>
      <Table>
        <TableRow heading>
          <TableCell flex={4} heading text="Mentor" />
          <TableCell flex={3} heading text="Data" />
          <TableCell flex={3} heading text="Status" />
          <TableCell flex={3} heading text="Rodzaj" />
          <TableCell flex={4} heading text="Typ" />
          <TableCell flex={1} heading text="" />
        </TableRow>

        {sr.sessionsState.pending ? (
          <>
            {new Array(PER_PAGE).fill(null).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </>
        ) : sessions.length ? (
          <>
            {sessions
              ? sessions.map((s) => (
                  <TableRow
                    key={s.id}
                    onClick={() => {
                      navigate(`/student/${s.id}`);
                    }}
                  >
                    <TableCell flex={4}>
                      <div className={styles.userCol}>
                        <img alt={s.fullName} src={s.avatarUrl} />
                        <span>{s.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell flex={3}>
                      {formatDate(s.date, "DD.MM.YYYY")}
                    </TableCell>
                    <TableCell flex={3}>
                      {s.status === "planned" ? (
                        <Status noWrap variant="warning" text="Zaplanowane" />
                      ) : s.status === "cancelled" ? (
                        <Status noWrap variant="danger" text="Odwołana" />
                      ) : s.status === "in-progress" ? (
                        <Status noWrap variant="success" text="W trakcie" />
                      ) : null}
                    </TableCell>
                    <TableCell flex={3} className={styles.capitalize}>
                      {s.serviceType}
                    </TableCell>
                    <TableCell flex={4}>{s.serviceName}</TableCell>
                    <TableCell
                      flex={1}
                      displayOverflow
                      className={styles.dotsCell}
                    >
                      <OverflowMenu>
                        <OverflowMenuToggle
                          onClick={() => {
                            setOverflowMenuIndex((id) => {
                              return id === s.id ? null : s.id;
                            });
                          }}
                        />
                        {s.id === overflowMenuIndex ? (
                          <OverflowMenuList>
                            <OverflowMenuOption
                              text="Przełóż spotkanie"
                              onClick={handleEdit}
                              name="suspend"
                              value={String(s.id)}
                            />
                            <OverflowMenuOption
                              text="Odwołaj"
                              variant="danger"
                              onClick={handleEdit}
                              name="cancel"
                              value={String(s.id)}
                            />
                          </OverflowMenuList>
                        ) : null}
                      </OverflowMenu>
                    </TableCell>
                  </TableRow>
                ))
              : null}

            <TableRow heading>
              <TableCell flex width="100%">
                <Pagination
                  name="home-sessions-pagination"
                  current={sr.sessionsState.page}
                  last={totalPages}
                  fullWidth
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    if (
                      !!btn.value &&
                      sr.sessionsState.page !== Number(btn.value)
                    ) {
                      sr.updatePage(Number(btn.value));
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          </>
        ) : (
          <TableRow>
            <TableCell flex>
              <div className={styles.emptyState}>
                <div>
                  <SearchSvg2 />
                </div>
                <p>Nie znaleziono żadnych Twoich sesji</p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </Table>
    </div>
  );
};
