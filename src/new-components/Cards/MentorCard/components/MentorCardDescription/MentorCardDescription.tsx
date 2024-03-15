// Libraries
import React from 'react';
import ReactCountryFlag from 'react-country-flag';
// Components
import {Title, Text} from 'src/new-components/typography';
import Tag from 'src/new-components/Tag/Tag';
import Button, {ButtonTag} from 'src/new-components/Button/Button';
import SocialLink from 'src/new-components/SocialLink/SocialLink';
// Styles
import styles from './MentorCardDescription.module.scss';
// Types
import {
    TitleTag,
    TitleVariant,
} from 'src/new-components/typography/Title/Title';
import {Common} from 'src/types/main';
import classNames from 'classnames';

interface MentorCardDescriptionProps extends Common {
    userID: number;
    fullName: string;
    jobPosition: { id: number; name: string }[];
    services: { id: number; name: string }[];
    description: string;
    skills: { id: number; name: string }[];
    skillersTEST?: string[];

    isExtended?: boolean;
    categories?: { id: number; name: string }[];
    languages?: string[];
   socialMedia?: {
        linkedInURL?: string | null;
        youtubeURL?: string | null;
        instagramURL?: string | null;
        facebookURL?: string | null;
        websiteURL?: string | null;
    };
}

const MentorCardDescription = (props: MentorCardDescriptionProps) => {
    const {
        userID,
        fullName,
        jobPosition,
        services,
        description,
        skills,
        isExtended,
        categories,
        languages,
        socialMedia,
        classes,
        skillersTEST
    } = props;




    return (
        <div
            className={classNames(styles.wrapper, classes)}
            data-is-extended={isExtended}>
            <Title
                tag={TitleTag.h3}
                variant={TitleVariant.standard}
                classes={styles.userName}>
                {fullName}
                <small>
                    {jobPosition?.map((element, index) => element.name).join(', ')}
                </small>
            </Title>
            <ul className={styles.contact}>
                {services?.map((element, index) => (
                    <li key={element.id + index}>{element.name}</li>
                ))}
            </ul>
            <Title
                tag={TitleTag.h4}
                variant={TitleVariant.standard}
                classes={styles.smallTitle}>
                Opis
            </Title>
            <Text classes={styles.smallText}>{description}</Text>
            <Title
                tag={TitleTag.h4}
                variant={TitleVariant.standard}
                classes={styles.smallTitle}>
                Umiejętności:
            </Title>
            <ul className={styles.skills}>
                {skillersTEST?.map((skill, index) => (
                    <Tag key={index} name={skill} bgColor='#EFF4F9'/>
                ))}
            </ul>
            {isExtended && categories && (
                <>
                    <Title
                        tag={TitleTag.h4}
                        variant={TitleVariant.standard}
                        classes={styles.smallTitle}>
                        Kategorie:
                    </Title>
                    <ul className={styles.skills}>
                        {categories?.map((category, index) => (
                            <Tag key={category.id + index} name={category.name} bgColor='#EFF4F9'/>
                        ))}
                    </ul>
                </>
            )}
            {isExtended && languages && (
                <div className={styles.languages}>
                    <Title
                        tag={TitleTag.h4}
                        variant={TitleVariant.standard}
                        classes={styles.smallTitle}>
                        Języki:
                    </Title>
                    <ul className={styles.skills}>
                        {languages?.map((language) => (
                            <div className={styles.flag} key={language}>
                                <ReactCountryFlag countryCode={language} svg title={language}/>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
            {isExtended && !!socialMedia && (
                <div className={styles.socialMedia}>
                    {Object.keys(socialMedia).map((social) => {
                        const item = social as
                            | 'linkedInURL'
                            | 'youtubeURL'
                            | 'instagramURL'
                            | 'facebookURL'
                            | 'websiteURL'
                        return !!socialMedia[item] && <SocialLink key={social} link={socialMedia[item] as string} type={item}/>;
                    })}
                </div>
            )}
            <Button
                as={ButtonTag.InternalLink}
                href={`/user-profile/${userID}`}
                classes={styles.button}>
                Zobacz profil
            </Button>
        </div>
    );
};

export default MentorCardDescription;
