import React, {useEffect, useMemo} from 'react';
import {useLocation} from 'react-router-dom';

//Components
import AplicationLeftNav from '../Navigations/AplicationLeftNav';
import AppTopbar from '../AppTopbar';

const AppLayout = ({children}) => {
	const location = useLocation();

	const pathname = useMemo(() => location.pathname, [location.pathname]);

	useEffect(() => {
		const alertUser = (e) => {
			e.preventDefault();
			e.returnValue = '';
		};

		if (pathname === '/create-pitch-deck' || pathname === '/user-setup') {
			window.addEventListener('beforeunload', alertUser);
		}

		return () => {
			window.removeEventListener('beforeunload', alertUser);
		};
	}, [pathname]);

	return (
		<div className='app-layout'>
			<AplicationLeftNav />
			<AppTopbar />
			<main className='app-layout__view'>
				<div className='container'>{children}</div>
			</main>
		</div>
	);
};

export default AppLayout;
