import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
// Sections
import Empty from "./components/Empty/Empty";
// Components
import {SectionTemplate} from "src/components/SectionTemplate";
import ScheduleCard, {
    ScheduleCardProps,
} from "src/components/Cards/ScheduleCard/ScheduleCard";
import Modal from "src/components/Modal/Modal";
import Pagination from "src/components/Pagination/Pagination";
import Button, {ButtonTag, ButtonVariant} from "src/components/Button/Button";
// Icons
import Add from "@icons/Add";
import Sessions from "@icons/Sessions";
// Styles
import scheduleStyles from "./Schedules.module.scss";
// Services
import {deleteSchedule} from "@services/scheduleService";
import {
    deleteSession,
    getMentorSessions,
} from "@services/session/sessionService";
// Reducers & Types
import {ScheduleType} from "@customTypes/schedule";
import {useSchedulesReducer} from "src/reducers/schedules";
import {getUserStripeIntegrationStatus} from "src/redux/selectors/authSelectors";
import {Tooltip} from "@mui/material";


const SchedulesView = () => {
    const [sessions, setSessions] = useState<ScheduleCardProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const userFromRedux = useSelector((state: any) => state.auth.user);

    const sr = useSchedulesReducer();

    useEffect(() => {
        if (!userFromRedux || !userFromRedux.id) {
            return;
        }

        getMentorSessions(userFromRedux.id).then((res) => {
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
                        scheduleId: elementFromAPI?.scheduleId,
                    },
                })
            );
            setSessions(formattedSessions);
        });
    }, [userFromRedux]);

    const schedules = sr.schedulesState.schedules.map(
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
            } as unknown as ScheduleCardProps;
        }
    );

    const removeItem = useCallback(
        (id: string, arrayType: "schedules" | "sessions") => {
            if (arrayType === "schedules") {
                setIsModalOpen(false);
                const assignedSession =
                    schedules.find((schedule) => schedule.id === id)?.schedule
                        ?.assignedSession || 0;

                if (assignedSession > 0) {
                    setIsModalOpen(true);
                } else {
                    deleteSchedule(id)
                    const copySchedules = sr.schedulesState.schedules.filter(
                      (item) => item.id.toString() !== id
                    );
                    sr.updateRecords(copySchedules); 
                }
            } else {
                deleteSession(id).then(() => {
                    setSessions(sessions.filter((item) => item.id !== id));
                });
                const scheduleId = sessions.find((item) => item.id === id)?.session
                    ?.scheduleId;
                const copySchedules = sr.schedulesState.schedules.map((item) => {
                    if (item.id === scheduleId) {
                        return {
                            ...item,
                            assignedSession: item.assignedSession - 1,
                        };
                    } else {
                        return item;
                    }
                });
                sr.updateRecords(copySchedules);
            }
        },
        [schedules, sr, sessions]
    );

    // Stripe integration status from Redux
    const userStripeIntegrationStatus = useSelector(
        getUserStripeIntegrationStatus
    );

    // Determine what to display based on the state of schedules and sessions
    const currentView = useMemo(() => {
        if (!schedules?.length) {
            return (
                <main className={scheduleStyles.main}>
                    <SectionTemplate
                        title="Harmonogramy spotkań "
                        description="Twoje harmonogramy i sesje, które utworzysz, pojawią się po prawej stronie Twojego profilu"
                    >
                        <div style={{opacity: userStripeIntegrationStatus ? 1 : 0.5}}>
                            {!userStripeIntegrationStatus ? (
                                <Tooltip
                                    title="Najpierw przejdź do rozliczeń aby zintegrować się ze Stripe"
                                    placement="bottom-start"
                                >
                                    <div>
                                        <Empty
                                            title=""
                                            text="Aby dodać sesję, najpierw ustal choć 1 harmonogram"
                                            button={{
                                                text: "Nowy harmonogram",
                                                link: "/schedules/add-schedule",
                                                disabled: !userStripeIntegrationStatus,
                                            }}
                                        />
                                    </div>
                                </Tooltip>
                            ) : (
                                <div>
                                    <Empty
                                        title=""
                                        text="Aby dodać sesję, najpierw ustal choć 1 harmonogram"
                                        button={{
                                            text: "Nowy harmonogram",
                                            link: "/schedules/add-schedule",
                                            disabled: !userStripeIntegrationStatus,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        {/* Domknięcie div, które obsługuje opacity */}
                    </SectionTemplate>
                </main>
            );
        }

        return (
            <main className={scheduleStyles.main}>
                <SectionTemplate
                    title="Harmonogramy"
                    description="Zdefiniuj podstawowe założenia spotkań oraz kiedy jesteś dostępny
          dla mentee. Utworzone harmonogramy wykorzystasz wielokrotnie tworząc
          konkretne sesje mentoringowe."
                    fullWidth
                    additionalContent={
                        <div className={scheduleStyles.btnBox}>
                            <Button
                                noWrap
                                as={ButtonTag.InternalLink}
                                variant={ButtonVariant.Outline}
                                href="/schedules/add-schedule"
                                classes={scheduleStyles.btn}
                                disableButton={!userStripeIntegrationStatus}
                            >
                                Nowy harmonogram <Add color="currentColor"/>
                            </Button>
                        </div>
                    }
                >
                    <div className={scheduleStyles.list}>
                        {Array.isArray(schedules) &&
                            schedules.map((item) => (
                                <ScheduleCard key={item.id} removeItem={removeItem} {...item} />
                            ))}
                    </div>
                    {sessions?.length > 3 && <Pagination name="Schedules" maxPage={0}/>}
                </SectionTemplate>

                <SectionTemplate
                    title="Sesje"
                    description="Zaplanuj sesje monitoringowe określając cenę i ich dokładną
            tematykę."
                    fullWidth
                    additionalContent={
                        !!sessions?.length && (
                            <div className={scheduleStyles.btnBox}>
                                <Button
                                    as={ButtonTag.InternalLink}
                                    variant={ButtonVariant.Outline}
                                    href="/schedules/add-session"
                                    classes={scheduleStyles.btn}
                                >
                                    Nowa sesja <Add color="currentColor"/>
                                </Button>
                            </div>
                        )
                    }
                >
                    {!sessions?.length ? (
                        <Empty
                            text="Dodałeś właśnie swój pierwszy harmonogram!
					Utwórz teraz nową sesję"
                            button={{text: "Nowa sesja", link: "/schedules/add-session"}}
                            icon={<Sessions/>}
                        />
                    ) : (
                        <div className={scheduleStyles.list}>
                            {sessions.map((item) => (
                                <ScheduleCard key={item.id} removeItem={removeItem} {...item} />
                            ))}
                        </div>
                    )}
                    {sessions?.length > 6 && <Pagination name="Sessions" maxPage={3}/>}
                </SectionTemplate>
            </main>
        );
    }, [schedules, sessions, removeItem, userStripeIntegrationStatus]);

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
