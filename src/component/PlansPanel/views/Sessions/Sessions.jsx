import React from 'react';
import CustomButton, {buttonColors, buttonTypes} from '../../../CustomButton';
import SessionItem from './components/SessionItem';

const Sessions = (props) => {
	const {sessions} = props;

	return (
		<div className='plans-panel__content-session session'>
			<ul className='session__list'>{sessions?.map((sessionProps) => <SessionItem {...sessionProps}/>)}</ul>
			<CustomButton as={buttonTypes.internalLink} link='/'>
				Zarezerwuj teraz
			</CustomButton>
			<CustomButton color={buttonColors.secondary}>
				Zobacz wszystkie sesje
			</CustomButton>
		</div>
	);
};

export default Sessions;
