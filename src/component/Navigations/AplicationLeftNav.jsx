import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const AplicationLeftNav = () => {
    const [isActive, setIsActive] = useState(false);

    const direction = [
        [
            {
                label: 'Home',
                redirectUrl: '/home',
            },
            {
                label: 'Pomoc',
                redirectUrl: '/help',
            },
            // {
            //     label: 'Stwórz projekt',
            //     redirectUrl: '/create-mentor',
            // },
            // {
            //     label: 'Szukaj inwestycji',
            //     redirectUrl: '/search-setup',
            // },
        ],
        [
            // {
            //     label: 'Mapa projektów',
            //     redirectUrl: '/invest-maps',
            // },
            {
                label: 'Znajdź menotra',
                redirectUrl: '/mentors',
            },
        ],
        [
            {
                label: 'Ustawienia',
                redirectUrl: '/user-setup',
            }, {

            label: 'Profil',
            redirectUrl: '/user-profile',
        },
            {
                label: 'Cennik',
                redirectUrl: '/home',
            },
        ],
    ];

    return (
        <>
            <div className={`left-bar${isActive ? ' left-bar--active' : ''}`}>
                <nav className='left-bar__nav'>
                    {direction.map((list, index) => (
                        <ul key={'list' + index} className='left-bar__list'>
                            {list.map(({label, redirectUrl}) => (
                                <li key={label} className='left-bar__item'>
                                    <Link className='left-bar__link' to={redirectUrl}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ))}
                </nav>
            </div>
            <button className='left-bar__btn' onClick={() => setIsActive(!isActive)}>
                <span className='btn__inner'></span>
                <span className='btn__inner'></span>
                <span className='btn__inner'></span>
            </button>
            <p className="beta">V. BETA</p>
        </>
    );
};

export default AplicationLeftNav;
