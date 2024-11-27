import React, {useEffect, useRef} from "react";
import {SessionsHistory} from "./SessionsHistory";
import {fetchMentorMeetingHistory} from "@services/meetingAndSubscriptionHistory/meetingHistoryService";
import { PER_PAGE, useSessionsReducer } from "src/reducers/sessions";

export const MentorSessionsHistory = () => {
    const sr = useSessionsReducer();
    const pageRef = useRef<number>(0);

    useEffect(() => {
        const fetchData = async (page: number) => {
            sr.setPending(true);
            try {
                const {mentee, total} = await fetchMentorMeetingHistory({
                    sortBy: "status",
                    sortMethod: "ASC",
                    skip: PER_PAGE * (page - 1),
                    take: PER_PAGE,
                });

                sr.updateRecords(mentee, total);
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

    return <SessionsHistory getProfileLink={(userName: string) => `/student/${userName}`}/>;
};


