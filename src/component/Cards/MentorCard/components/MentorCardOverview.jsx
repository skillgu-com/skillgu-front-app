import React from 'react';
import {Link} from 'react-router-dom';
import {Rating} from '@mui/material';
import CustomButton, {buttonColors, buttonTypes} from '../../../CustomButton';

const MentorCardOverview = (props) => {
	const {
		fullName,
		specialization,
		specializationDescription,
		contactOptions,
		reviews,
		reviewsAmount,
		description,
		skills,
		id,
		quickResponder,
		monthlyPrice,
	} = props;

	return (
		<div className='mentor-card__overview'>
			<h3 className='mentor-card__overview-name'>
				{fullName}
				{quickResponder && (
					<span className='mentor-card__overview-responder'>Szybko odpowiada</span>
				)}
			</h3>

			<h4 className='mentor-card__overview-spec'>{specialization}</h4>
			<h5 className='mentor-card__overview-spec-description'>
				{specializationDescription}
			</h5>
			<div className='mentor-card__overview-reviews'>
				<Rating
					className='mentor-card__overview-stars'
					name='read-only'
					value={reviews}
					readOnly
				/>
				<span>
					<b>{reviews}</b> ({reviewsAmount} opinii)
				</span>
			</div>
			{/* ------------------------------- */}
			<div className='mentor-card__overview-contact'>
				{contactOptions.chat && <p className='overview-contact__option'>Czat</p>}
				{contactOptions.call &&<p className='overview-contact__option'>Rozmowa</p>}
				{contactOptions.handsOn &&<p className='overview-contact__option'>Spotkanie</p>}
			</div>
			{/* ------------------------------- */}
			<p className='mentor-card__overview-description'>{description}</p>
			{skills.length > 0 && (
				<ul className='app-list mentor-card__overview-skills'>
					{skills.map((skill) => (
						<li className='app-list__item'>{skill}</li>
					))}
				</ul>
			)}
			<p className='mentor-card__price mentor-card__price--mobile'>
				{monthlyPrice} <small>zł / msc</small>
			</p>
			<CustomButton
				classes='mentor-card__overview-link'
				as={buttonTypes.internalLink}
				link={`/mentor-profile/${id}`}>
				Zobacz profil
			</CustomButton>
		</div>
	);
};

export default MentorCardOverview;
