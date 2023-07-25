import React from 'react';

const BookPayment = () => {
	return (
		<div className='book-payment'>
			<div className='book-payment__submit'>
				<button className='book-payment__submit-button'>Cofnij</button>
				<h2 className='book-payment__submit-session-name'>Tytuł sesji</h2>
				<h3 className='book-payment__submit-session-price'>200 zł</h3>
				<h4 className='book-payment__submit-session-submit'>Sesja (30 minut) z mentorem</h4>
				<div className='book-payment__submit-image'>
					<img src='https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg' alt='mentor' />
				</div>
			</div>
			<form className='book-payment__form'></form>
		</div>
	);
};

export default BookPayment;
