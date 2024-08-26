import React, { useCallback, useEffect, useMemo, useState } from "react";
// Sections
import Empty from "./components/Empty/Empty";
// Components

// Icons
import Add from "@icons/Add";
import Sessions from "@icons/Sessions";
// Types
import { Tag } from "@customTypes/tags";

// Styles
import scheduleStyles from "./Schedules.module.scss";

import {useDispatch, useSelector} from "react-redux";
import ScheduleCard, {
  ScheduleCardProps,
} from "../../../components/Cards/ScheduleCard/ScheduleCard";
import Title, {
  TitleTag,
  TitleVariant,
} from "../../../components/typography/Title/Title";
import Modal from "../../../components/Modal/Modal";
import Pagination from "../../../components/Pagination/Pagination";
import Container from "../../../components/Container/Container";
import Button, {
  ButtonTag,
  ButtonVariant,
} from "../../../components/Button/Button";
import { deleteSchedule } from "@services/scheduleService";
import {
  deleteSession,
  getMentorSessions,
} from "@services/session/sessionService";
import styles from "../MentorPaymentIntegration/styles.module.scss";
import { useSchedulesReducer } from "src/reducers/schedules";
import { ScheduleType } from "@customTypes/schedule";
import { getUserStripeIntegrationStatus } from "src/redux/selectors/authSelectors";
import {SchedulesAction} from "../../../reducers/schedules/types";


const SchedulesView = () => {

  const [sessions, setSessions] = useState<ScheduleCardProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const userFromRedux = useSelector((state: any) => state.auth.user);
  const sr = useSchedulesReducer()

  const schedules : ScheduleCardProps[] = sr.schedulesState.schedules.map(
    (elementFromAPI: ScheduleType) => {
      return {
        id: elementFromAPI.id.toString(),
        dateStart: new Date(elementFromAPI?.scheduleStartDay),
        dateEnd: new Date(elementFromAPI?.scheduleEndDay),
        scheduleStartDay: new Date(elementFromAPI?.scheduleStartDay),
        scheduleEndDay: new Date(elementFromAPI?.scheduleEndDay),
        meetTime: elementFromAPI.meetTime,
        participant: elementFromAPI?.participant,
        schedule: {
          type: elementFromAPI?.type,
          created: new Date(),
          assignedSession: elementFromAPI.assignedSession ?? 0,
          scheduleName: elementFromAPI?.scheduleName,
          participant: elementFromAPI?.participant,
        },
      } as unknown as ScheduleCardProps
    }
  )

  const removeItem = useCallback(
    (id: string, arrayType: "schedules" | "sessions") => {
      if (arrayType === "schedules") {
        setIsModalOpen(false);
        const assignedSession =
          schedules.find((schedule) => schedule.id === id)?.schedule
            ?.assignedSession || 0;
        console.log("BEFORE Delete", {  id, arrayType, assignedSession })
        if (assignedSession > 0) {
          setIsModalOpen(true);
        } else {
          deleteSchedule(id).then(() => {
            sr.reset()
          });
        }
      } else {
        deleteSession(id).then(() => {
          setSessions(sessions.filter((item) => item.id !== id));
        });
      }
    },
    [schedules, sessions]
  );

  useEffect(() => {
    getMentorSessions(userFromRedux.id,"empty_user").then((res) => {
      const formattedSessions = res?.data.map(
        (elementFromAPI: ScheduleCardProps) => ({
          id: elementFromAPI?.id.toString(),
          dateStart: new Date(elementFromAPI?.scheduleStartDay),
          dateEnd: new Date(elementFromAPI?.scheduleEndDay),
          meetTime: elementFromAPI?.meetTime,
          session: {
            description: elementFromAPI?.description,
            sessionPrice: elementFromAPI?.sessionPrice,
            meetTime: elementFromAPI?.meetTime,
            sessionName: elementFromAPI?.sessionName,
            sessionTypeName: elementFromAPI?.sessionType,
            scheduleName:
              elementFromAPI?.scheduleName || "brak przypisanego harmonogramu",
          },
        })
      );
      setSessions(formattedSessions);
    });
  }, [userFromRedux.id]);


  const userStripeIntegrationStatus = useSelector(getUserStripeIntegrationStatus);

  const currentView = useMemo(() => {
    if (!!!schedules?.length)
      return (
        <Empty
          title="Harmonogram spotkań"
          text="Aby dodać sesję, najpierw ustal choć 1 harmonogram"
          button={{ text: "Nowy harmonogram", link: "/schedules/add-schedule" }}
        />
      );

//     console.log('testuje tutaj:',schedules)
// //TODO to delete
//     // const resetSchedules = () => {
//     //   const action: SchedulesAction = { type: "SCHEDULES_RESET" };
//     //   dispatch(action);
//     // };
    return (
      <main className={scheduleStyles.main}>
        <Container as={Tag.Section} classes={scheduleStyles.container}>
          <header className={scheduleStyles.header}>
            <Title
              tag={TitleTag.h2}
              variant={TitleVariant.section}
              classes={scheduleStyles.title}
            >
              Harmonogramy
            </Title>
            //TODO delete this button !!
            {/*<div>*/}
            {/*  <button onClick={resetSchedules}>Reset Schedules</button>*/}
            {/*</div>*/}
            <Button
              noWrap
              as={ButtonTag.InternalLink}
              variant={ButtonVariant.Outline}
              href="/schedules/add-schedule"
              classes={scheduleStyles.btn}
              disableButton={!userStripeIntegrationStatus}
            >
              Nowy harmonogram <Add color="currentColor" />
            </Button>
          </header>
          <p className={styles.description}>
            Zdefiniuj podstawowe założenia spotkań oraz kiedy jesteś dostępny
            dla mentee. Utworzone harmonogramy wykorzystasz wielokrotnie tworząc
            konkretne sesje mentoringowe.
          </p>
          <div className={scheduleStyles.list}>
            {Array.isArray(schedules) && schedules.map((item) => (
              <ScheduleCard key={item.id} removeItem={removeItem} {...item} />
            ))}
          </div>
          {sessions?.length > 3 && <Pagination name="Schedules" maxPage={0} />}
        </Container>

        <Container as={Tag.Section} classes={scheduleStyles.container}>
          <header className={scheduleStyles.header}>
            <Title tag={TitleTag.h2} variant={TitleVariant.section}>
              Sesje
            </Title>
            {!!sessions?.length && (
              <Button
                as={ButtonTag.InternalLink}
                variant={ButtonVariant.Outline}
                href="/schedules/add-session"
                classes={scheduleStyles.btn}
              >
                Nowa sesja <Add color="currentColor" />
              </Button>
            )}
          </header>
          <p className={styles.description}>
            Zaplanuj sesje monitoringowe określając cenę i ich dokładną
            tematykę.
          </p>
          {!sessions?.length ? (
            <Empty
              text="Dodałeś właśnie swój pierwszy harmonogram!
					Utwórz teraz nową sesję"
              button={{ text: "Nowa sesja", link: "/schedules/add-session" }}
              icon={<Sessions />}
            />
          ) : (
            <div className={scheduleStyles.list}>
              {sessions.map((item) => (
                <ScheduleCard key={item.id} removeItem={removeItem} {...item} />
              ))}
            </div>
          )}
          {sessions?.length > 6 && <Pagination name="Sessions" maxPage={3} />}
        </Container>
      </main>
    );
  }, [schedules, sessions, removeItem]);

  return (
    <>
      {currentView}
      {isModalOpen && (
        <Modal
          title="Nie możesz usunąć harmonogramu"
          closeHandler={() => setIsModalOpen(false)}
          classNameContent={scheduleStyles.modalContent}
        >
          <p className={scheduleStyles.modalText}>
            Nie można usunąć harmonogramu, ponieważ jest on przypisany do{" "}
            <span>tej sesji.</span>
          </p>
        </Modal>
      )}
    </>
  );
};

export default SchedulesView;
