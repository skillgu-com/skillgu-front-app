import React from 'react';
import CustomButton from '../../../../component/CustomButton';
import done from '../../../../assets/img/done.svg';

const SubmitSearchProject = (props) => {
	return (
		<>
			<div className='d-flex justify-content-center pitchdeck__form-img w-100'>
				<img src={done} alt='ukończono' />
			</div>
			<h2 className='form__title text-center'>
				Gratulacje!
				<br />
				Zaczynamy szukać inwestycji, najlepiej pasujących do Ciebie
			</h2>
			<h2 className='form__subtitle text-center'>
				Jeżeli masz pakiet to w każdej chwili możesz edytować swoją wyszukiwarke projektów w swoim panelu użytkownika.
			</h2>
			<CustomButton classes='w-100 my-3'  _onClick={(event) => props.handleSubmitProject(event)}>
				Przejdź do projektów
			</CustomButton>
		</>
	);
};

export default SubmitSearchProject;
