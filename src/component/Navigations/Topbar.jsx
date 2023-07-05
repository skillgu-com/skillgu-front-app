import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/img/logo.svg';

const navList = [
	// {
	// 	label: 'Inwestycje',
	// 	redirectUrl: '/invests',
	// },
	// {
	// 	label: 'Inwestorzy',
	// 	redirectUrl: '/mentors',
	// },
	// {
	// 	label: 'Wiadomości inwestycyjne',
	// 	redirectUrl: '/invest-news',
	// },
	// {
	// 	label: 'Kontakt',
	// 	redirectUrl: '/contakt',
	// },
	{
		classes: 'nav-list__item-link--login',
		label: 'Zaloguj się',
		redirectUrl: '/login',
	},
	{
		classes: 'nav-list__item-link--register',
		label: 'Zarejestruj',
		redirectUrl: '/register',
	},
];

const Topbar = () => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className='topbar'>
			<div className='container'>
				<Link to='/' className='topbar__logo d-flex align-items-center'>
					<img
						height='21.75'
						width='138'
						// className='log__img'
						// src={logo}
						// alt='Logo skillguru.pl'
					/>
					<h4 className='px-1'>| skillguru.pl v.0.1</h4>
				</Link>
				<nav className={`topbar__menu${isActive ? ' topbar__menu--active' : ''}`}>
					<ul className='nav-list'>
						{navList.map(({label, redirectUrl, classes}, index) => (
							<li
								key={label + index}
								className='nav-list__item'>
								<Link className={`nav-list__item-link${classes ? ' ' + classes : ''}`} to={redirectUrl}>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<button className='topbar__menu-btn' onClick={() => setIsActive(!isActive)}>
					<span className='menu-btn__inner'></span>
					<span className='menu-btn__inner'></span>
					<span className='menu-btn__inner'></span>
				</button>
			</div>
		</div>
	);
};

export default Topbar;
