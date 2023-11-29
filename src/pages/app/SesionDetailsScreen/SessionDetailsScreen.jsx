import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import AppLayout from '../../../component/AppLayout';
import CustomButton, {
	buttonColors,
	buttonTypes,
} from '../../../component/CustomButton';
import {Rating} from '@mui/material';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

const SessionDetailsScreen = () => {
	const {id} = useParams();
	const sessionProcess = useSelector((state) => state.connectionProcess.sessionStep);

	console.log(sessionProcess)

	const placeholderObject = {
		sessionName: sessionProcess.sessionName,
		mentorName: 'Maciej',
		mentorId: 1,
		price: sessionProcess.sessionPrice,
		reviews: 4,
		reviewsAmount: 20,
		country: 'Stany Zjednoczone Ameryki',
		description: sessionProcess.sessionDescription,
		benefits: [
			{
				title: sessionProcess.sessionMinutes,
				description: 'To jest czas jaki mentor poświęci ci na tej sesji.',
			},
			{
				title: 'Kontakt',
				description:
					'Na sesji kontakt, jest tylko podczas trwania rozmowy, oraz na chat, po zakonczonym spotkaniu.',
			},
			{
				title: 'Opis sesji',
				description: sessionProcess.sessionDescription,
			},
		],
	};
	const [session, setSession] = useState(placeholderObject);

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
					{/*<p className='session-details__descrition'>{session.description}</p>*/}
					<ul className='session-details__benefits'>
						{session.benefits.map(({title, description}) => (
							<li key={title} className='session-details__benefits-item'>
								<h3>{title}</h3>
								<p>{description}</p>
							</li>
						))}
					</ul>
					<div className='session-details__buttons'>
						<CustomButton
							classes='session-details__button'
							as={buttonTypes.internalLink}
							color={buttonColors.secondary}
							link={`/mentor-profile/${session.mentorId}`}>
							Cofnij
						</CustomButton>
						<CustomButton
							classes='session-details__button'
							as={buttonTypes.internalLink}
							link={`/session-details/${session.mentorId}/book`}>
							Kontynuuj
						</CustomButton>
					</div>
				</div>
			</section>
		</AppLayout>
	);
};

export default SessionDetailsScreen;
