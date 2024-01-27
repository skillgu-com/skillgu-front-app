// Libraries
import React, {useEffect, useState} from 'react';
// Components
import AppHeader from 'src/new-components/AppHeader/AppHeader';
import Container from 'src/new-components/Container/Container';
import {defaultInput} from 'src/new-components/Input/Input';
// Hooks
import {useAccountType} from 'src/hooks/useAccountType';
// Sections
import DeleteAccount from './sections/DeleteAccount/DeleteAccount';
import Specification from './sections/Specyfication/Specification';
import ChangePassword from './sections/ChangePassword/ChangePassword';
import YourData from './sections/YourData/YourData';
// API
import {fetchAllUserData} from 'src/services/UserProfileService';
// Types
import {Tag} from 'src/types/tags';
// Styles
import styles from './Settings.module.scss';
import {
	getAllMentorCategories,
	getAllMentorServices,
	getAllMentoringTopics,
	getAllSkills,
} from 'src/services/MentorViewService';

export interface UserData {
	userID: number;
	firstName: string;
	lastName: string;
	age: number;
	email: string;
	user_role: null | string;
	agreement: true;
	description: string;
	location: null | string;
	role: string;
	linkedInURL: string | null;
	youtubeURL: string | null;
	instagramURL: string | null;
	facebookURL: string | null;
	websiteURL: string | null;
	timeZone: string;
	language: {
		id: number;
		name: string;
	}[];
	services: {
		id: number;
		name: string;
	}[];
	skill: {
		id: number;
		name: string;
	}[];
	mentorTopics: {
		id: number;
		name: string;
	}[];
	jobPosition: {
		id: number;
		name: string;
	}[];
	mentorCategory: {
		id: number;
		name: string;
	}[];
	xurl: string | null;
}

const Settings = () => {
	const [userData, setUserData] = useState<UserData>({} as UserData);
	const [mentorForm, setMentorForm] = useState<any>();
	const {isMentor} = useAccountType();

	useEffect(() => {
		fetchAllUserData().then((res) => setUserData(res.data as UserData));
	}, []);

	useEffect(() => {
		Promise.all([
			getAllSkills(),
			getAllMentorCategories(),
			getAllMentoringTopics(),
			getAllMentorServices(),
		]).then(([skillsRes, mentorCategories, mentorTopics, mentorServices]) => {
			let transformedSkills: any = [];
			skillsRes.data.map((category: {id: string; name: string}) => {
				transformedSkills.push({id: category?.id, text: category?.name});
			});

			let transformedMentorCategories: any = {};
			mentorCategories.data.map((item: {id: string; name: string}) => {
				transformedMentorCategories[item?.id] = {
					id: item?.id,
					label: item?.name,
					...defaultInput,
					value: false,
				};
			});

			let transformedMentoringTopics: any = {};
			mentorTopics.data.map((item: {id: string; name: string}) => {
				transformedMentoringTopics[item?.id] = {
					id: item?.id,
					label: item?.name,
					...defaultInput,
					value: false,
				};
			});

			let transformedMentorServices: any = {};
			mentorServices.data.map((item: {id: string; name: string}) => {
				transformedMentorServices[item?.id] = {
					id: item?.id,
					label: item?.name,
					...defaultInput,
					value: false,
				};
			});

			setMentorForm({
				skills: {
					...defaultInput,
					value: transformedSkills,
				},
				categories: {
					...defaultInput,
					value: transformedMentorCategories,
				},
				topics: {
					...defaultInput,
					value: transformedMentoringTopics,
				},
				services: {
					...defaultInput,
					value: transformedMentorServices,
				},
			});
		});
	}, []);

	return (
		<>
			<AppHeader title='Ustawienia użytownika' text='Zarządzaj swoimi danymi.' />
			<Container as={Tag.Main} classes={styles.wrapper}>
				<YourData userData={userData} />
				{isMentor && !!mentorForm && !!userData && (
					<Specification default={mentorForm} userData={userData} />
				)}
				<ChangePassword />
				<DeleteAccount />
			</Container>
		</>
	);
};
export default Settings;
