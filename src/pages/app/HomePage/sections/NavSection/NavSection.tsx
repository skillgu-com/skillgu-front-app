import React from 'react';
import {useSelector} from 'react-redux';
// Selectors
import {getRole} from 'src/redux/selectors/authSelectors';
// Components
import NavCard from 'src/new-components/Cards/NavCard/NavCard';
// Icons
import Calendar from 'src/assets/icons/Calendar';
import Message from 'src/assets/icons/Message';
import Raports from 'src/assets/icons/Raports';
import Meet from 'src/assets/icons/Meet';
import Payment from 'src/assets/icons/Payment';
import Find from 'src/assets/icons/Find';
// Styles
import styles from './NavSection.module.scss';

const NavSection = () => {
	const role = useSelector(getRole);

	const navList =
		role === 'S'
			? [
					{
						link: '/',
						icon: <Calendar />,
						text: 'Kalendarz',
					},
					{
						link: '/',
						icon: <Find />,
						text: 'Znajdź mentora',
					},
					{
						link: '/',
						icon: <Raports />,
						text: 'Raporty',
					},
					{
						link: '/',
						icon: <Message />,
						text: 'Wiadomości',
					},
			  ]
			: [
					{
						link: '/',
						icon: <Calendar />,
						text: 'Kalendarz',
					},
					{
						link: '/',
						icon: <Meet />,
						text: 'Tworzenie spotkań',
					},
					{
						link: '/',
						icon: <Raports />,
						text: 'Raporty',
					},
					{
						link: '/',
						icon: <Message />,
						text: 'Wiadomości',
					},
					{
						link: '/',
						icon: <Payment />,
						text: 'Rozliczenia',
					},
			  ];

	return (
		<section className={styles.wrapper}>
			{navList.map((item) => (
				<NavCard {...item} key={item.text} />
			))}
		</section>
	);
};

export default NavSection;
