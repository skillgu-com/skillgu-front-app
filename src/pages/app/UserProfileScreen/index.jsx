import React, {useContext, useEffect, useState} from 'react';
import AppLayout from '../../../component/AppLayout';
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import {getUserProfile} from "../../../services/UserProfileService";
import PlansPanel from "../../../component/PlansPanel/PlansPanel";

const PLACEHOLDER_USER = {
    firstName: 'server:500',
    jobRole: 'server:500',
    description:
        'server:500',
    industry: 'server:500',
};

const UserProfileScreen = () => {

    const {userID} = useParams();
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
            <h1>PROFIL MENTORA KTORY JEST NA LISCIE</h1>
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
                        {user?.role === 'mentor' && (
                            <>
                                <h3 className='app-section__title'>Tematy, w których Tobie pomogę</h3>
                                <ul className='app-list'>
                                    {user?.category.map(element => (
                                        <li className='app-list__item' key={element}>{element}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </article>
                    <article className='app-section'>
                        {user?.role === 'mentor' && (
                            <>
                                <h3 className='app-section__title'>Moje skille</h3>
                                <ul className='app-list'>
                                    {user?.skill.map(element => (
                                        <li className='app-list__item' key={element}>{element}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </article>
                </section>
                {user?.role == 'mentor' && (
                    <div className='user-profile__price'>
                        <PlansPanel/>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default UserProfileScreen;