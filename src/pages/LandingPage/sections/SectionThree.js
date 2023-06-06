import React from 'react';
import {Link} from 'react-router-dom';
import SearchEngiveSvg from './SearchEngiveSvg';

const SectionThree = () => {
	return (
		<section className='section-info'>
			<div className='container'>
				<h2 className='section__title'>Dedykowana wyszukiwarka ofert</h2>
				<p className='section__text'>
					Twórz startupy, zbieraj inwestorów, zacznij dzielić się wiedzą, zacznij zarabiać.
					<Link className='section__cta mx-auto' to='/'>
						Call to action
					</Link>
				</p>
				<div className='section-info__search mx-auto'>
					<SearchEngiveSvg />
				</div>
			</div>
		</section>
	);
};

export default SectionThree;
