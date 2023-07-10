import React from 'react';

const MentorCardProfile = (props) => {
	const {profileImg, name, surname} = props;

	return (
		<div className='mentor-card__profile'>
			<img src={profileImg} alt={`Mentor ${name} ${surname}`} />
		</div>
	);
};

export default MentorCardProfile;
