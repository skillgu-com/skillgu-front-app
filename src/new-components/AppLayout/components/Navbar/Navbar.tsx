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
			<ol className={styles.navbarMenu}>
				<li>
					<Link className={styles.navbarMenuItem} data-highlited='true' to='/home'>
						<Home />
						Home
					</Link>
				</li>
				<li>
					<Link className={styles.navbarMenuItem} to='/profile'>
						<Doc />
						Profil
					</Link>
				</li>
				<li>
					<Link className={styles.navbarMenuItem} to='/profile'>
						<Settings />
						Ustawienia
					</Link>
				</li>
				<li>
					<Link className={styles.navbarMenuItem} to='/profile'>
						<Wallet />
						Rozliczenia
					</Link>
				</li>
				<li className={styles.navbarMenuSpace}></li>
				<li>
					<Link className={styles.navbarMenuItem} to='/profile'>
						<Help />
						Pomoc
					</Link>
				</li>
				<li>
					<button className={styles.navbarMenuItem}>
						<Logout />
						Wyloguj się
					</button>
				</li>
			</ol>
		</Container>
	);
};

export default Navbar;
