import React, { useCallback, useState } from "react";
// Components
import Tag from "src/new-components/Tag/Tag";
// Styles
import styles from "./MentorListingCard.module.scss";
import { Title } from "@newComponents/typography";
import { TitleTag, TitleVariant } from "@newComponents/typography/Title/Title";
import clx from "classnames";
import StarSvg from "@icons/StarSvg";

interface MentorListingCardProps {
  avatar_url: string;
  description: string;
  fullName: string;
  id: string;
  link: string;
  price: string;
  profession: string;
  reviewsAvgRate: string;
  reviewsCount: string;
  special: string;
  tags: string[];
  title: string;
}

const TAGS_DISPLAY = 4;

export const MentorListingCard: React.FC<MentorListingCardProps> = ({
  avatar_url,
  description,
  fullName,
  link,
  price,
  profession,
  reviewsAvgRate,
  reviewsCount,
  special,
  tags,
  title,
}) => {
  const [extended, setExtended] = useState<boolean>(false);
  const toggle = useCallback(() => setExtended((s) => !s), []);

  const hiddenTags = tags.length - TAGS_DISPLAY;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img src={avatar_url} alt={fullName} className={styles.avatar} />
          <div className={styles.userHeader}>
            <div className={styles.userNameRow}>
              <a href={link} className={styles.link}>
                <Title
                  tag={TitleTag.h3}
                  variant={TitleVariant.standard}
                  classes={styles.name}
                >
                  {fullName}
                </Title>
              </a>
              <div className={styles.reviews}>
                <div className={styles.stars}>
                  <StarSvg />
                </div>
                <span>{reviewsCount}</span>
              </div>
              <Title
                tag={TitleTag.h3}
                variant={TitleVariant.standard}
                classes={styles.special}
              >
                {special}
              </Title>
            </div>
            <Title
              tag={TitleTag.h3}
              variant={TitleVariant.standard}
              classes={styles.profession}
            >
              {profession}
            </Title>
          </div>

          <div className={styles.reviewsLg}>
            <div className={styles.stars}>
              {new Array(Number(reviewsAvgRate)).fill("").map((_, i) => (
                <StarSvg key={i} />
              ))}
            </div>
            <span>
              {"("}
              {reviewsCount} opinii{")"}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <Title
          tag={TitleTag.h3}
          variant={TitleVariant.standard}
          classes={styles.title}
        >
          {title}
        </Title>
        <Title
          tag={TitleTag.h4}
          variant={TitleVariant.standard}
          classes={styles.description}
        >
          {description}
        </Title>
      </div>
      <div className={styles.footer}>
        <ul className={styles.tags}>
          {tags?.slice(0, 4).map((tag) => (
            <Tag key={tag} classes={styles.tag} name={tag} bgColor="#FFF7F5" />
          ))}
          {extended ? (
            tags
              ?.slice(4)
              .map((tag) => (
                <Tag
                  key={tag}
                  classes={styles.tag}
                  name={tag}
                  bgColor="#FFF7F5"
                />
              ))
          ) : hiddenTags > 0 ? (
            <Tag
              onClick={toggle}
              classes={clx(styles.tag, styles.clickable)}
              name={`+${hiddenTags}`}
              bgColor="#FFF7F5"
            />
          ) : null}
        </ul>
        {price && (
          <Title
            tag={TitleTag.h4}
            variant={TitleVariant.standard}
            classes={styles.price}
          >
            {price}
          </Title>
        )}
      </div>
    </div>
  );
};
