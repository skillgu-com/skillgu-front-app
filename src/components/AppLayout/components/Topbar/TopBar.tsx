import React, { useEffect, useMemo, useState } from "react";
// Container
import Container from "../../../Container/Container";
import Notifications from "../Notifications/Notifications";
// Types
import { Tag } from "@customTypes/tags";
// Styles
import styles from "./Topbar.module.scss";
import { useSelector } from "react-redux";
import { fetchUserImageFile } from "@services/files/files.service";

const TopBar = () => {
  const user = useSelector((state: any) => state.auth?.user);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchUserImageFile(user.id).then((res) => {
      setImage(res?.data);
    });
  }, [user?.id]);

  const userProfileLink =
    user && user.role === "M" ? `/mentor/${user.username}` : "";
  const ProfileLinkTag = userProfileLink ? "a" : "div";

  return (
    <Container as={Tag.Aside} classes={styles.wrapper}>
      <ProfileLinkTag className={styles.profile} href={userProfileLink}>
        <div className={styles.profileImage}>
          {image ? (
            <img src={image} alt={user.email} />
          ) : (
            <img
              src="https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg"
              alt={user.email}
            />
          )}
        </div>
        <span>{user.email}</span>
      </ProfileLinkTag>

      <Notifications />
    </Container>
  );
};

export default TopBar;
