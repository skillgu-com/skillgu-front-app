import React from 'react';
import CustomButton, {buttonTypes} from '../../CustomButton';

const SessionCard = (props) => {
	const {title, description, price, minutes, id} = props;

	return (
		<div className='session-card'>
			<h5 className='session-card__title'>{title}</h5>
			<p className='session-card__description'>{description}</p>
			<div className='session-card__details'>
				<h6 className='session-card__price'>
					{price} zł <small>/ {minutes} min</small>
				</h6>
				<CustomButton
					as={buttonTypes.internalLink}
					link={`/session-details/${id}`}>
					Więcej
				</CustomButton>
			</div>
		</div>
	);
};

export default SessionCard;
