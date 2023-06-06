import React from 'react';
import {useNavigate} from 'react-router-dom';
import CustomButton from '../CustomButton';

const InvestCard = ({
                        title,
                        location,
                        icon = 'https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_960_720.png',
                        noFollow,
                        industry,
                        roi,
                        invested = false,
                        pitchDeckURL = false,
                        pitchDeckTitle,
                    }) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/pitchdeck/${pitchDeckURL}`);
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
                        <strong>Lokalizacje:</strong> {location}
                    </p>
                    <p className='invest-card__info '>
                        <strong>Banże:</strong> {industry}
                    </p>
                    <p className='invest-card__info '>
                        <strong>Rentowność:</strong> {roi}%
                    </p>
                </div>
            </div>
            <div className='invest-card__buttons d-flex justify-content-center align-items-center'>
                {noFollow && (
                    <CustomButton color='transparent' onClick={handleNavigate}>
                        Nie obserwuj
                    </CustomButton>
                )}
                <CustomButton as='internal-link' link={`/pitchdeck/${pitchDeckURL}`}>
                    Więcej
                </CustomButton>
            </div>
        </div>
    );
};

export default InvestCard;
