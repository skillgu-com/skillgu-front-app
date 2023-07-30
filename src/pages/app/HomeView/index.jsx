// Libraries
import React, {useEffect, useState} from 'react';

// Components
import AppLayout from '../../../component/AppLayout';
import InvestCard from '../../../component/InvestCard';
import CardNavigation from '../../../component/CardNavigation';
import HeroHeader from '../../../component/HeroHeader';
import CardsSlider from '../../../component/CardsSlider';

// APIs
import {searchAllMyOwnProjects} from '../../../services/SearchOfProjectsService';

// Icons
import {ReactComponent as Handshake} from '../../../assets/icons/handshake.svg';
import {ReactComponent as Create} from '../../../assets/icons/create.svg';
import {ReactComponent as Search} from '../../../assets/icons/search-money.svg';
import {ReactComponent as HandMoney} from '../../../assets/icons/hand-money.svg';
import homeBg from '../../../assets/img/landscape.jpg';

const navigation = [
	{
		id: 1,
		title: 'Gotowe inwestycje',
		link: '/invest-maps',
		icon: <HandMoney />,
	},
	{
		id: 2,
		title: 'Stwórz inwestycje',
		link: '/create-mentor',
		icon: <Create />,
	},
	{
		id: 3,
		title: 'Szukaj inwestycji',
		link: '/search-invest-projects',
		icon: <Search />,
	},
	{
		id: 4,
		title: 'Szukaj pratnera biznesowego',
		link: '/underconstruction',
		icon: <Handshake />,
	},
	{
		id: 5,
		title: 'Szukaj pratnera biznesowego',
		link: '/underconstruction',
		icon: <Handshake />,
	},
];

const cards = [
	{
		title: 'MSW',
		location: 'Adam Nowak',
		industry: 'IT',
		roi: 10,
		noFollow: true,
	},
	// {
	// 	title: 'MMW',
	// 	location: 'Warszawa, Kraków, Gdańsk, Szczecin',
	// 	industry: 'IT',
	// 	roi: 10,
	// 	noFollow: true,
	// 	invested: true,
	// },
	// {
	// 	title: 'MMW',
	// 	location: 'Warszawa, Kraków, Gdańsk, Szczecin',
	// 	industry: 'IT',
	// 	roi: 10,
	// 	noFollow: true,
	// 	invested: true,
	// },
	// {
	// 	title: 'MMW',
	// 	location: 'Warszawa, Kraków, Gdańsk, Szczecin',
	// 	industry: 'IT',
	// 	roi: 10,
	// 	noFollow: true,
	// 	invested: true,
	// },
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

	useEffect(() => {
		searchAllMyOwnProjects().then((r) => {
			setProjects(r.data);
		});
	}, []);

	return (
		<AppLayout>
			<HeroHeader
				title='Panel Mentora'
				image={<img src={homeBg} alt='investors' />}
			/>
			<div className='row flex-wrap justify-content-around my-3 home-screen__services-panel'>
				{navigation.map(({title, id, icon, link}) => (
					<CardNavigation key={id} title={title} icon={icon} link={link} />
				))}
			</div>
			<div className='home-screen__lists d-flex'>
				<CardsSlider title='Moi studenci' as={InvestCard} items={cards} noMaxHeight />
				{/*TODO */}
				{/*<CardsSlider title='Moje projekty' as={InvestCard} items={myCards} noMaxHeight />*/}
			</div>
		</AppLayout>
	);
};

export default HomeScreen;
