import React, { ReactNode } from "react";
import clx from "classnames";

import Container from "src/components/Container/Container";
import { TitleTag, TitleVariant } from "src/components/typography/Title/Title";
import { Title } from "src/components/typography";

import { Tag } from "@customTypes/tags";

import styles from "./SectionTemplate.module.scss";

type SectionTemplatePropsType = {
  title: string;
  additionalContent?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
};

export const SectionTemplate = ({
  title,
  additionalContent,
  description,
  children,
  className,
  fullWidth,
}: SectionTemplatePropsType) => {
  return (
    <Container as={Tag.Section} classes={clx(styles.container, className)}>
      <header className={styles.header}>
        <div
          className={clx(
            styles.titleWrapper,
            fullWidth ? styles.fullWidth : null
          )}
        >
          <Title
            tag={TitleTag.h2}
            variant={TitleVariant.section}
            classes={styles.title}
          >
            {title}
          </Title>
          {additionalContent}
        </div>
        {description ? (
          <p className={styles.description}>{description}</p>
        ) : null}
      </header>
      {children}
    </Container>
  );
};
