// Librares
import React from 'react';
import AppLayout from "../../../component/AppLayout";
import ContactList from "../../../component/Messages/ContactList";
import Conversation from "../../../component/Messages/Conversation";
// Components

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
			<main className='messages-view'>
				<ContactList contacts={PLACEHOLDER_CONTSCTS} />
				<Conversation />
			</main>
		</AppLayout>
	);
};

export default MessagesView;