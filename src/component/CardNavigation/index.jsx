// Libraries
import React from 'react';
import {Link} from 'react-router-dom';

const CardNavigation = (props) => {
	const {title, link, icon,allowedRoles} = props;

	return (
		<div className='card-navigation__wrapper d-flex justify-content-center col-12 col-sm-6 col-xl-3'>
			<div className='card-navigation'>
				<Link to={link} className='card-navigation__link'>
					<div className='card-navigation__icon'>{icon}</div>
					<span className='card-navigation__title'>{title}</span>
				</Link>
			</div>
		</div>
	);
};

export default CardNavigation;
