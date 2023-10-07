import React, {useMemo} from 'react';

const Message = (props) => {
	const {message, userId} = props;

  // TODO: Add logic to find out is this user or addressee
	const isUserMessage = useMemo(() => userId, [userId]);

	return <p className='chat-bubble' data-is-user={isUserMessage}>{message}</p>;
};

export default Message;
