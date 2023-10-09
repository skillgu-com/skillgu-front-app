import React, {useMemo} from 'react';

const Message = (props) => {
	const {message, userId, date} = props;

	// TODO: Add logic to find out is this user or addressee
	const isUserMessage = useMemo(() => userId, [userId]);

	return (
		<div className='chat-bubble' data-is-user={isUserMessage}>
			<p className='chat-bubble__date'>{date}</p>
			<p className='chat-bubble__message' >
				{message}
			</p>
		</div>
	);
};

export default Message;
