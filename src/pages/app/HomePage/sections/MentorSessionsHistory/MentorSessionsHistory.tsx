import React, { useEffect, useRef} from "react";
import styles from "./MentorSessionsHistory.module.scss";
import {fetchMentorSessions} from "@services/mentor/fetchMentorSessions.service";
import {PER_PAGE, useSessionsReducer} from "src/reducers/sessions";
import {Table, TableCell, TableRow} from "src/components/_base/Table";
import {Pagination} from "src/components/_grouped";
import {formatDate} from "src/utils";
import {Status} from "src/components/_base/Status";
import {useNavigate} from "react-router-dom";
import {SkeletonRow} from "./SkeletonRow";
import {SearchSvg2} from "@icons/SearchSvg2";

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

  const sessions = sr.sessionsState.sessions;
  const totalPages = Math.ceil(sr.sessionsState.totalRecords / PER_PAGE);

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
