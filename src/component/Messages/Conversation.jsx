// Libraries
import React, {useState} from 'react';
// Components
import UserPhoto from './UserPhoto';
import CustomButton, {buttonTypes, buttonColors} from '../CustomButton';
import ChatBubble from './ChatBubble';

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
	content: [
		{
			id: 'm01',
			userId: true,
			message: 'Witam!',
			date: new Date().toLocaleDateString(),
		},
		{
			id: 'm02',
			userId: false,
			message: 'Zacznijmy naukę!',
			date: new Date().toLocaleDateString(),
		},
		{
			id: 'm03',
			userId: false,
			message:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nemo nulla eos laudantium et consectetur earum maxime magnam rerum. Minima neque ab fugiat reiciendis magnam architecto alias eos officiis facilis?',
			date: new Date().toLocaleDateString(),
		},
		{
			id: 'm06',
			userId: false,
			message:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nemo nulla eos laudantium et consectetur earum maxime magnam rerum. Minima neque ab fugiat reiciendis magnam architecto alias eos officiis facilis?',
			date: new Date().toLocaleDateString(),
		},
		{
			id: 'm04',
			userId: true,
			message:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nemo nulla eos laudantium et consectetur earum maxime magnam rerum.',
			date: new Date().toLocaleDateString(),
		},
		{
			id: 'm05',
			userId: true,
			message:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nemo nulla eos laudantium et consectetur earum maxime magnam rerum.',
			date: new Date().toLocaleDateString(),
		},
	],
};

const Conversation = (props) => {
	const [conversation, setConversation] = useState(PLACEHOLDER_CONVERSATION);
	const {id} = props;
	// TODO: Download message info from API

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
			<div className='conversation__wrapper'>
				<div className='conversation__content'>
					{conversation.content.map((message) => (
						<ChatBubble key={message.id} {...message} />
					))}
				</div>
			</div>
			<form className='conversation__form'>
				<textarea
					className='conversation__form-input'
					name='message'
					id='message'
					cols='30'
					rows='10'></textarea>
				<div className='conversation__form-buttons'>
					<CustomButton as={buttonTypes.button} color={buttonColors.secondary}>
						Dodaj plik
					</CustomButton>
					<CustomButton as={buttonTypes.submit}>Wyślij</CustomButton>
				</div>
			</form>
		</section>
	);
};

export default Conversation;
