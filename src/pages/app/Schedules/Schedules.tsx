import React, {useMemo, useState} from 'react';
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
// Styles
import styles from './components/Empty/Empty.module.scss';
import scheduleStyles from './Schedules.module.scss';

const SchedulesView = () => {
	const [schedules, setSchedules] = useState([]);
	const [sessions, setSessions] = useState([]);

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
				<Container as={Tag.Section}>
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
				</Container>
				<Container as={Tag.Section}>
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
						<></>
					)}
				</Container>
			</>
		);
	}, [schedules, sessions]);

	return <>{currentView}</>;
};

export default SchedulesView;
