// Libraries
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
// Selectors
import {getEmail, getRole} from 'src/redux/selectors/authSelectors';
// Components
import {Title} from 'src/new-components/typography';
import MiniUserCard from 'src/new-components/Cards/MiniUserCard/MiniUserCard';
// Types
import {
	TitleTag,
	TitleVariant,
} from 'src/new-components/typography/Title/Title';
// Styles
import styles from './ProfileSection.module.scss';
import Tag from 'src/new-components/Tag/Tag';
import {getAllMentorCategories} from "../../../../../services/MentorViewService";
import {getSessionNumber} from "../../../../../services/SessionService";

const USERS_PLACEHOLDER = [
	{
		id: 'test',
		name: 'Product manager key advisor',
		link: '/',
		image: 'https://cdn.pixabay.com/photo/2023/12/08/07/27/woman-8437007_640.jpg',
	},
	{
		id: 'test 2',
		name: 'Product manager key advisor',
		link: '/',
		image: 'https://cdn.pixabay.com/photo/2023/12/08/07/27/woman-8437007_640.jpg',
	},
	{
		id: 'test 3',
		name: 'Product manager key advisor',
		link: '/',
		image: 'https://cdn.pixabay.com/photo/2023/12/08/07/27/woman-8437007_640.jpg',
	},
];

const ProfileSection = () => {
	const role = useSelector(getRole);
	const email = useSelector(getEmail);
	const [usersList, setUsersList] = useState(USERS_PLACEHOLDER);
	const[sessionNumber, setSessionNumber] = useState(0);


	useState(() => {
		getSessionNumber().then((res) => {
			setSessionNumber(res?.data)
		})
	})

	return (
		<section className={styles.wrapper}>
			<div className={styles.user}>
				<div className={styles.userProfile}>
					<img
						src='https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg'
						alt='Jan Kowalski'
					/>
				</div>
				<Title
					classes={styles.userName}
					tag={TitleTag.h2}
					variant={TitleVariant.standard}>
					{email}
				</Title>
				<h3 className={styles.userPosition}>UI/UX Design</h3>
				<div className={styles.userAttributes}>
					<h4 className={styles.userAttributesItem}>
						{sessionNumber ?? 0}<small>Sesji</small>
					</h4>
					{role === 'M' && (
						<>
							<h4 className={styles.userAttributesItem}>
								180 zł<small>Stawka godz.</small>
							</h4>
							<h4 className={styles.userAttributesItem}>
								8/10<small>Ocena</small>
							</h4>
						</>
					)}
				</div>
			</div>
			<Title tag={TitleTag.h2} variant={TitleVariant.standard}>
				{role === 'M' ?  'Podobni do Ciebie':'Proponowani Mentorzy'}
			</Title>
			<div className={styles.list}>
				{usersList.map((user) => (
					<MiniUserCard {...user} key={user.id} />
				))}
			</div>
			<Title tag={TitleTag.h2} variant={TitleVariant.standard}>
				Tagi
			</Title>
			<div className={styles.tags}>
				<Tag name='Mobile App' />
				<Tag name='Landing Page' />
			</div>
		</section>
	);
};

export default ProfileSection;
