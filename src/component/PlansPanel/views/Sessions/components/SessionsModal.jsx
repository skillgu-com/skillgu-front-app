import React from 'react';
import SessionCard from '../../../../Cards/SessionCard/SessionCard';

const SessionsModal = (props) => {
	const {sessions, name} = props;

	return (
		<div className='session-modal'>
			<h3 className='session-modal__title'>Wybierz sesję z {name}</h3>
			<ul className='session-modal__list'>
				{sessions.map((session) => (
					<li className='session-modal__list-item' key={session.id}>
						<SessionCard {...session} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default SessionsModal;
