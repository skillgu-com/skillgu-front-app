import React from 'react';
import InvestTransaction from './InvestTransaction';

const benefitsList = [
	'Duża baza firm i inwestorów',
	'Spersonalizowane i atrakcyjne oferty',
	'Wiele kanałów komunikacji',
	'Jedyny taki portal',
];

const SectionWhyWe = () => {
	return (
		<section className='section-info section-whywe'>
			<div className='container d-flex flex-wrap align-items-center'>
				<div className='section-whywe__content col-12 col-md-6 col-lg-7'>
					<h2 className='section__title'>Dedykowana wyszukiwarka ofert</h2>
					<p className='section__text'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere
						ipsum rutrum tellus pharetra, ut semper magna pretium.
					</p>
					<ul className='benefits-list'>
						{benefitsList.map((text, index) => (
							<li key={text.slice(2) + index} className='text-left benefits-list__item row align-items-center'>
								<span className='d-flex align-items-center justify-content-center benefits-list__index'>
									{index + 1}
								</span>
								<h3 className='benefits-list__text'>{text}</h3>
							</li>
						))}
					</ul>
				</div>
				<div className='section-whywe__image col-12 col-md-6 col-lg-5'>
					<InvestTransaction />
				</div>
			</div>
		</section>
	);
};

export default SectionWhyWe;
