import React, {useEffect, useState} from 'react';
// Container
import Container from '@newComponents/Container/Container';
import Notifications from '../Notifications/Notifications';
// Types
import {Tag} from '@customTypes/tags';
// Styles
import styles from './Topbar.module.scss';
import {useSelector} from 'react-redux';
import {fetchUserImageFile} from "@services/files/files.service";

const TopBar = () => {
    const user = useSelector((state: any) => state.auth?.user);
    const [image, setImage] = useState("");

    useEffect(() => {
        fetchUserImageFile(user.id).then(res => {
            setImage(res?.data);
        });
    }, [user?.id]);

    return (
        <Container as={Tag.Aside} classes={styles.wrapper}>
            <div className={styles.profile}>
                <div className={styles.profileImage}>
                    {image ? (
                        <img src={image} alt={user.email} />
                    ) : (
                        <img src='https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg' alt={user.email} />
                    )}
                </div>
                <span>{user.email}</span>
            </div>
            <Notifications/>
        </Container>
    );
};

export default TopBar;
