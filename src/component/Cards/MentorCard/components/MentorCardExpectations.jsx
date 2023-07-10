import React from 'react';

const MentorCardExpectations = (props) => {
	const {expectations, trail} = props;

	return (
		<div className='mentor-card__expectations'>
			{trail && (
				<div className='app__list-item mentor-card__expectations-trail'>
					{trail} dni za darmo
				</div>
			)}
			<h6 className='mentor-card__expectations-title'>
				Czego możesz się spodziewać po tym mentorze?
			</h6>
			<ul className='mentor-card__expectations-list'>
				{expectations?.map((item) => (
					<>
						<li className='mentor-card__expectations-item'>{item}</li>
					</>
				))}
			</ul>
		</div>
	);
};

export default MentorCardExpectations;
