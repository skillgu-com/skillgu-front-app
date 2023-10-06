import React from 'react';

const UserPhoto = (props) => {
	const {status='offline', imageUrl, username} = props;

	return (
		<div className='user-photo' data-status={status}>
			<img src={imageUrl} alt={username} />
		</div>
	);
};

export default UserPhoto;
