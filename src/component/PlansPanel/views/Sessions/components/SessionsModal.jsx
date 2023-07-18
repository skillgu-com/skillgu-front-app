import React from 'react';
import SessionCard from '../../../../Cards/SessionCard/SessionCard';

const SessionsModal = (props) => {
	const {sessions, name} = props;

	return (
		<div className='session-modal'>
			<h3 className='session-modal__title'>Wybierz sesję z {name}</h3>
			<ul className='session-modal__list'>
				<li className='session-modal__list-item'>
					<SessionCard
						title={'title'}
						description={
							'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum suscipit repellat cumque esse hic similique modi obcaecati deserunt laboriosam, sed dolorum, ut dolorem dolore, eveniet ratione consectetur fuga aut voluptate.'
						}
						price={300}
						minutes={30}
					/>
				</li>
				<li className='session-modal__list-item'>
					<SessionCard
						title={'title'}
						description={
							'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum suscipit repellat cumque esse hic similique modi obcaecati deserunt laboriosam, sed dolorum, ut dolorem dolore, eveniet ratione consectetur fuga aut voluptate.'
						}
						price={300}
						minutes={30}
					/>
				</li>
				<li className='session-modal__list-item'>
					<SessionCard
						title={'title'}
						description={
							'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum suscipit repellat cumque esse hic similique modi obcaecati deserunt laboriosam, sed dolorum, ut dolorem dolore, eveniet ratione consectetur fuga aut voluptate.'
						}
						price={300}
						minutes={30}
					/>
				</li>
				<li className='session-modal__list-item'>
					<SessionCard
						title={'title'}
						description={
							'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum suscipit repellat cumque esse hic similique modi obcaecati deserunt laboriosam, sed dolorum, ut dolorem dolore, eveniet ratione consectetur fuga aut voluptate.'
						}
						price={300}
						minutes={30}
					/>
				</li>
			</ul>
		</div>
	);
};

export default SessionsModal;
