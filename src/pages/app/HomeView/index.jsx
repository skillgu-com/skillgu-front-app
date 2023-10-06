// Libraries
import React, {useContext, useEffect, useState} from 'react';

// Components
import AppLayout from '../../../component/AppLayout';
import UsersCard from '../../../component/InvestCard';
import CardNavigation from '../../../component/CardNavigation';
import HeroHeader from '../../../component/HeroHeader';
import CardsSlider from '../../../component/CardsSlider';
import UserMessageItem from '../../../component/Messages/ContactItem';

// APIs
import {searchAllMyOwnProjects} from '../../../services/SearchOfProjectsService';

// Icons
import {ReactComponent as Handshake} from '../../../assets/icons/handshake.svg';
import {ReactComponent as Create} from '../../../assets/icons/create.svg';
import {ReactComponent as Search} from '../../../assets/icons/search-money.svg';
import {ReactComponent as HandMoney} from '../../../assets/icons/hand-money.svg';
import homeBg from '../../../assets/img/landscape.jpg';
import {AuthContext} from '../../../context/AuthContextProvider';
import {getAllUsersWithRoles} from '../../../services/UserProfileService';

const navigation = [
	{
		id: 1,
		title: 'Kalendarz',
		link: '/calendar-view',
		icon: <HandMoney />,
		allowedRoles: ['STUDENT', 'MENTOR'],
	},
	{
		id: 2,
		title: 'Stwórz spotkania',
		link: '/create-new-meeting',
		icon: <Create />,
		allowedRoles: ['MENTOR'],
	},
	{
		id: 3,
		title: 'Harmonogram spotkań',
		link: '/schedule-meeting',
		icon: <Search />,
		allowedRoles: ['STUDENT', 'MENTOR'],
	},
	{
		id: 4,
		title: 'Szukaj mentora do współpracy',
		link: '/mentors',
		icon: <Handshake />,
		allowedRoles: ['STUDENT', 'MENTOR'],
	},
	{
		id: 5,
		title: 'Twoje konto',
		link: '/account-view',
		icon: <HandMoney />,
		allowedRoles: ['STUDENT', 'MENTOR'],
	},

	{
		id: 6,
		title: 'Raporty',
		link: '/raports',
		icon: <HandMoney />,
		allowedRoles: ['STUDENT', 'MENTOR'],
	},

	{
		id: 7,
		title: 'account-settlements',
		link: '/account-settlements',
		icon: <HandMoney />,
		allowedRoles: ['STUDENT', 'MENTOR'],
	},
];

const users2 = [
	{
		title: 'MSW',
		location: 'Adam Nowak',
		industry: 'IT',
		roi: 10,
		noFollow: true,
	},
];

const myCards = [
	{
		firstName: 'MMW',
		location: 'Warszawa, Kraków, Gdańsk, Szczecin',
		industry: 'IT',
		jobPosition: 'Software Engineer at Facebook',
		roi: 10,
	},
];

const HomeScreen = () => {
	let [projects, setProjects] = useState([]);
	const [users, setUsers] = useState([]); // Inicjalizacja stanu users jako pusta tablica

	const {user} = useContext(AuthContext);

	const filteredNavigation = navigation.filter((item) =>
		item.allowedRoles.includes(user?.role[0])
	);

	useEffect(() => {
		searchAllMyOwnProjects().then((r) => {
			setProjects(r.data);
		});
	}, []);

	useEffect(() => {
		getAllUsersWithRoles()
			.then((res) => {
				if (res.data.length > 0) {
					console.log(res.data);
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
		<AppLayout>
			<HeroHeader
				title={`Witaj ` + user?.role}
				image={<img src={homeBg} alt='investors' />}
			/>
			<div className='row flex-wrap justify-content-around my-3 home-screen__services-panel'>
				{filteredNavigation.map(({title, id, icon, link}) => (
					<CardNavigation key={id} title={title} icon={icon} link={link} />
				))}
			</div>
				<UserMessageItem imageUrl='https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg' username='Nazwa' status='online' />
			<div className='home-screen__lists d-flex'>
				<CardsSlider
					title={user?.role[0] === 'MENTOR' ? 'Moi studenci' : 'Moi mentorzy'}
					as={UsersCard}
					items={users}
					noMaxHeight
				/>

				{/*TODO */}
				{/*<CardsSlider title='Moje projekty' as={InvestCard} items={myCards} noMaxHeight />*/}
			</div>
		</AppLayout>
	);
};

export default HomeScreen;
