import React, {useCallback, useEffect, useMemo, useState} from 'react';
// Sections
import Empty from './components/Empty/Empty';
// Components
import Container from '@newComponents/Container/Container';
import {Title} from '@newComponents/typography';
import Button from '@newComponents/Button/Button';
import Pagination from '@newComponents/Pagination/Pagination';
// Icons
import Add from '@icons/Add';
import Sessions from '@icons/Sessions';
// Types
import {Tag} from '@customTypes/tags';
import {TitleTag, TitleVariant} from '@newComponents/typography/Title/Title';
import {ButtonTag, ButtonVariant} from '@newComponents/Button/Button';
import ScheduleCard, {
    ScheduleCardProps,
} from '@newComponents/Cards/ScheduleCard/ScheduleCard';
// Styles
import styles from './components/Empty/Empty.module.scss';
import scheduleStyles from './Schedules.module.scss';
import {fetchMentorSession} from "../../../services/SessionService";
import {fetchAllSchedules} from "../../../services/ScheduleService";

const SchedulesView = () => {
    const [sessions, setSessions] = useState<ScheduleCardProps[]>([]);
    const [schedules, setSchedules] = useState<ScheduleCardProps[]>([]);

    const removeItem = useCallback(
        (id: string, arrayType: 'schedules' | 'sessions') => {
            arrayType === 'schedules'
                ? setSchedules(schedules.filter((item) => item.id !== id))
                : setSessions(sessions.filter((item) => item.id !== id));
        },
        [schedules, sessions]
    );

    useEffect(() => {
        fetchAllSchedules().then(res => {
            const formatSchedules = res?.data.map((elementFromAPI: ScheduleCardProps) => ({
                id: elementFromAPI.id,
                dateStart: new Date(),
                dateEnd: new Date(),
                meetTime: elementFromAPI.meetTime,
                scheduleName: elementFromAPI?.scheduleName,
                schedule: {
                    type: elementFromAPI.schedule?.type || 'individual',
                    created: elementFromAPI.schedule?.created || new Date(),
                    assignedSessions: elementFromAPI.schedule?.assignedSessions ?? 0
                }
            }));
            setSchedules(formatSchedules);

        });
    }, []);

    useEffect(() => {
        fetchMentorSession(1).then((res) => {

        })
    })

    useEffect(() => {
        fetchMentorSession(1).then(res => {
            const formattedSessions = res?.data.map((elementFromAPI: any) => ({
                id: elementFromAPI?.id,
                scheduleName:elementFromAPI?.name,
                dateStart: new Date(),
                dateEnd: new Date(),
                meetTime: elementFromAPI?.meetTime,
                session: {
                    description: elementFromAPI?.description,
                    sessionPrice: elementFromAPI?.sessionPrice,
                    meetTime: 'elementFromAPI?.meetTime',
                },
            }));

            setSessions(formattedSessions);

        });
    }, []);

    const currentView = useMemo(() => {
        if (!!!schedules?.length)
            return (
                <Empty
                    title='Harmonogram spotkań'
                    text='Aby dodać sesję, najpierw ustal choć 1 harmonogram'
                    button={{text: 'Nowy harmonogram', link: '/schedules/add-schedule'}}
                />
            );

        return (
            <>
                <main className={scheduleStyles.main}>
                    <Container as={Tag.Section} classes={scheduleStyles.container}>
                        <header className={scheduleStyles.header}>
                            <Title tag={TitleTag.h2} variant={TitleVariant.section}>
                                Harmonogramy
                            </Title>
                            <Button
                                as={ButtonTag.InternalLink}
                                variant={ButtonVariant.Outline}
                                href='/schedules/add-schedule'
                                classes={styles.button}>
                                Dodaj <Add/>
                            </Button>
                        </header>
                        <div className={scheduleStyles.list}>
                            {schedules.map((item) => (
                                <ScheduleCard key={item.id} removeItem={removeItem} {...item} />
                            ))}
                        </div>
                        <Pagination name='Schedules' maxPage={20}/>
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
                                    href='/schedules/add-session'
                                    classes={styles.button}>
                                    Dodaj <Add/>
                                </Button>
                            )}
                        </header>
                        {!!!sessions?.length ? (
                            <Empty
                                text='Dodałeś właśnie swój pierwszy harmonogram!
					Utwórz teraz nową sesję'
                                button={{text: 'Nowa sesja', link: '/schedules/add-session'}}
                                icon={<Sessions/>}
                            />
                        ) : (
                            <div className={scheduleStyles.list}>
                                {sessions.map((item) => (
                                    <ScheduleCard key={item.id} removeItem={removeItem} {...item} />
                                ))}
                            </div>
                        )}
                        <Pagination name='Sessions' maxPage={3}/>
                    </Container>
                </main>
            </>
        );
    }, [schedules, sessions]);

    return <>{currentView}</>;
};

export default SchedulesView;
