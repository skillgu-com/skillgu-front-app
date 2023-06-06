import React from 'react';

//components
import CustomButton, {
	buttonTypes,
	buttonColors,
} from '../../../component/CustomButton';

const SectionBase = () => {
	return (
		<section className='section-info section-info--secondary section-cta'>
			<div className='container'>
				<h2 className='section__title'>Zacznij inwestować dzisiaj</h2>
				<p className='section__text'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere
					ipsum rutrum tellus pharetra, ut semper magna pretium.
				</p>
				<CustomButton
					as={buttonTypes.internalLink}
					color={buttonColors.light}
					link='/register'>
					Rejestracja
				</CustomButton>
			</div>
		</section>
	);
};

export default SectionBase;
