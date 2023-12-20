import React, {useEffect, useState} from 'react';
import AppLayout from '../../../component/AppLayout';
import {getAllMentors,} from '../../../services/UserProfileService';
import HeroHeader from '../../../component/HeroHeader';
import investors from '../../../assets/img/galaxy.png';
import MentorCard from '../../../component/Cards/MentorCard/MentorCard';
import MentorFilters from "./MentorFilters";
import {getAllFilteredMentors} from "../../../services/MentorViewService";

const MentorScreen = () => {
    const [mentors, setMentors] = useState([]);
    let [filteredMentors, setFilteredMentors] = useState([]);
    let [selectedCategory, setSelectedCategory] = useState('');
    let [filterCriteria, setFilters] = useState({category: '', skill: ''});


    useEffect(() => {
        getAllMentors()
            .then((response) => {
                setMentors(response.data);
                setFilteredMentors(response.data);
            })
            .catch((error) => {
                throw new Error(error.message);
            });
    }, []);

    useEffect(() => {
        const filtered = mentors.filter(mentor =>
            selectedCategory === '' || mentor.category.includes(selectedCategory)
        );
        setFilteredMentors(filtered);
    }, [selectedCategory, mentors]);


    useEffect(() => {
        const user = {
            skill: filterCriteria.skill,
            category: filterCriteria.category
        };
        getAllFilteredMentors(user)
            .then((response) => {
                setMentors(response.data); // aktualizacja mentorów z przefiltrowanymi danymi
                setFilteredMentors(response.data); // aktualizacja przefiltrowanych mentorów
            })
            .catch((error) => {
                throw new Error(error.message);
            });
    }, [filterCriteria]); // nasłuchiwanie zmian w filterCriteria

    console.log(filterCriteria);

    const handleFilterChange = (element) => {
        setFilters(prevFilters => ({...prevFilters, ...element}));
    };


    return (
        <AppLayout>
            <HeroHeader title='Mentorzy' image={<img src={investors} alt='mentors'/>}/>
            <MentorFilters onFilterChange={handleFilterChange}/>
            <section className='d-flex flex-wrap'>
                {mentors.length === 0 ? (<p>Brak dostępnych mentorów.</p>) : (mentors.map((element) => (
                        <MentorCard
                            key={element.uuid}
                            name={element.firstName}
                            surname={element.lastName}
                            profileImg={'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg'}
                            specialization={element.jobPosition?.join(', ')}
                            specializationDescription={
                                element.category?.join(', ')
                            }
                            contactOptions={{chat: true, call: true, handsOn: true}}
                            reviews={4}
                            reviewsAmount={21}
                            description={element.description}
                            skills={element.skill && element.skill.length > 0 ? element.skill : []}

                            monthlyPrice={111}
                            expectations={[
                                'Jeden z naszych najlepszych mentorów, najlepsza obsługa i szybkie odpowiedzi',
                                'Nieograniczony czat, e-mail lub SMS z mentorem, w granicach.',
                                'Do 4 połączeń miesięcznie',
                            ]}
                            quickResponder={true}
                            trail={7}
                            userID={element.userID}
                        />
                    ))
                )}
            </section>
        </AppLayout>
    );
};

export default MentorScreen;
