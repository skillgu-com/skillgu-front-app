import React, { useCallback, useState } from "react";
import AnimateHeight from "react-animate-height";
// Components
import Tag from "src/new-components/Tag/Tag";
// Styles
import styles from "./MentorListingCard.module.scss";
import { Title } from "@newComponents/typography";
import { TitleTag, TitleVariant } from "@newComponents/typography/Title/Title";
import clx from "classnames";
import StarSvg from "@icons/StarSvg";
import { SpecialVariant } from "@customTypes/mentor";

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
  specialVariant: SpecialVariant;
  tags: string[];
  title: string;
  tagsDisplay?: number;
  initialDescriptionHeight?: number|'auto';
}

const DEFAULT_TAGS_DISPLAY = 4;
const DEFAULT_DESCRIPTION_HEIGHT = 50;

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
  specialVariant,
  tags,
  title,
  tagsDisplay = DEFAULT_TAGS_DISPLAY,
  initialDescriptionHeight = DEFAULT_DESCRIPTION_HEIGHT,
}) => {
  const [tagsExpanded, setTagsExpanded] = useState<boolean>(false);
  const toggleTagsExpanded = useCallback(() => setTagsExpanded((s) => !s), []);
  const hiddenTags = tags.length - tagsDisplay;

  const [descriptionHeight, setDescriptionHeight] = useState<number | "auto">(
    initialDescriptionHeight
  );
  const toggleDescriptionExpanded = useCallback(
    () =>
      setDescriptionHeight((h) =>
        h === initialDescriptionHeight ? "auto" : initialDescriptionHeight
      ),
    []
  );

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
                classes={clx(styles.special, {
                  [styles[`special__${specialVariant}`]]: !!specialVariant,
                })}
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
        <a href={link} className={styles.link}>
          <Title
            tag={TitleTag.h3}
            variant={TitleVariant.standard}
            classes={styles.title}
          >
            {title}
          </Title>
        </a>
        <div className={styles.descriptionWrapper}>
          <AnimateHeight
            id="description"
            duration={500}
            height={descriptionHeight}
            animateOpacity={true}
            contentClassName={clx(styles.animateDescriptionContent, {
              [styles.animateDescriptionContentExpanded]:
                descriptionHeight !== initialDescriptionHeight,
            })}
          >
            <Title
              tag={TitleTag.h4}
              variant={TitleVariant.standard}
              classes={styles.description}
            >
              {description}
            </Title>
          </AnimateHeight>
          {initialDescriptionHeight !== 'auto' ? ( 
            <button
              className={styles.moreBtn}
              onClick={toggleDescriptionExpanded}
              type="button"
              aria-controls="example-panel"
              aria-expanded={descriptionHeight !== initialDescriptionHeight}
            >
              {descriptionHeight === initialDescriptionHeight
                ? "Pokaż więcej"
                : "Pokaż mniej"}
            </button>
          ) : null}
        </div>
      </div>
      <div className={styles.footer}>
        <ul className={styles.tags}>
          {tags?.slice(0, tagsExpanded ? undefined : 4).map((tag) => (
            <Tag key={tag} classes={styles.tag} name={tag} bgColor="" />
          ))}
          {hiddenTags > 0 && !tagsExpanded ? (
            <Tag
              onClick={toggleTagsExpanded}
              classes={clx(styles.tag, styles.clickable)}
              name={`+${hiddenTags}`}
              bgColor=""
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
