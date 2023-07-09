import React from 'react';
import CustomButton, {buttonTypes} from '../../../../CustomButton';

const MentorshipPlan = (props) => {
	const {
		isCurrent,
		planProps: {monthlyPrice, description, benefits},
	} = props;

	return (
		<div className='mentorship__plan' data-visible={isCurrent}>
			<h4 className='mentorship__plan-price'>{monthlyPrice}</h4>
			<p className='mentorship__plan-description'>{description}</p>
			<ul className='mentorship__plan-benefits'>
				{benefits?.map((benefit) => (
					<li className='mentorship__plan-benefits-item'>{benefit}</li>
				))}
			</ul>
			<CustomButton as={buttonTypes.internalLink} link={'/'}>
				Zapisz się teraz
			</CustomButton>
		</div>
	);
};

export default MentorshipPlan;
