// Libraries
import React, {useContext, useEffect, useState} from 'react';

// Components
import AppLayout from '../../../component/AppLayout';
import UsersCard from '../../../component/InvestCard';
import CardNavigation from '../../../component/CardNavigation';
import HeroHeader from '../../../component/HeroHeader';
import CardsSlider from '../../../component/CardsSlider';

// APIs
import {searchAllMyOwnProjects} from '../../../services/SearchOfProjectsService';

// Icons
import {ReactComponent as Handshake} from '../../../assets/icons/handshake.svg';
import {ReactComponent as Create} from '../../../assets/icons/create.svg';
import {ReactComponent as Search} from '../../../assets/icons/search-money.svg';
import {ReactComponent as HandMoney} from '../../../assets/icons/hand-money.svg';
import homeBg from '../../../assets/img/landscape.jpg';
import {AuthContext} from "../../../context/AuthContextProvider";
import {getAllMentorStudents} from "../../../services/UserProfileService";

const navigation = [
    {
        id: 1,
        title: 'Kalendarz',
        link: '/invest-maps',
        icon: <HandMoney/>,
        allowedRoles: ['STUDENT', "MENTOR"],
    },
    {
        id: 2,
        title: 'Stwórz spotkania',
        link: '/create-mentor',
        icon: <Create/>,
        allowedRoles: ['STUDENT', "MENTOR"],
    },
    {
        id: 3,
        title: 'Harmonogram spotkań',
        link: '/search-invest-projects',
        icon: <Search/>,
        allowedRoles: ['STUDENT'],
    },
    {
        id: 4,
        title: 'Szukaj mentora do współpracy',
        link: '/underconstruction',
        icon: <Handshake/>,
        allowedRoles: ['STUDENT'],
    },
    {
        id: 5,
        title: 'Twoje konto',
        link: '/underconstruction',
        icon: <HandMoney/>,
        allowedRoles: ['STUDENT'],
    },
];

const users2 = [
    {
        title: 'MSW',
        location: 'Adam Nowak',
        industry: 'IT',
        roi: 10,
        noFollow: true,
    },


    // {
    // 	title: 'MMW',
    // 	location: 'Warszawa, Kraków, Gdańsk, Szczecin',
    // 	industry: 'IT',
    // 	roi: 10,
    // 	noFollow: true,
    // 	invested: true,
    // },
    // {
    // 	title: 'MMW',
    // 	location: 'Warszawa, Kraków, Gdańsk, Szczecin',
    // 	industry: 'IT',
    // 	roi: 10,
    // 	noFollow: true,
    // 	invested: true,
    // },
    // {
    // 	title: 'MMW',
    // 	location: 'Warszawa, Kraków, Gdańsk, Szczecin',
    // 	industry: 'IT',
    // 	roi: 10,
    // 	noFollow: true,
    // 	invested: true,
    // },
];

const myCards = [
    {
        firstName: 'MMW',
        location: 'Warszawa, Kraków, Gdańsk, Szczecin',
        industry: 'IT',
        jobPosition: 'Software Engineer at Facebook',
        roi: 10,
    },
];


const HomeScreen = () => {
    let [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]); // Inicjalizacja stanu users jako pusta tablica


    const {user} = useContext(AuthContext);

    const filteredNavigation = navigation.filter((item) =>
        item.allowedRoles.includes(user.role[0])
    );

    useEffect(() => {
        searchAllMyOwnProjects().then((r) => {
            setProjects(r.data);
        });
    }, []);

    useEffect(() => {
        getAllMentorStudents()
            .then(res => {
                if (res.data.length > 0) {
                    setUsers(res.data);
                    console.log(res.data)
                } else {
                    setUsers([]);
                }
            })
            .catch(reason => {
                console.error(reason)
            })
    }, []);


    return (
        <AppLayout>
            <HeroHeader
                title={`Witaj ` + user.role}
                image={<img src={homeBg} alt='investors'/>}
            />
            <div className='row flex-wrap justify-content-around my-3 home-screen__services-panel'>
                {filteredNavigation.map(({title, id, icon, link}) => (
                    <CardNavigation key={id} title={title} icon={icon} link={link}/>
                ))}
            </div>
            <div className='home-screen__lists d-flex'>
                <CardsSlider title={user.role[0] === 'MENTOR' ? 'Moi studenci' : 'Moi mentorzy'} as={UsersCard}
                             items={users} noMaxHeight/>

                {/*TODO */}
                {/*<CardsSlider title='Moje projekty' as={InvestCard} items={myCards} noMaxHeight />*/}
            </div>
        </AppLayout>
    );
};

export default HomeScreen;
