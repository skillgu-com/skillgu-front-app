// Libraries
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ScrollContainer} from 'react-indiana-drag-scroll';
// Components
import {Title, Text} from 'src/new-components/typography';
import Tag from 'src/new-components/Tag/Tag';
// Types
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
// Styles
import styles from './ListSection.module.scss';
import {findRelatedUsersBasedOnRole} from "../../../../../services/UserProfileService";
import {useSelector} from "react-redux";
import {getRole} from "../../../../../redux/selectors/authSelectors";

const ITEMS_PLACEHOLDER = [
	{
		id: 'd01',
		name: 'Mateusz Kruk',
		date: '05.11.23',
		kind: 'Sesja',
		type: 'Sesja technicz na',
		status: {
			text: 'Kontynuacja',
			bgColor: '#ECF7F2',
		},
	},
	{
		id: 'd02',
		name: 'Anna Kula',
		date: '05.11.23',
		kind: 'Mentoring',
		type: 'Plan pro',
		status: {
			text: 'Zaplanowany',
			bgColor: '#FDF9E9',
		},
	},
	{
		id: 'd03',
		name: 'Jan Matulski',
		date: '05.11.23',
		kind: 'Sesja',
		type: 'Sprawdzenie CV',
		status: {
			text: 'Zakończony',
			bgColor: '#FBEAEF',
		},
	},
];

const ListSection = () => {
	const [users, setUsers] = useState<IUsersRelatedResponse[]>([]);
    const role = useSelector(getRole);

    useEffect(() => {
		findRelatedUsersBasedOnRole()
			.then((res) => {
				if (res.data.length > 0) {
					setUsers(res.data);
				} else {
					setUsers([]);
				}
			})
			.catch((reason) => {
				console.error(reason);
			});
	}, []);


    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <div>
                    <Title
                        classes={styles.headerTitle}
                        tag={TitleTag.h2}
                        variant={TitleVariant.standard}>
                        {role === 'S' ? 'Moi Mentorzy' : 'Moi Studenci'}
                    </Title>
                    <Text classes={styles.headerText}>Dokumentacja sesji</Text>
                </div>
                <Link to='/'>Zobacz więcej</Link>
            </div>
            <ScrollContainer className={styles.table}>
                <table>
                    <thead>
                    <tr>
                        <th>{role === 'S' ? 'Mentor' : 'Student'}</th>
                        <th>Data</th>
                        <th>Nazwa sesji</th>
                        <th>Typ sesji</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((element) => (
                        <tr key={element.id}>
                            <td>{element.firstName}</td>
                            <td>{element.startDate}</td>
                            <td>{element.sessionType}</td>
                            <td>
                                <Tag name={element.meetingType} />
                            </td>
                            <td>
                                <Tag name={element.sessionStatus} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </ScrollContainer>
        </section>
    );

};

export default ListSection;
