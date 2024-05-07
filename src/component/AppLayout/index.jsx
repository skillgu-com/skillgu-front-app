import React, {useEffect, useMemo} from 'react';
import {useLocation} from 'react-router-dom';

//Components

const AppLayout = ({children, fluid = false}) => {
	const location = useLocation();

	const pathname = useMemo(() => location.pathname, [location.pathname]);

	useEffect(() => {
		const alertUser = (e) => {
			e.preventDefault();
			e.returnValue = '';
		};

		if (pathname === '/create-mentor' || pathname === '/user-setup') {
			window.addEventListener('beforeunload', alertUser);
		}

		return () => {
			window.removeEventListener('beforeunload', alertUser);
		};
	}, [pathname]);

	return (
		<div className='app-layout'>
			<main className='app-layout__view'>
				<div className='container' data-fluid={fluid}>{children}</div>
			</main>
		</div>
	);
};

export default AppLayout;
