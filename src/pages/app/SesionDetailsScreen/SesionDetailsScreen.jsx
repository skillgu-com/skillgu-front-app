import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import AppLayout from '../../../component/AppLayout';
import CustomButton, {buttonTypes} from '../../../component/CustomButton';
import {Rating} from '@mui/material';
import {Link} from 'react-router-dom';

const placeholderObject = {
	sessionName: 'Feddback',
	mentorName: 'Janusz',
	mentorId: 1,
	price: '100',
	reviews: 4,
	reviewsAmount: 20,
	country: 'Polska',
	description:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates vero laborum dolorum, culpa maiores dolorem, deserunt, libero maxime enim adipisci repellat. Corporis tempora fugit aut? Iste quae voluptas reprehenderit blanditiis! Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptates vero laborum dolorum, culpa maiores dolorem, deserunt, libero maxime enim adipisci repellat. Corporis tempora fugit aut? Iste quae voluptas reprehenderit blanditiis!',
	benefits: [
		{
			title: '30 minut',
			description:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, dolorum.',
		},
		{
			title: 'Kontakt',
			description:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, dolorum.',
		},
		{
			title: 'Doświadczenie',
			description:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, dolorum.',
		},
	],
};

const SesionDetailsScreen = () => {
	const {id} = useParams();
	const [session, setSession] = useState(placeholderObject);

	// useEffect(() => {

	// }, [id]);

	return (
		<AppLayout>
			<section className='session-details'>
				<div className='session-details__image'>
					<img
						src='https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg'
						alt={session.mentorName}
					/>
				</div>
				<div className='session-details__content'>
					<h1 className='session-details__title'>
						{session.sessionName} z{' '}
						<Link to={`/mentor-profile/${session.mentorId}`}>
							{session.mentorName}
						</Link>
					</h1>
					<div className='session-details__info'>
						<p className='session-details__info-price'>{session.price} zł</p>
						<div className='mentor-card__overview-reviews'>
							<Rating
								className='mentor-card__overview-stars'
								name='read-only'
								value={session.reviews}
								readOnly
							/>
							<span>
								<b>{session.reviews}</b> ({session.reviewsAmount} opinii)
							</span>
						</div>
						<p className='session-details__info-country'>{session.country}</p>
					</div>
					<p className='session-details__descrition'>{session.description}</p>
					<ul className='session-details__benefits'>
						{session.benefits.map(({title, description}) => (
							<li key={title} className='session-details__benefits-item'>
								<h3>{title}</h3>
								<p>{description}</p>
							</li>
						))}
					</ul>
					<CustomButton
					classes='session-details__button'
						as={buttonTypes.internalLink}
						link={`/session-details/${id}/book`}>
						Kontynuuj
					</CustomButton>
				</div>
			</section>
		</AppLayout>
	);
};

export default SesionDetailsScreen;
