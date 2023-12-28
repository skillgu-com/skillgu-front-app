import AppLayout from "../../../component/AppLayout";
import React from "react";
import HeroHeader from "../../../component/HeroHeader";
import headerImg from "../../../assets/img/sunrise.png";
import CardNavigation from "../../../component/CardNavigation";
import {ReactComponent as Create} from '../../../assets/icons/create.svg';
import {ReactComponent as HandMoney} from '../../../assets/icons/hand-money.svg';

const MentoringAndSessionDashboard = () => {

    const navigation = [
        {
            id: 1,
            title: 'Plan mentoringu',
            link: '/create-mentoring',
            icon: <HandMoney/>,
            allowedRoles: ["MENTOR"],
        },
        {
            id: 2,
            title: 'Sesje',
            link: '/create-session',
            icon: <Create/>,
            allowedRoles: ["MENTOR"],
        },
    ];


    return (/**/
        <AppLayout>
            <HeroHeader
                title='Stwórz plan spotkań'
                image={<img src={headerImg} alt='Las'/>}
            />
            <div className='row flex-wrap justify-content-around my-3 home-screen__services-panel'>
                {navigation.map(({title, id, icon, link}) => (
                    <CardNavigation key={id} title={title} icon={icon} link={link}/>
                ))}
            </div>
        </AppLayout>
    );
}

export default MentoringAndSessionDashboard;