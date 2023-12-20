// Libraries
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
// Components
import Container from '../../../Container/Container';
// Hooks
// Types
import {Tag} from '../../../../types/tags';
// Icons
import Logo from '../../../../assets/icons/Logo';
import Doc from '../../../../assets/icons/Doc';
import Home from '../../../../assets/icons/Home';
import Settings from '../../../../assets/icons/Settings';
import Wallet from '../../../../assets/icons/Wallet';
import Help from '../../../../assets/icons/Help';
import Logout from '../../../../assets/icons/Logout';
// Styles
import styles from './Navbar.module.scss';

const Navbar = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpandHandler = () => setIsExpanded(!isExpanded);

	return (
		<Container
			as={Tag.Nav}
			classes={classNames(styles.navbar, {
				[styles.navbarExpanded]: isExpanded,
			})}>
			<Link
				to={'/'}
				className={styles.navbarLogo}
				onClick={() => setIsExpanded(false)}>
				<Logo />
			</Link>
			<button
				onClick={toggleExpandHandler}
				className={styles.navbarButton}
				aria-label='menu'>
				<span></span>
				<span></span>
			</button>
			<div className={styles.navbarMenu}>
				<div>
					<Link className={styles.navbarMenuItem} data-highlited='true' to='/home'>
						<Home />
						Home
					</Link>
					<Link className={styles.navbarMenuItem} to='/profile'>
						<Doc />
						Profil
					</Link>
					<Link className={styles.navbarMenuItem} to='/profile'>
						<Settings />
						Ustawienia
					</Link>
					<Link className={styles.navbarMenuItem} to='/profile'>
						<Wallet />
						Rozliczenia
					</Link>
				</div>
				<div>
					<div className={styles.navbarMenuSpace}></div>
					<Link className={styles.navbarMenuItem} to='/profile'>
						<Help />
						Pomoc
					</Link>
					<button className={styles.navbarMenuItem}>
						<Logout />
						Wyloguj się
					</button>
				</div>
			</div>
		</Container>
	);
};

export default Navbar;
