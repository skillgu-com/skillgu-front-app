import React, {useEffect, useState} from 'react';
import AppLayout from '../../../component/AppLayout';
import {useSelector} from "react-redux";
import {fetchUserProfileByEmail} from "../../../services/UserProfileService";

const PLACEHOLDER_USER = {
    firstName: '',
    jobRole: '',
    description:
        'Ekspert ds. wzrostu organicznego i płatnego z ponad 10-letnim doświadczeniem w agencjach i firmach w marketingu cyfrowym.',
    industry: 'D4 Cloud',
};

const LoggedProfileScreen = () => {

    const userFromRedux = useSelector((state) => state.auth.user);
    const [user, setUser] = useState(null);

    const userData = ({
        email: userFromRedux.email,
        role: userFromRedux?.role[0]
    })

    useEffect(() => {
        fetchUserProfileByEmail(userData).then((res) => {
            setUser(res.data);
            console.log(res.data);
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
                    <h4 className='info__job_position'>{user?.jobPosition}</h4>
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
                        <h3 className='app-section__title'>Umiejętności</h3>
                        <ul className='app-list'>
                            {user?.skill.map(skill => (
                                <li className='app-list__item' key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </article>
                </section>
            </div>
        </AppLayout>
    );
};

export default LoggedProfileScreen;
