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
  isCanceled?: boolean;
};

export const SectionTemplate = ({
                                  title,
                                  additionalContent,
                                  description,
                                  children,
                                  className,
                                  fullWidth,
                                  isCanceled = false,
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
          {isCanceled ? (
              <p className={styles.description}>
                Twoja subskrypcja została anulowana. Subskrypcja wygaśnie: {description}
              </p>
          ) : description ? (
              <p className={styles.description}>{description}</p>
          ) : null}
        </header>
        {children}
      </Container>
  );
};
