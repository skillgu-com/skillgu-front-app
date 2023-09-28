import AppLayout from "../../../component/AppLayout";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContextProvider";
import {useNavigate} from "react-router-dom";
import {createSearchProject} from "../../../services/SearchOfProjectsService";
import HeroHeader from "../../../component/HeroHeader";
import headerImg from "../../../assets/img/sunrise.png";
import SearchProjectCreator from "../SearchOfProjectsView/FormSteps/SearchProjectCreator";
import CustomButton, {buttonColors, buttonTypes} from "../../../component/CustomButton";
import MentoringPlanCreatorView from "./FormSteps/MentoringPlanCreatorView";
import CardNavigation from "../../../component/CardNavigation";
import {ReactComponent as Handshake} from '../../../assets/icons/handshake.svg';
import {ReactComponent as Create} from '../../../assets/icons/create.svg';
import {ReactComponent as Search} from '../../../assets/icons/search-money.svg';
import {ReactComponent as HandMoney} from '../../../assets/icons/hand-money.svg';

const CreateNewMeeting = () => {

    const navigation = [
        {
            id: 1,
            title: 'Plan mentoringu',
            link: '/create-mentoring-plan',
            icon: <HandMoney/>,
            allowedRoles: [ "MENTOR"],
        },
        {
            id: 2,
            title: 'Sesje',
            link: '/create-session-plan',
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


export default CreateNewMeeting;