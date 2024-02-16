// Libraries
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// Components
import AppHeader from 'src/new-components/AppHeader/AppHeader';
import Container from 'src/new-components/Container/Container';
// Selectors
import {getRole} from 'src/redux/selectors/authSelectors';
// Sections
import NavSection from './sections/NavSection/NavSection';
import ProfileSection from './sections/ProfileSection/ProfileSection';
import ListSection from './sections/ListSection/ListSection';
// Types
import {Tag} from 'src/types/tags';
// Styles
import styles from './HomePage.module.scss';
import {fetchAllUserData, fetchUserIDByEmail} from "../../../services/UserProfileService";

const HomePage = () => {
	const role = useSelector(getRole);
	const dispatch = useDispatch();
	const userFromRedux = useSelector((state: any) => state.auth.user);


	useEffect(() => {
		fetchAllUserData().then((res) => {
			dispatch({
				type: 'FETCH_ALL_USER_DATA',
				payload: {
					firstName:res?.data.firstName,
					lastName:res?.data.lastName
					// linkedInURL: res?.data.linkedInURL,
					// youtubeURL: res?.data.youtubeURL,
					// instagramURL: res?.data.instagramURL,
					// facebookURL: res?.data.facebookURL,
					// websiteURL: res?.data.websiteURL,
					// youtube: res?.data.youtube,
					// description: res?.data.description,
					// firstName: res?.data.firstName,
					// lastName: res?.data.lastName,
					// jobPosition: res?.data.jobPosition,
					// skill: res?.data.payload.skill
				},
			});
		}).catch((error) => {
			console.error('Failed to fetch user data:', error);
		});
	}, [dispatch]);



	console.log(userFromRedux)


	return (
		<>
			<AppHeader
				title={role === 'M' ? 'Witaj Mentorze!' : 'Witaj Studencie!'}
				text='Zarządzaj i sprawdzaj swoje spotkania, zadania, informacje.'
			/>
			<Container as={Tag.Main} classes={styles.wrapper}>
				<NavSection />
				<ProfileSection />
				<ListSection />
			</Container>
		</>
	);
};

export default HomePage;
