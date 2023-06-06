import React from 'react';

const stepsList = [
	{
		id: 's01',
		title: 'Twoja rola',
		description: 'Określ czy jesteś sprzedawcą czy inwestotem',
	},
	{
		id: 's02',
		title: 'Określ oczekiwania',
		description:
			'Stwórz ofertę na podstawie intuicyjnego formularza oraz wybierz formę kontaktu',
	},
	{
		id: 's03',
		title: 'Indywidualne oferty',
		description:
			'Twoja oferta trafia do określonej grupy zweryfikowanych odbiorców',
	},
	{
		id: 's04',
		title: 'Rośnij w siłę',
		description: 'Przeglądaj interesujące cię zgłoszenia i podejmuj współpracę!',
	},
];

const SectionTwo = () => {
	return (
		<section className='section-steps'>
			<div className='container row flex-wrap justify-content-around'>
				{stepsList.map(({id, title, description}) => (
					<div className='col-12 col-sm-6 col-lg-3' key={id}>
						<div className='section-steps__step mx-auto'>
							<h2 className='step__title'>{title}</h2>
							<p className='step__description'>{description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default SectionTwo;
