import React from 'react';
// Components
import MentorCardDescription from './components/MentorCardDescription/MentorCardDescription';
import MentorCardPrice from './components/MentorCardPrice/MentorCardPrice';
import MentorCardProfile from './components/MentorCardProfile/MentorCardProfile';
import Tag from 'src/new-components/Tag/Tag';
import Button, {ButtonTag} from 'src/new-components/Button/Button';
// Styles
import styles from './MentorCard.module.scss';


interface MentorCardProps {
    userID: number;
    firstName: string;
    lastName: string;
    profileImg: string;
    jobPosition: { id: number; name: string }[];
    contactOptions?: string[];
    reviews: number;
    reviewsAmount: number;
    companyName: string;
    description: string;
    logoUrl: string;
    skill: { id: number; name: string }[];
    price?: number;
    location: string | null;
    timeZone: string;
    quickResponder: boolean;
    categories: { id: number; name: string }[];
    services: { id: number; name: string }[];
    mentorTopics?: any[];
    linkedin?: string
     socialMedia: {
        linkedInURL?: string | null
        youtubeURL?: string | null;
        instagramURL?: string | null;
        facebookURL?: string | null;
        websiteURL?: string | null;
        xurl?: string | null;
    };
    languages?: string[];
    isExtended?: boolean
}

const MentorCard: React.FC<MentorCardProps> = (props) => {
    const {
        userID,
        firstName,
        lastName,
        profileImg,
        jobPosition,
        reviews,
        reviewsAmount,
        companyName,
        description,
        logoUrl,
        skill,
        price,
        location,
        timeZone,
        quickResponder,
        categories,
        services,
        mentorTopics,
        socialMedia,
        languages,
        isExtended,

    } = props;

    console.log('TUTAJ SPRAWDZAM PROPSY: ',props)

    return (

        <div className={styles.wrapper} data-is-extended={isExtended}>

            {quickResponder && (
                <Tag classes={styles.tag} bgColor='#ECF7F2' name='Szybko odpowiada'/>
            )}
            <MentorCardProfile
                profileImg={'https://cdn.pixabay.com/photo/2023/03/29/19/32/man-7886201_1280.jpg'}
                reviews={reviews}
                reviewsAmount={reviewsAmount}
                location={location}
                timeZone={timeZone}
            />
            <MentorCardDescription
                userID={userID}
                fullName={firstName + ' ' + lastName}
                jobPosition={jobPosition}
                services={services}
                description={description}
                skills={skill}
                isExtended={isExtended}
                categories={categories}
                languages={languages}
                socialMedia={socialMedia}
            />

            <MentorCardPrice price={500}
                             logoUrl={'https://cdn.pixabay.com/photo/2015/10/31/12/54/google-1015751_640.png'}
                             companyName={'Google'}/>


            <Button
                as={ButtonTag.InternalLink}
                href={`/user-profile/${userID}`}
                classes={styles.button}>
                Zobacz profil
            </Button>
        </div>
    );
};

export default MentorCard;