import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContextProvider';

const AplicationLeftNav = () => {
	const [isActive, setIsActive] = useState(false);

	const direction = [
		{
			label: 'Home',
			redirectUrl: '/home',
			allowedRoles: ['STUDENT', 'MENTOR'],
		},
		{
			label: 'Pomoc',
			redirectUrl: '/help',
			allowedRoles: ['STUDENT', 'MENTOR'],
		},
		{
			label: 'Znajdź mentora',
			redirectUrl: '/mentors',
			allowedRoles: ['STUDENT'],
		},

		{
			label: 'Znajdź studenta',
			redirectUrl: '/students',
			allowedRoles: ['MENTOR'],
		},

		{
			label: 'Ustawienia',
			redirectUrl: '/user-setup',
			allowedRoles: ['STUDENT', 'MENTOR'],
		},
		{
			label: 'Profil',
			redirectUrl: '/user-profile',
			allowedRoles: ['STUDENT', 'MENTOR'],
		},
		{
			label: 'Cennik',
			redirectUrl: '/home',
			allowedRoles: ['STUDENT', 'MENTOR'],
		},
		{
			label: 'Szukaj',
			redirectUrl: '/search-invest-projects',
			allowedRoles: ['STUDENT', 'MENTOR'],
		},
	];

	const {user} = useContext(AuthContext);

	return (
		<>
			<div className={`left-bar${isActive ? ' left-bar--active' : ''}`}>
				<nav className='left-bar__nav'>
					<ul className='left-bar__list'>
						{direction
							.filter((item) => item.allowedRoles.includes(user?.role[0]))
							.map((element, index) => (
								<li key={'element' + index} className='left-bar__item'>
									<Link className='left-bar__link' to={element.redirectUrl}>
										{element.label}
									</Link>
								</li>
							))}
					</ul>
				</nav>
			</div>
			<button className='left-bar__btn' onClick={() => setIsActive(!isActive)}>
				<span className='btn__inner'></span>
				<span className='btn__inner'></span>
				<span className='btn__inner'></span>
			</button>
			<p className='beta'>V. BETA</p>
		</>
	);
};

export default AplicationLeftNav;
