import React, {useContext, useEffect, useState} from 'react';
import AppLayout from '../../../component/AppLayout';
import {getClientUser} from '../../../services/UserProfileService';
import HeroHeader from '../../../component/HeroHeader';
import sunset from '../../../assets/img/sunset.jpg';
import PlansPanel from '../../../component/PlansPanel/PlansPanel';

const UserProfileScreen = () => {
	let [user, setUser] = useState({});
	useEffect(() => {
		getClientUser().then((response) => {
			setUser(response.data);
		});
	}, []);

	return (
		<AppLayout>
			<HeroHeader
				title='Profil użytkownika'
				image={<img src={sunset} alt='słońce' />}
			/>
			<div className='user-profile__grid'>
				<section className='user-profile__data d-flex flex-wrap'>
					<div className='user-profile__data-photo'>
						<img
							src='https://cdn.pixabay.com/photo/2021/12/22/01/40/male-6886494_960_720.jpg'
							alt='profile'
						/>
					</div>
					<div className='user-profile__data-info'>
						<h3 className='info__name'>{user.firstName}</h3>
						<h4 className='info__position'>{user.jobRole}</h4>
						<h5 className='info__company'>Investalert.pl</h5>
						<h6 className='info__industry'>{user.industry}</h6>
					</div>
				</section>
				<section className='user-profile__about'>
					<article className='app-section'>
						<h3 className='app-section__title'>O mnie</h3>
						<p className='app__text text-left'>
							Programista z zawodu, startupowiec z zamiłowania. Szczęśliwy mąż,
							posiadacz dwóch psów, fan sportów walki i wodnych. Uwielbiam morze, lubię
							góry. Staram się czerpać z życia ile się da. Uwielbiam tworzyć,
							nastawiony na ciągły rozwój. Gdy stoisz w miejscu, tak naprawdę robisz
							zawsze krok w tył.
						</p>
					</article>
					<article className='app-section'>
						<h3 className='app-section__title'>Branże które mnie interesują</h3>
						<p className='app__text text-left'>
							IT, Motoryzacja, Gastronomia, Przetwórstwo, Rolnictwo, Technologia
						</p>
					</article>
					<article className='app-section'>
						<h3 className='app-section__title'>Region</h3>
						<ul className='app-list'>
							<li className='app-list__item'>Warszawa</li>
							<li className='app-list__item'>Wrocław</li>
							<li className='app-list__item'>Kraków</li>
							<li className='app-list__item'>Cała Polska</li>
						</ul>
					</article>
					<article className='app-section'>
						<h3 className='app-section__title'>Moja wiedza i doświadczenie</h3>
						<ul className='app-list'>
							<li className='app-list__item'>Software development</li>
							<li className='app-list__item'>Scrum</li>
							<li className='app-list__item'>Zarządzanie</li>
							<li className='app-list__item'>IT</li>
							<li className='app-list__item'>Nowe technologie</li>
							<li className='app-list__item'>Biznes</li>
							<li className='app-list__item'>Motywacja</li>
						</ul>
					</article>
				</section>
			</div>
				<div className='user-profile__price'>
					<PlansPanel />
				</div>
		</AppLayout>
	);
};

export default UserProfileScreen;
