import React, {ReactNode, useCallback} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import styles from "./SessionsHistory.module.scss";
import {PER_PAGE, useSessionsReducer} from "src/reducers/sessions";
import {Table, TableCell, TableRow} from "src/components/_base/Table";
import {Pagination} from "src/components/_grouped";
import {formatDate} from "src/utils";
import {Status} from "src/components/_base/Status";
import {SkeletonRow} from "./SkeletonRow";
import {Skeleton} from "@mui/material";
import {UserIdentity} from "src/components/_base/UserIdentity";
import {Scrollable} from "src/components/_base/Scrollable";
import {EmptyState} from "src/components/EmptyState";

import {getRole} from "src/redux/selectors/authSelectors";

type Props = {
    title?: string;
    subtitle?: ReactNode;
    getProfileLink: (username: string) => string;
};
const targetPath = '/calendar';

export const SessionsHistory = ({
                                    title = "Historia Twoich spotkań",
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
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
            </div>
            {sr.sessionsState.pending ? (
                <Table className={styles.table}>
                    <TableRow heading>
                        <TableCell
                            flex={4}
                            heading
                            text={role === "M" ? "Mentee" : "Mentor"}
                        />
                        <TableCell flex={3} heading text="Data"/>
                        <TableCell flex={3} heading text="Status"/>
                        <TableCell flex={3} heading text="Rodzaj"/>
                        <TableCell flex={4} heading text="Typ"/>
                    </TableRow>
                    {new Array(PER_PAGE).fill(null).map((_, i) => (
                        <SkeletonRow key={i}/>
                    ))}
                    <TableRow borderTop>
                        <TableCell flex>
                            <div className={styles.PaginationSkeleton}>
                                <Skeleton
                                    style={{width: "60px"}}
                                    variant="text"
                                    sx={{fontSize: "1em"}}
                                />
                                <Skeleton
                                    style={{width: "60px"}}
                                    variant="text"
                                    sx={{fontSize: "1em"}}
                                />
                                <Skeleton
                                    style={{width: "60px"}}
                                    variant="text"
                                    sx={{fontSize: "1em"}}
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
                                <TableCell flex={3} heading text="Data"/>
                                <TableCell flex={3} heading text="Status"/>
                                <TableCell flex={3} heading text="Rodzaj"/>
                                <TableCell flex={4} heading text="Typ "/>
                            </TableRow>

                            {sessions.map((s, ind) => (
                                <TableRow
                                    key={`${s.id}-${ind}`}
                                    onClick={() => {
                                        navigate(targetPath);
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
                                        {formatDate(s.date, "DD.MM.YYYY")}
                                    </TableCell>
                                    <TableCell flex={3}>
                                        {s.status === "planned" ? (
                                            <Status noWrap variant="info" text="Zaplanowane"/>
                                        ) : s.status === "cancelled" ? (
                                            <Status noWrap variant="danger" text="Odwołana"/>
                                        ) : s.status === "in-progress" ? (
                                            <Status noWrap variant="info" text="W trakcie"/>
                                        ) : s.status === "completed" ? (
                                            <Status noWrap variant="success" text="Zrealizowana"/>
                                        ) : s.status === "active" ? (
                                            <Status noWrap variant="success" text="Aktywna"/>
                                        ) : s.status === "awaiting" ? (
                                            <Status noWrap variant="warning" text="Oczekująca"/>
                                        ) : s.status === "rejected" ? (
                                            <Status noWrap variant="danger" text="Odrzucona"/>
                                        ) : s.status === "accepted" ? (
                                            <Status noWrap variant="info" text="Zaakceptowana"/>
                                        ) : s.status === "suspended" ? (
                                            <Status noWrap variant="warning" text="Zawieszona"/>
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
                            <TableRow heading className={styles.emptyStateHeading}>
                                <TableCell heading text={role === "M" ? "Mentee" : "Mentor"}/>
                                <TableCell heading text="Data"/>
                                <TableCell heading text="Status"/>
                                <TableCell
                                    heading
                                    text="Rodzaj"
                                    className={styles.mobileHidden}
                                />
                                <TableCell heading text="Typ" className={styles.mobileHidden}/>
                            </TableRow>
                            <TableRow>
                                <TableCell flex>
                                    <EmptyState text="Nie znaleziono żadnych Twoich sesji"/>
                                </TableCell>
                            </TableRow>
                        </>
                    )}
                </Table>
            )}
        </div>
    );
};
