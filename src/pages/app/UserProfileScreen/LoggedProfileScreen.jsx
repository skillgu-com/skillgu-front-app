import React, {useContext, useEffect, useState} from 'react';
import AppLayout from '../../../component/AppLayout';
import {getClientUser, getUserProfile, getUserProfileByEmail} from '../../../services/UserProfileService';
import HeroHeader from '../../../component/HeroHeader';
import sunset from '../../../assets/img/sunset.jpg';
import PlansPanel from '../../../component/PlansPanel/PlansPanel';
import {useParams} from 'react-router-dom';
import {getClientUserUUID} from '../../../services/UserProfileService';
import {searchAllMyOwnProjects} from "../../../services/SearchOfProjectsService";
import {AuthContext} from "../../../context/AuthContextProvider";

const PLACEHOLDER_USER = {
    firstName: '',
    jobRole: '',
    description:
        'Ekspert ds. wzrostu organicznego i płatnego z ponad 10-letnim doświadczeniem w agencjach i firmach w marketingu cyfrowym.',
    industry: 'D4 Cloud',
};

const LoggedProfileScreen = () => {
    let {studentID} = useParams();
    const {user} = useContext(AuthContext);
    const [test, setTest] = useState([]);

    useEffect(() => {
        getUserProfileByEmail(user.email).then((res=> {

            setTest(res.data);
        }));

    }, []);



    return (
        <AppLayout>
            <h1>HUJ</h1>
            {/*<div className='user-profile__grid'>*/}
            {/*    <section className='user-profile__data'>*/}
            {/*        <div className='user-profile__data-photo'>*/}
            {/*            <img*/}
            {/*                src='https://cdn.pixabay.com/photo/2021/12/22/01/40/male-6886494_960_720.jpg'*/}
            {/*                alt='profile'*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </section>*/}
            {/*    <section className='user-profile__data-info'>*/}
            {/*        <h3 className='info__name'>{user.firstName}</h3>*/}
            {/*        <h4 className='info__lastName'>{user.lastName}</h4>*/}
            {/*        <p className='info__description'>{user.description}</p>*/}
            {/*    </section>*/}
            {/*    <section className='user-profile__about'>*/}
            {/*        <article className='app-section'>*/}
            {/*            <h3 className='app-section__title'>O mnie</h3>*/}
            {/*            <p className='app__text text-left'>*/}
            {/*                {user.description}*/}
            {/*            </p>*/}
            {/*        </article>*/}
            {/*        <article className='app-section'>*/}
            {/*            <h3 className='app-section__title'>Branże które mnie interesują</h3>*/}
            {/*            <p className='app__text text-left'>*/}
            {/*                {user.industry}*/}
            {/*            </p>*/}
            {/*        </article>*/}
            {/*        <article className='app-section'>*/}
            {/*            <h3 className='app-section__title'>Region</h3>*/}
            {/*            <ul className='app-list'>*/}
            {/*                <li className='app-list__item'>Warszawa</li>*/}
            {/*                <li className='app-list__item'>Wrocław</li>*/}
            {/*                <li className='app-list__item'>Kraków</li>*/}
            {/*                <li className='app-list__item'>Cała Polska</li>*/}
            {/*            </ul>*/}
            {/*        </article>*/}
            {/*        <article className='app-section'>*/}
            {/*            <h3 className='app-section__title'>Moja wiedza i doświadczenie</h3>*/}
            {/*            <ul className='app-list'>*/}
            {/*                <li className='app-list__item'>Software development</li>*/}
            {/*                <li className='app-list__item'>Scrum</li>*/}
            {/*                <li className='app-list__item'>Zarządzanie</li>*/}
            {/*                <li className='app-list__item'>IT</li>*/}
            {/*                <li className='app-list__item'>Nowe technologie</li>*/}
            {/*                <li className='app-list__item'>Biznes</li>*/}
            {/*                <li className='app-list__item'>Motywacja</li>*/}
            {/*            </ul>*/}
            {/*        </article>*/}
            {/*    </section>*/}
            {/*    <div className='user-profile__price'>*/}
            {/*        <PlansPanel/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </AppLayout>
    );
};

export default LoggedProfileScreen;
