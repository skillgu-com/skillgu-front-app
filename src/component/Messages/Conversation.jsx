// Libraries
import React, {useState} from 'react';
// Components
import UserPhoto from './UserPhoto';
import CustomButton, {buttonTypes, buttonColors} from '../CustomButton';
import Message from './Message';

const PLACEHOLDER_CONVERSATION = {
	id: '11202a03d',
	user: {
		username: 'Jan Kowalski',
		nextLesson: new Date().toLocaleDateString(),
		lastSeen: new Date().toLocaleDateString(),
		imageUrl:
			'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
		status: 'online',
	},
	content: [{id: 'm01', isUser: true, message: 'Witam!'},{id: 'm02', isUser: false, message: 'Zacznijmy naukę!'}],
};

const Conversation = (props) => {
	const [conversation, setConversation] = useState(PLACEHOLDER_CONVERSATION);
	const {id} = props;
	// Download message info from API

	return (
		<section className='conversation'>
			<header className='conversation__header'>
				<h3 className='app__title'>{conversation.user.username}</h3>
				<p className='app__text'>Następna lekcja: {conversation.user.nextLesson}</p>
				<p className='app__text'>Ostatnio online: {conversation.user.lastSeen}</p>
			</header>
			<UserPhoto
				imageUrl={conversation.user.imageUrl}
				name={conversation.user.username}
				status={conversation.user.status}
			/>
			<div className='conversation__content'>
				{conversation.content.map((message) => (
					<Message key={message.id} {...message} />
				))}
			</div>
			<form className='conversation__form'>
				<div className='book-form__group'>
					<label className='book-form__text' htmlFor='message'>
						<b>Wiadomość do</b>
					</label>
					<textarea name='message' id='message' cols='30' rows='10'></textarea>
				</div>
				<CustomButton as={buttonTypes.button} color={buttonColors.secondary}>
					Dodaj plik
				</CustomButton>
				<CustomButton as={buttonTypes.submit}>Wyślij</CustomButton>
			</form>
		</section>
	);
};

export default Conversation;
