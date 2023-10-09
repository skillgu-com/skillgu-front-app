// Libraries
import React from 'react';
// Components
import ContactItem from './ContactItem';

const ContactList = (props) => {
	const {contacts} = props;

	return (
		<section className='contact-list'>
			<h3 className='app__title'>Lista wiadomości</h3>
			<div className='contact-list__list'>
				{contacts.map((item) => (
					<ContactItem key={item.id} {...item} />
				))}
			</div>
		</section>
	);
};

export default ContactList;
