// Libraries
import React from 'react';

const CardsSlider = (props) => {
	const {title, items, as, noMaxHeight = false} = props;

	const Element = as;

	if (!as) throw new Error('Porop as is required!');

	return (
		<section>
			<h2 className='cards-slider__title'>{title}</h2>
			<div className='cards-slider'>
				<div className={`cards-slider__slider${noMaxHeight ? ' cards-slider__slider--no-max-height' : ''}`}>
					{items.map((item) => (
						<Element key={item.uuid} {...item} />
					))}
				</div>
			</div>
		</section>
	);
};

export default CardsSlider;
