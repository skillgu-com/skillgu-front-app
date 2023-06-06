import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

const Card = ({type, image, title, subtitle, classes, company, city, investsAmount, commonContacts,uuid,_onClick}) => {
	const navigate = useNavigate();
	const navigateToDetailUser = () => {
		navigate(`/investor-profile/${uuid}`)
	}

	return (
		<div className={`card card--${type}${classes ? ` ${classes}` : ''}` } onClick={_onClick}>
			<div className='card__container d-flex align-items-center'>
				<div className='card__icon'>
					<img src={image} alt='img'/>
				</div>
				<div className='column'>
					<h3 className='card__title'>{title}</h3>
					<h4 className='card__info'>{subtitle}{company && ` - ${company}`}</h4>
					{city && <h5 className='my-1 card__city'>{city}</h5>}
					{commonContacts && <h5 className='card__info--small mt-2'>{commonContacts} wspólnych znajomych</h5>}
					{investsAmount && <h6 className='card__info--small'>{investsAmount} inwestycji</h6>}
				</div>
					{city &&  <button className='card__btn mt-3' onClick={() => navigateToDetailUser()}>Zobacz więcej</button>}
			</div>
		</div>
	);
};

export default Card;
