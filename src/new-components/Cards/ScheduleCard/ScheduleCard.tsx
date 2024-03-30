import React from 'react';
import {useNavigate} from 'react-router-dom';
// Components
import Options from './components/Options/Options';
// Icons
import Money from './components/icons/Money';
import Calendar from './components/icons/Calendar';
import Timer from './components/icons/Timer';
import Person from './components/icons/Person';
import Pencil from 'src/pages/app/Schedules/components/icons/Pencil';
import Trash from 'src/pages/app/Schedules/components/icons/Trash';
// Styles
import styles from './ShceduleCard.module.scss';

export interface ScheduleCardProps {
    id: string;
    dateStart: Date;
    dateEnd: Date;
    scheduleStartDay: string;
    scheduleEndDay: string
    meetTime: number;
    title: string;
    scheduleName: string;
    sessionTypeName: string;
    removeItem?: (id: string, arrayType: 'schedules' | 'sessions') => void;
    assignedSession: number;
    type: string;
    participant: number;
    sessionType: string;
    description: string;
    sessionPrice: number;
    sessionName: string

    schedule?: {
        type: 'individual' | 'group';
        created: Date;
        assignedSession: number;
        scheduleName: string,
        participant: number
    };
    session?: {
        name: string;
        description: string;
        sessionPrice: number;
        sessionName: string
        meetTime: number
        sessionTypeName: string;
        scheduleName: string;
    };
}

const ScheduleCard = (props: ScheduleCardProps) => {
    if (!!!props.schedule && !!!props.session)
        throw new Error('One of parameters schedule or session is required!');

    const {id, dateStart, dateEnd, meetTime, scheduleName, schedule, session, sessionTypeName, removeItem} = props;

    console.log(props)

    const navigate = useNavigate();

    const handleEditClick = () => {
        console.log('Edycja')
        navigate(!!session ? `/schedules/edit-session/${id}` : `/schedules/edit-schedule/${id}`);
    };

    const handleDeleteClick = () => {
        !!removeItem && removeItem(id, !!session ? 'sessions' : 'schedules');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h3 className={styles.title}>{schedule ? schedule?.scheduleName : session?.sessionTypeName}</h3>
                <Options
                    options={[
                        {
                            icon: <Pencil/>,
                            text: 'Edytuj',
                            onClick: handleEditClick,
                        },
                        {
                            icon: <Trash/>,
                            text: 'Usuń',
                            onClick: handleDeleteClick,
                        },
                    ]}
                />
            </div>
            {!!schedule && (
                <>
                    <p>Data stworzenia: {schedule.created.toLocaleDateString()}</p>
                </>
            )}
            {!!schedule && (
                <p data-is-assigned={schedule.assignedSession !== 0}>
                    {schedule.assignedSession === 0
                        ? 'Brak przypisanej sesji!'
                        : `Używany w ${schedule.assignedSession} ${
                            schedule.assignedSession === 1 ? 'sesji' : 'sesjach'
                        }`}
                </p>
            )}
            {!!session && (
                <>
                    <p>{session.description}</p>
                </>
            )}

            <div className={styles.bottom}>
                {schedule?.type && (
                    <p>
                        <Person/> {schedule.type === 'group' ? 'Grupowe' : '1:1'}
                    </p>
                )}
                {session?.sessionPrice && (
                    <p>
                        <Money/> {session.sessionPrice} zł
                    </p>
                )}
                {session && (
                    <>
                        {/*<p>{session.scheduleName}</p>*/}
                        <p> Przypisany do: {session.scheduleName}</p>
                    </>
                )}

                {!session && dateStart && dateEnd && (
                    <p>
                        <Calendar/> {dateStart.toLocaleDateString()} - {dateEnd.toLocaleDateString()}
                    </p>
                )}
                {meetTime && (
                    <p>
                        <Timer/>
                        {meetTime} min
                    </p>
                )}
            </div>
        </div>
    );
};

export default ScheduleCard;
