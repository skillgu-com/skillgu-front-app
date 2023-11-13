import React, {useEffect, useState} from 'react';
import AppLayout from '../../../component/AppLayout';
import {getAllMentors,} from '../../../services/UserProfileService';
import HeroHeader from '../../../component/HeroHeader';
import investors from '../../../assets/img/galaxy.png';
import MentorCard from '../../../component/Cards/MentorCard/MentorCard';
import MentorFilters from '../../../component/MentorFilters';

const MentorScreen = () => {
    let [mentors, setMentors] = useState([]);

    useEffect(() => {
        getAllMentors()
            .then((response) => {
                setMentors(response.data);
            })
            .catch((error) => {
                throw new Error(error.message);
            });
    }, []);


    console.log(mentors)

    return (
        <AppLayout>
            <HeroHeader title='Mentorzy' image={<img src={investors} alt='mentors'/>}/>
            <MentorFilters/>
            <section className='d-flex flex-wrap'>
                {mentors.length === 0 ? (<p>Brak dostępnych mentorów.</p>):(mentors.map((element) => (
                        <MentorCard
                            key={element.id}
                            name={element.firstName}
                            surname={element.lastName}
                            profileImg={'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg'}
                            specialization={element.jobPosition.join(', ')}
                            // specializationDescription={
                            //     'Ekspert ds. wzrostu organicznego i płatnego z ponad 10-letnim doświadczeniem w agencjach i firmach w marketingu cyfrowym.'
                            // }
                            contactOptions={{ chat: true, call: true, handsOn: true }}
                            reviews={4}
                            reviewsAmount={21}
                            description={element.description}
                            skills={element.skill && element.skill.length > 0 ? element.skill : []}

                            // skills={[
                            //     'Marketing',
                            //     'digital Marketing',
                            //     'Marketing digital',
                            //     'Marketing Google',
                            //     'Automation',
                            //     'SEO',
                            //     'Strategy Career',
                            // ]}
                            monthlyPrice={223}
                            expectations={[
                                'Jeden z naszych najlepszych mentorów, najlepsza obsługa i szybkie odpowiedzi',
                                'Nieograniczony czat, e-mail lub SMS z mentorem, w granicach.',
                                'Do 4 połączeń miesięcznie',
                            ]}
                            quickResponder={true}
                            trail={3}
                            userID={element.userID}
                        />
                    ))
                )}
            </section>
        </AppLayout>
    );
};

export default MentorScreen;
