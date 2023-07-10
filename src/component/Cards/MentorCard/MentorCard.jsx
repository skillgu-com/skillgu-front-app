import React from 'react';

import MentorCardProfile from './components/MentorCardProfile';
import MentorCardOverview from './components/MentorCardOverview';
import MentorCardExpectations from './components/MentorCardExpectations';

const MentorCard = (props) => {
	const {
		id,
		name,
		surname,
		profileImg,
		specialization,
		specializationDescription,
		contactOptions,
		reviews,
		reviewsAmount,
		description,
		skills,
		monthlyPrice,
		expectations,
		quickResponder,
		trail,
	} = props;

	return (
		<div className='mentor-card'>
			<MentorCardProfile name={name} surname={surname} profileImg={profileImg} />
			<MentorCardOverview
				id={id}
				fullName={`${name} ${surname}`}
				specialization={specialization}
				specializationDescription={specializationDescription}
				contactOptions={contactOptions}
				reviews={reviews}
				reviewsAmount={reviewsAmount}
				description={description}
				skills={skills}
				quickResponder={quickResponder}
				monthlyPrice={monthlyPrice}
			/>
			<MentorCardExpectations expectations={expectations} trail={trail} />
			<p className='mentor-card__price mentor-card__price--desktop'>
				{monthlyPrice} <small>zł / msc</small>
			</p>
		</div>
	);
};

export default MentorCard;
