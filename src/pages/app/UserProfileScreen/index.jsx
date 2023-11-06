import React, {useContext, useEffect, useState} from 'react';
import AppLayout from '../../../component/AppLayout';
import {useParams} from 'react-router-dom';
import {AuthContext} from "../../../context/AuthContextProvider";
import {useSelector} from "react-redux";
import {getUserProfile} from "../../../services/UserProfileService";
import PlansPanel from "../../../component/PlansPanel/PlansPanel";
import connectionProcessReducer from "../../../connectionProcessReducer";

const PLACEHOLDER_USER = {
    firstName: 'server:500',
    jobRole: 'server:500',
    description:
        'server:500',
    industry: 'server:500',
};

const UserProfileScreen = () => {

    const { userID } = useParams();
    const userFromRedux = useSelector((state) => state.auth.user);
    const [user, setUser] = useState({});

    const userData = ({
        userID: userID,
        role: userFromRedux?.role[0] === 'STUDENT' ? 'mentor' : 'student',
    })

    useEffect(() => {
        getUserProfile(userData).then((response) => {
            setUser(response.data);
        });
    }, []);


    return (
        <AppLayout>
            <div className='user-profile__grid'>
                <section className='user-profile__data'>
                    <div className='user-profile__data-photo'>
                        <img
                            src='https://cdn.pixabay.com/photo/2021/12/22/01/40/male-6886494_960_720.jpg'
                            alt='profile'
                        />
                    </div>
                </section>
                <section className='user-profile__data-info'>
                    <h3 className='info__name'>{user?.firstName}</h3>
                    <h4 className='info__lastName'>{user?.lastName}</h4>
                    <p className='info__description'>{user?.description}</p>
                </section>
                <section className='user-profile__about'>
                    <article className='app-section'>
                        <h3 className='app-section__title'>O mnie</h3>
                        <p className='app__text text-left'>
                            {user?.description}
                        </p>
                    </article>
                    <article className='app-section'>
                        <h3 className='app-section__title'>Branże które mnie interesują</h3>
                        <p className='app__text text-left'>
                            {user?.industry}
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
                {/*TODO tutaj jakos wykminic kiedy ma sie pojawic widok PlansPanel w zaleznosci czy to student wtedy nie widac, czy mentor*/}
                {user?.user_role === 'MENTOR' && (
                    <div className='user-profile__price'>
                        <PlansPanel />
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default UserProfileScreen;