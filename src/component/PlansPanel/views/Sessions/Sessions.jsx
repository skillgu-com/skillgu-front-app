import React from 'react';
import CustomButton, {buttonColors, buttonTypes} from '../../../CustomButton';
import SessionItem from './components/SessionItem';
import Modal from '../../../Modal';
import SessionsModal from './components/SessionsModal';

const Sessions = (props) => {
	const {sessions, onChangeHandler, currentSession} = props;

	return (
		<div className='session'>
			<ul className='session__list'>
				{sessions?.map((sessionProps) => (
					<SessionItem
						key={sessionProps.id}
						{...sessionProps}
						onChangeHandler={onChangeHandler}
						currentSession={currentSession}
					/>
				))}
			</ul>
			<CustomButton
				classes='session__button'
				as={buttonTypes.internalLink}
				link='/'>
				Zarezerwuj teraz
			</CustomButton>

			<Modal
				trigger={
					<CustomButton
						as={buttonTypes.span}
						classes='session__button'
						color={buttonColors.secondary}>
						Zobacz wszystkie sesje
					</CustomButton>
				}>
				<SessionsModal />
			</Modal>
		</div>
	);
};

export default Sessions;
