import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import CustomButton from '../CustomButton';

const UserCard = ({
                      userID,
                      firstName,
                      location,
                      icon = 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
                      noFollow,
                      industry,
                      lastName,
                      jobTitle,
                      invested = false,
                      pitchDeckURL = false,
                      pitchDeckTitle,
                      linkedin_url,
                      goalDescription
                  }) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        // navigate(`/pitchdeck/${pitchDeckURL}`);
    };


    return (
        <div className='invest-card d-flex row justify-content-between align-items-center'>
            {invested && (
                <div className='invest-card__invest-sign'>
                    $ <span>Zainwestowano</span>
                </div>
            )}
            <div className=' d-flex'>
                <div className='invest-card__icon d-flex column align-items-center justify-content-center'>
                    <img src={icon} alt='icon'/>
                </div>
                <div>
                    <h4 className='invest-card__title'>{pitchDeckTitle}</h4>
                    <p className='invest-card__info'>
                        <strong>Imię:</strong> {firstName}
                    </p>
                    <p className='invest-card__info '>
                        <strong>Nazwisko:</strong> {lastName}
                    </p>
                    <p className='invest-card__info '>
                        <strong>Zawód:</strong> {jobTitle}
                    </p>
                    <p className='invest-card__info '>
                        <strong>Wykupione spotkania:</strong> {true}
                    </p>
                    <p className='invest-card__info '>
                        <strong>Cele do zrealizowania:</strong> {goalDescription}
                    </p>
                    <p className='invest-card__info '>
                        <strong>Linkedin:</strong> {linkedin_url}
                    </p>

                </div>
            </div>
            <div className='invest-card__buttons d-flex justify-content-center align-items-center'>
                {noFollow && (
                    <CustomButton color='transparent' onClick={handleNavigate}>
                        Nie obserwuj
                    </CustomButton>
                )}
                {/*<CustomButton as='internal-link' link={`/user-profile/${studentID}`}>*/}
                {/*    Więcej*/}
                {/*</CustomButton>*/}

                <CustomButton as='internal-link' link={`/user-profile/${userID}`}>
                    Więcej
                </CustomButton>
            </div>
        </div>
    );
};

export default UserCard;
