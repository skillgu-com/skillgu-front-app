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
	meetTime: number;
	title: string;
	scheduleName: string;
	removeItem?: (id: string, arrayType: 'schedules' | 'sessions') => void;
	schedule?: {
		type: 'individual' | 'group';
		created: Date;
		assignedSessions: number;
	};
	session?: {
		description: string;
		price: number;
	};
}

const ScheduleCard = (props: ScheduleCardProps) => {
	if (!!!props.schedule && !!!props.session)
		throw new Error('One of parameters schedule or session is required!');

	const {id, dateStart, dateEnd, meetTime, scheduleName, schedule, session, removeItem} = props;

	const navigate = useNavigate();

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<h3 className={styles.title}>{scheduleName}</h3>
				<Options
					options={[
						{
							icon: <Pencil />,
							text: 'Edytuj',
							onClick: () => {
								navigate(!!session ? `/schedules/edit-session/${id}` : `/schedules/edit-schedule/${id}`);
							},
						},
						{
							icon: <Trash />,
							text: 'Usuń',
							onClick: () => {
								!!removeItem && removeItem(id, !!session ? 'sessions' : 'schedules')
							},
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
				<p data-is-assigned={schedule.assignedSessions !== 0}>
					{schedule.assignedSessions === 0
						? 'Brak przypisanej sesji!'
						: `Używany w ${schedule.assignedSessions} ${
								schedule.assignedSessions === 1 ? 'sesji' : 'sesjach'
						  }`}
				</p>
			)}
			{!!session && <p>{session.description}</p>}
			<div className={styles.bottom}>
				{schedule?.type && (
					<p>
						<Person /> {schedule.type === 'group' ? 'Grupowe' : '1:1'}
					</p>
				)}
				{session?.price && (
					<p>
						<Money /> {session.price} zł
					</p>
				)}
				{dateStart && dateEnd && (
					<p>
						<Calendar /> {dateStart.toLocaleDateString()} -{' '}
						{dateEnd.toLocaleDateString()}
					</p>
				)}
				{meetTime && (
					<p>
						<Timer />
						{meetTime} min
					</p>
				)}
			</div>
		</div>
	);
};

export default ScheduleCard;
