import React, {useEffect, useState} from 'react'
import Card from '../../../component/Card';
import AppLayout from '../../../component/AppLayout';
import {getAllClientUsers, getClientUser} from "../../../services/UserProfileService";
import HeroHeader from '../../../component/HeroHeader';
import investors from '../../../assets/img/galaxy.png'

const InvestrosScreen = (props) => {

    let [users, setUsers] = useState([]);
    useEffect(() => {
            getAllClientUsers().then(response => {
                setUsers(response.data)
            })
        }, []
    );

    return (
        <AppLayout>
            <HeroHeader title='Inwestorzy' image={<img src={investors} alt='investors'/>}/>
            <section className='d-flex flex-wrap'>
                {users.map(element=> {
                    return (
                        <Card
                            uuid={element.uuid}
                            type='investor'
                            title={element.firstName}
                            company=''
                            city='Łódź'
                            investsAmount={1}
                            commonContacts={50}
                            subtitle='CEO'
                            image='https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg'
                            classes='col-12 col-sm-6 col-lg-4'
                        />
                    )
                })}
            </section>

        </AppLayout>
    )
}

export default InvestrosScreen