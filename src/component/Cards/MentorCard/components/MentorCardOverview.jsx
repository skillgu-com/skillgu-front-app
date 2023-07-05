import React from 'react';
import {Link} from 'react-router-dom';
import {Rating} from '@mui/material';

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
			<Rating name='read-only' value={reviews} readOnly />
			{/* ------------------------------- */}
			<div className='mentor-card__overview-contact'></div>
			{/* ------------------------------- */}
			<p className='mentor-card__overview-description'>{description}</p>
			{skills.length > 0 && (
				<ul className='app-list mentor-card__overview-skills'>
					{skills.map((skill) => (
						<li className='app-list__item'>{skill}</li>
					))}
				</ul>
			)}
			<Link className='mentor-card__overview-link' to={`/mentor-profile/${id}`}>
				Zobacz profil
			</Link>
		</div>
	);
};

export default MentorCardOverview;
