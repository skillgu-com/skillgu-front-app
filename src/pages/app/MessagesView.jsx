// Librares
import React from 'react';
// Components
import AppLayout from '../../component/AppLayout';
import HeroHeader from '../../component/HeroHeader';
import ContactList from '../../component/Messages/ContactList';
import Conversation from '../../component/Messages/Conversation';
// Images
import girl from '../../assets/img/girl.jpg';

const PLACEHOLDER_CONTSCTS = [
	{
		id: '01',
		username: 'Jan Kowalski',
		imageUrl:
			'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
		status: 'online',
	},
	{
		id: '02',
		username: 'Jan Kowalski',
		imageUrl:
			'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
		status: 'offline',
	},
	{
		id: '03',
		username: 'Jan Kowalski',
		imageUrl:
			'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
		status: 'bussy',
	},
	{
		id: '04',
		username: 'Jan Kowalski',
		imageUrl:
			'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
		status: 'online',
	},
];

const MessagesView = () => {
	return (
		<AppLayout>
			<HeroHeader title='Wiadomości' image={<img src={girl} alt='mentors' />} />
			<ContactList contacts={PLACEHOLDER_CONTSCTS} />
			<Conversation />
		</AppLayout>
	);
};

export default MessagesView;
