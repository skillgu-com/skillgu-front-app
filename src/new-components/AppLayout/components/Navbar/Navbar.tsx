// Libraries
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
// Components
import Container from '../../../Container/Container';
import Notifications from '../Notifications/Notifications';
// Helpers
import {logout} from 'src/helpers/login';
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
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isExpanded, setIsExpanded] = useState(false);
	const toggleExpandHandler = () => setIsExpanded(!isExpanded);
	const userFromRedux = useSelector((state: any) => state.auth.user);

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
			<div className={styles.mobile}>
				<Notifications />
				<button
					onClick={toggleExpandHandler}
					className={styles.navbarButton}
					aria-label='menu'>
					<span></span>
					<span></span>
				</button>
			</div>
			<div className={styles.navbarMenu}>
				<div>
					<Link className={styles.navbarMenuItem} to='/home'>
						<Home />
						Strona główna
					</Link>
					<Link className={styles.navbarMenuItem} to={'/logged-user-profile'}>
						<Doc />
						Profil
					</Link>
					<Link className={styles.navbarMenuItem} to='/settings'>
						<Settings />
						Ustawienia
					</Link>
					<Link className={styles.navbarMenuItem} to='/'>
						<Wallet />
						Subskrypcje
					</Link>
				</div>
				<div className={styles.utils}>
					<Link className={styles.navbarMenuItem} to='/help'>
						<Help />
						Pomoc
					</Link>
					<button
						className={styles.navbarMenuItem}
						onClick={() => logout(dispatch, navigate)}>
						<Logout />
						Wyloguj się
					</button>
				</div>
			</div>
		</Container>
	);
};

export default Navbar;
