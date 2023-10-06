import React from 'react'
import UserPhoto from './UserPhoto'

const ContactItem = (props) => {
	const {status='offline', imageUrl, username} = props;

  return (
    <button className='contact-item'>
				<UserPhoto imageUrl={imageUrl} username={username} status={status} />
        <p className='contact-item__name'>{username}</p>
    </button>
  )
}

export default ContactItem