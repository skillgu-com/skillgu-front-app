// Libraries
import React from 'react';
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

const ListSection = () => {
	return (
		<section className={styles.wrapper}>
			<div className={styles.header}>
				<div>
					<Title
						classes={styles.headerTitle}
						tag={TitleTag.h2}
						variant={TitleVariant.standard}>
						Moi Mentorzy
					</Title>
					<Text>Dokumentacja sesji</Text>
				</div>
				<Link to='/'>Zobacz więcej</Link>
			</div>
			<ScrollContainer className={styles.table}>
				<table>
					<thead>
						<tr>
							<th>Mentor</th>
							<th>Data</th>
							<th>Rodzaj</th>
							<th>Typ</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Mateusz Kruk</td>
							<td>05.11.23</td>
							<td>Sesja</td>
							<td><Tag text='Sesja technicz na'/></td>
							<td><Tag text='Kontynuacja' bgColor='#ECF7F2' /></td>
						</tr>
					</tbody>
				</table>
			</ScrollContainer>
		</section>
	);
};

export default ListSection;
