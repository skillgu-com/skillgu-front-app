import React from 'react';
import CustomButton from '../../../component/CustomButton';
import done from '../../../assets/img/done.svg';

const SubmitProject = (props) => {
	return (
		<>
			<div className='d-flex justify-content-center pitchdeck__form-img w-100'>
				<img src={done} alt='ukończono' />
			</div>
			<h2 className='form__title text-center'>
				Gratulacje!
				<br />
				Twoja oferta została stworzona.
			</h2>
			<h2 className='form__subtitle text-center'>
				W każdej chwili możesz edytować swoją ofertę w swoim panelu użytkownika.
			</h2>
			<CustomButton classes='w-100 my-3'
						  value={'true'}
						  _onClick={props.handleSubmitProject}>
				Przejdź do oferty
			</CustomButton>
		</>
	);
};

export default SubmitProject;
