import Container from "src/components/Container/Container";
import React from "react";
import { Tag } from "@customTypes/tags";

import styles from "./OfferPlan.module.scss";
import { PlanInput } from "@customTypes/create-mentoring";
import { ListStyleIcon } from "@icons/ListStyleIcon";
import DropdownIcon from "@icons/DropdownIcon";
import { ProPlanIcon } from "@icons/ProPlanIcon";
import Add from "@icons/Add";

export const OfferPlan = ({
  data,
  title,
  subtitle,
  pro,
}: {
  title: string;
  subtitle: string;
  data: PlanInput;
  pro?: boolean;
}) => {
  return (
    <Container as={Tag.Section} classes={styles.container}>
      <div className={styles.containerSchedule}>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.box}>
          <span>{data?.schedule}</span>
          <DropdownIcon />
        </p>
      </div>
      <div className={styles.containerPlan} data-variant={pro ? "pro" : null}>
        <h4 className={styles.title}>
          {title} <span>{pro && <ProPlanIcon />}</span>
        </h4>
        <div className={styles.priceBox}>
          <p className={styles.priceValue}>{data.price}</p>
          <p className={styles.priceCurrency}>zł</p>
          <p className={styles.pricePeriod}>miesięcznie</p>
        </div>
        <p className={styles.description}>{data.description}</p>
        <ul className={styles.list}>
          <p className={styles.subtitle}>Plan obejmuje</p>

          <li className={styles.listItem}>
            <ListStyleIcon />
            <span className={styles.box}>{data.numberOfSessions}</span>sesje
            mentoringowe na miesiąc
          </li>
          <li className={styles.listItem}>
            <ListStyleIcon />
            <p>każda po</p>
            <p className={styles.box}>
              <span>{data.sessionDuration}</span> <DropdownIcon />
            </p>
            minut
          </li>
          <li className={styles.listItem}>
            <ListStyleIcon />
            odpowiedź w przeciągu
            <p className={styles.box}>
              <span>{`${data.responseTime} h`}</span>
              <DropdownIcon />
            </p>
          </li>
          {data?.additional.map((item, ind) => (
            // TODO - key
            <li className={styles.listItem} key={ind}>
              <ListStyleIcon />
              <p className={styles.box}>{item}</p>
            </li>
          ))}
        </ul>
        <p className={styles.addNew}>
          <Add />
          Dodaj kolejny punkt
        </p>
      </div>
    </Container>
  );
};
