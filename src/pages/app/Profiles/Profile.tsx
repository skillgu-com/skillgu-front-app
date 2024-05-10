// Libraries
import React, {useEffect, useState} from 'react';
// Components
import MentorProfile from './MentorProfile/MentorProfile';
import Container from 'src/new-components/Container/Container';
import MentorCardPrice from 'src/new-components/Cards/MentorCard/components/MentorCardPrice/MentorCardPrice';
import MentorCard from 'src/new-components/Cards/MentorCard/MentorCard';
import PlanSelect from 'src/new-components/PlanSelect/PlanSelect';
import Modal from 'src/new-components/Modal/Modal';
import SessionCard from 'src/new-components/Cards/SessionCard/SessionCard';
// Types
import {Tag} from 'src/types/tags';
import MentorCardDescription
    from 'src/new-components/Cards/MentorCard/components/MentorCardDescription/MentorCardDescription';
// Styles
import styles from './Profile.module.scss';
import {useSelector} from 'react-redux';
import {UserData} from '../Settings/Settings';
import {useParams} from 'react-router-dom';
import {getMentorProfileByID} from "../../../services/MentorViewService";
import {fetchMentorSession} from "../../../services/SessionService";

interface SessionDataFromAPI {
    id: number;
    sessionType: string;
    sessionTime: number;
    sessionPrice: number;
    description: string;
    meetTime: any;
    mentorID: number;
}

interface PlanSelectProps {
    sessions: SessionDataFromAPI[];
    toggleModalHandler: () => void;
}

const Profile = () => {
    const userFromRedux = useSelector((state: any) => state.auth.user);
    const [userData, setUserData] = useState<UserData>({} as UserData);
    const {userID} = useParams();
    const [currentTab, setCurrentTab] = useState('mentorship');
    const [fetchMentorSessions, setFetchMentorSessions] = useState<SessionDataFromAPI[]>([]);
    const [showModal, setShowModal] = useState(false);






    const toggleModalHandler = (value?: boolean) =>
        setShowModal(value ?? !showModal);


    return (
        <>
            <Container as={Tag.Section}>
                <div className={styles.content}>
                    {/*<MentorProfile*/}
                    {/*    cardProfile={{*/}
                    {/*        profileImg:*/}
                    {/*            'https://cdn.pixabay.com/photo/2023/10/24/21/15/nature-8339115_1280.jpg',*/}
                    {/*        reviews: 1,*/}
                    {/*        reviewsAmount: 1,*/}
                    {/*        location: 'Poznań',*/}
                    {/*        timeZone: 'Poland (- 05:00 UTC)',*/}
                    {/*    }}*/}
                    {/*    fullName={'userData?.firstName + userData?.lastName'}*/}
                    {/*    position='Product manager key advisor'*/}
                    {/*    services={[*/}
                    {/*        {id: 1, name: 'Mentoring'},*/}
                    {/*        {id: 2, name: 'Praca z zadaniami'},*/}
                    {/*        {id: 3, name: 'Weekandowe spotkania'},*/}
                    {/*        {id: 4, name: 'Intensywna praca'},*/}
                    {/*    ]}*/}
                    {/*/>*/}
                    {userFromRedux.role === 'S' && (
                        <PlanSelect
                            sessions={fetchMentorSessions}
                            toggleModalHandler={toggleModalHandler}
                        />
                    )}
                    <div className={styles.mobileDescription}>
                        {/*<MentorCardDescription*/}
                        {/*    classes={styles.mobileDescriptionText}*/}
                        {/*    userID={1}*/}
                        {/*    fullName={'JEZUS'}*/}
                        {/*    // fullName={userData?.firstName + ' ' + userData?.lastName}*/}
                        {/*    jobPosition={userData?.jobPosition}*/}
                        {/*    services={userData?.services}*/}
                        {/*    description={userData?.description}*/}
                        {/*    skills={[{id: 1, name: 'Test'}]}*/}
                        {/*    isExtended={true}*/}
                        {/*    categories={userData?.mentorTopics}*/}
                        {/*    languages={['PL']}*/}
                        {/*    socialMedia={{*/}
                        {/*        linkedInURL: userData?.linkedInURL,*/}
                        {/*        youtubeURL: userData?.youtubeURL,*/}
                        {/*        instagramURL: userData?.instagramURL,*/}
                        {/*        websiteURL: userData?.websiteURL,*/}
                        {/*    }}*/}
                        {/*/>*/}
                        {userFromRedux.role === 'M' && (
                            <MentorCardPrice
                                price={500}
                                logoUrl='https://cdn.pixabay.com/photo/2015/10/31/12/54/google-1015751_1280.png'
                                companyName='Google'
                            />
                        )}
                    </div>

                    <MentorCard
                        profileImg='https://cdn.pixabay.com/photo/2023/10/24/21/15/nature-8339115_1280.jpg'
                        logoUrl=''
                        companyName=''
                        reviews={2}
                        reviewsAmount={3}
                        location={userData?.location}
                        timeZone='Poland (- 05:00 UTC)'
                        services={userData?.services}
                        userID={1}
                        quickResponder={true}
                        firstName={userData?.firstName}
                        lastName={userData?.lastName}
                        jobPosition={userData?.jobPosition}
                        description={userData?.description}
                        skill={userData?.skill}
                        isExtended={true}
                        categories={userData?.mentorTopics}
                        languages={['PL']}
                        socialMedia={{
                            linkedInURL: userData?.linkedInURL,
                            youtubeURL: userData?.youtubeURL,
                            instagramURL: userData?.instagramURL,
                            websiteURL: userData?.websiteURL,
                        }}
                    />
                </div>
            </Container>
            {showModal && (
                <Modal
                    title='Wszystkie dostępne sesje'
                    closeHandler={() => toggleModalHandler(false)}>
                    {fetchMentorSessions.map(element => (
                        <SessionCard
                            key={element?.id}
                            title={element?.sessionType}
                            time={element?.meetTime}
                            price={element?.sessionPrice}
                            description={element?.description}
                        />
                    ))}
                </Modal>
            )}
        </>
    );
};

export default Profile;
