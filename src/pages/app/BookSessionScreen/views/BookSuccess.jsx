import React from 'react';
import Confetti from 'react-confetti';
import CustomButton, {buttonTypes} from '../../../../component/CustomButton';

const BookSuccess = () => {
  console.log(buttonTypes.internalLink);
	return (
		<div className='book-success'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				recycle={false}
			/>
			<h2 className='book-success__title book-payment__submit-session-price'>
				Twoje spotkanie zostało zarezerwowane!
			</h2>
			<CustomButton as={buttonTypes.internalLink} link={'/home'}>
				Powrót do strony głównej
			</CustomButton>
		</div>
	);
};

export default BookSuccess;
