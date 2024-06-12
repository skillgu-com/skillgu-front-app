// Libraries
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
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
import CreateSchedules from '../../../../assets/icons/CreateSchedules';
import Help from '../../../../assets/icons/Help';
import Logout from '../../../../assets/icons/Logout';
import {ReactComponent as CalendarIcon} from '../../../../assets/icons/svg/calendar.svg';

// Styles
import styles from './Navbar.module.scss';
import paths from "../../../../paths";
import {getRole} from "../../../../redux/selectors/authSelectors";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpandHandler = () => setIsExpanded(!isExpanded);
    const userFromRedux = useSelector((state: any) => state.auth.user);
    const role = useSelector(getRole);

    const menuItems = [
        {
            id: 'home',
            label: 'Strona główna',
            link: '/home',
            icon: <Home/>,
        },
        {
            id: 'calendar',
            label: 'Kalendarz',
            link: paths.calendar,
            icon: <CalendarIcon />,
        },
        {
            id: 'profile',
            label: 'Profil',
            link: role === 'M' ? `/mentor/${userFromRedux.username}` : `/student/${userFromRedux.username}`,
            icon: <Doc/>,
        },
        {
            id: 'schedules',
            label: 'Tworzenie spotkań',
            link: role !== 'S' ? '/schedules' : '',
            icon: <CreateSchedules/>,
        },
        {
            id: 'settings',
            label: 'Ustawienia',
            link: role === 'M' ? `/edit-mentor/${userFromRedux.username}` : `/edit-student/${userFromRedux.username}`,
            icon: <Settings/>,
        },
    ].filter(item => item.link !== '');

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
                <Logo/>
            </Link>
            <div className={styles.mobile}>
                <Notifications/>
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
                    {menuItems.map((item) => (
                        // Sprawdź, czy item jest obiektem i czy posiada właściwość label
                        item && typeof item === 'object' && item.label && (
                            <Link
                                key={item.id}
                                className={styles.navbarMenuItem}
                                data-is-current={pathname.includes(item.link)}
                                to={item.link}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        )
                    ))}
                </div>
                <div className={styles.utils}>
                    <Link className={styles.navbarMenuItem} to='/help'>
                        <Help/>
                        Pomoc
                    </Link>
                    <button
                        className={styles.navbarMenuItem}
                        onClick={() => logout(dispatch, navigate)}>
                        <Logout/>
                        Wyloguj się
                    </button>
                </div>
            </div>
        </Container>
    );
};

export default Navbar;