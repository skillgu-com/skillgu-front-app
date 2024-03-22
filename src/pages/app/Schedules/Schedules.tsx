import React, {useCallback, useEffect, useMemo, useState} from 'react';
// Sections
import Empty from './components/Empty/Empty';
import Container from '@newComponents/Container/Container';
import {Title} from '@newComponents/typography';
import Button from '@newComponents/Button/Button';
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
import {fetchAllSchedules} from "../../../services/ScheduleService";
import {fetchMentorSession} from "../../../services/SessionService";

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
            console.log(res.data)
            const formatSchedules = res?.data.map((elementFromAPI: ScheduleCardProps) => ({

                id: elementFromAPI.id,
                dateStart: new Date(),
                dateEnd: new Date(),
                meetTime: elementFromAPI.meetTime,
                name: elementFromAPI?.scheduleName,
                schedule: {
                    type: elementFromAPI.schedule?.type || 'individual',
                    created: elementFromAPI.schedule?.created || new Date(),
                    assignedSessions: elementFromAPI.schedule?.assignedSessions ?? 0
                }
            }));
            // console.log(formatSchedules)

            setSchedules(formatSchedules);

        });
    }, []);

    useEffect(() => {
        fetchMentorSession(1).then(res => {
            const formattedSessions = res?.data.map((elementFromAPI: ScheduleCardProps) => ({
                id: elementFromAPI?.id,
                dateStart: new Date(),
                dateEnd: new Date(),
                name: elementFromAPI?.name,
                meetTime: elementFromAPI?.meetTime,
                session: {
                    price: elementFromAPI?.session?.price,
                    description: elementFromAPI?.session?.description,
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
                            <ScheduleCard removeItem={removeItem} {...item} />
                        ))}
                    </div>
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
                                <ScheduleCard removeItem={removeItem} {...item} />
                            ))}
                        </div>
                    )}
                </Container>
            </>
        );
    }, [schedules, sessions]);

    return <>{currentView}</>;
};

export default SchedulesView;
