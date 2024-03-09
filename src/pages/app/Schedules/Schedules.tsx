import React, {useMemo, useState} from 'react';
// Sections
import Empty from './components/Empty/Empty';
import Container from '@newComponents/Container/Container';
import {Title} from '@newComponents/typography';
import Button from '@newComponents/Button/Button';
// Icons
import Add from '@icons/Add';
import Sessions from '@icons/Sessions';
import Trash from './components/icons/Trash';
import Pencil from './components/icons/Pencil';
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
import {Option} from '@newComponents/Cards/ScheduleCard/components/Options/Options';

const SchedulesView = () => {
	const schedulesOptions = (id: string): Option[] => [
		{
			icon: <Pencil/>,
			text: 'Edytuj',
			onClick: () => {
				console.log(id);
			},
		},
		{
			icon: <Trash/>,
			text: 'Usuń',
			onClick: () => {
				console.log(id);
			},
		},
	];
	const sessionsOptions: Option[] = [];

	const [schedules, setSchedules] = useState<ScheduleCardProps[]>([
		{
			id: '01',
			title: 'Test',
			dateStart: new Date(),
			dateEnd: new Date(),
			time: 60,
			schedule: {type: 'individual', created: new Date(), assignedSessions: 1},
			options: schedulesOptions('01'),
		},
		{
			id: '02',
			title: 'Test',
			dateStart: new Date(),
			dateEnd: new Date(),
			time: 60,
			schedule: {type: 'group', created: new Date(), assignedSessions: 0},
			options: schedulesOptions('02'),
		},
	]);
	const [sessions, setSessions] = useState<ScheduleCardProps[]>([
		{
			id: '01',
			title: 'Test',
			dateStart: new Date(),
			dateEnd: new Date(),
			time: 60,
			options: sessionsOptions,
			session: {
				price: 250,
				description:
					'Figma ipsum component variant main layer. Arrange arrange reesizing selection ellipse. Union bold content distribute share fill variant rectangle. Duplicate editor device follower share. Union boolean overflow union align.',
			},
		},
	]);

	const currentView = useMemo(() => {
		if (!!!schedules.length)
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
							Dodaj <Add />
						</Button>
					</header>
					<div>
						{schedules.map((item) => (
							<ScheduleCard {...item} />
						))}
					</div>
				</Container>
				<Container as={Tag.Section} classes={scheduleStyles.container}>
					<header className={scheduleStyles.header}>
						<Title tag={TitleTag.h2} variant={TitleVariant.section}>
							Sesje
						</Title>
						{!!sessions.length && (
							<Button
								as={ButtonTag.InternalLink}
								variant={ButtonVariant.Outline}
								href='/schedules/add-session'
								classes={styles.button}>
								Dodaj <Add />
							</Button>
						)}
					</header>
					{!!!sessions.length ? (
						<Empty
							text='Dodałeś właśnie swój pierwszy harmonogram! 
					Utwórz teraz nową sesję'
							button={{text: 'Nowa sesja', link: '/schedules/add-session'}}
							icon={<Sessions />}
						/>
					) : (
						<div>
							{sessions.map((item) => (
								<ScheduleCard {...item} />
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
