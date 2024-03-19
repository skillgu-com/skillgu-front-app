// Libraries
import React, {useEffect, useState} from 'react';
// Components
import Container from 'src/new-components/Container/Container';
import MentorCard from 'src/new-components/Cards/MentorCard/MentorCard';
import {Title} from 'src/new-components/typography';
import Button from 'src/new-components/Button/Button';
// API
import {getAllMentors} from 'src/services/UserProfileService';
// Styles
import styles from './MentorsList.module.scss';
// Types
import {Tag} from 'src/types/tags';
import {
    TitleTag,
    TitleVariant,
} from 'src/new-components/typography/Title/Title';

const MentorsList = () => {
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        getAllMentors()
            .then((response) => {
                setMentors(response.data)
            })
            .catch((error) => {
                throw new Error(error.message);
            });
    }, []);




    return (
        <Container as={Tag.Section} classes={styles.wrapper}>
            <Title tag={TitleTag.h2} variant={TitleVariant.standard}>
                Wyniki wyszukiwania
            </Title>
            <div className={styles.mentorsList}>
                {mentors?.map((item: any) => (
                    <MentorCard key={item.userID} {...item} />
                ))}
            </div>
            <Button classes={styles.loadMore}>Załaduj więcej</Button>
        </Container>
    );
};

export default MentorsList;
