import Container from "src/components/Container/Container";
import React from "react";
import { Tag } from "@customTypes/tags";

import styles from "./OfferPlan.module.scss";
import { PlanInput } from "@customTypes/create-mentoring";
import { ListStyleIcon } from "@icons/ListStyleIcon";
import DropdownIcon from "@icons/DropdownIcon";
import { ProPlanIcon } from "@icons/ProPlanIcon";
import Add from "@icons/Add";
import { Dropdown } from "src/components/_grouped/dropdown";
import Select from "src/components/Select/Select";
import { useForm } from "react-hook-form";
import { responseTimeOptions, sessionDurationOptions } from "../../config";

export const OfferPlan = ({
  data,
  title,
  pro,
}: {
  title: string;
  data: PlanInput;
  pro?: boolean;
}) => {
  const selectedResponseTimeOptions = responseTimeOptions.find(
    (s) => s.value === data.responseTime
  );
  const selectedSessionDurationOptions = sessionDurationOptions.find(
    (s) => s.value === data.sessionDuration
  );

  if (!selectedResponseTimeOptions || !selectedSessionDurationOptions) {
    return null;
  }

  return (
    <Container as={Tag.Section} classes={styles.container}>
      <div className={styles.containerPlan} data-variant={pro ? "pro" : null}>
        <h4 className={styles.title}>
          {title}
          {pro && (
            <span>
              <ProPlanIcon />
            </span>
          )}
        </h4>
        <div className={styles.priceBox}>
          <input
            className={styles.priceValue}
            value={data.price}
            name="price"
            size={2}
          />
          <label
            className={styles.priceCurrency}
            htmlFor="price"
            aria-labelledby="price"
          >
            zł
          </label>
          <span className={styles.pricePeriod}>miesięcznie</span>
        </div>

        <textarea
          className={styles.description}
          name="description"
          value={data.description}
        />
        <ul className={styles.list}>
          <p className={styles.subtitle}>Plan obejmuje</p>

          <li className={styles.listItem}>
            <ListStyleIcon />
            <input
              className={styles.box}
              name="numberOfSession"
              value={data.numberOfSessions}
              size={1}
            />
            <label htmlFor="numberOfSession" aria-label="numberOfSessions">
              sesje mentoringowe na miesiąc
            </label>
          </li>
          <li className={styles.listItem}>
            <ListStyleIcon />
            <span>każda po</span>
            <div className={styles.selectBox}>
              <Select
                label={selectedSessionDurationOptions.label}
                id="sessionDuration"
                name="sessionDuration"
                options={sessionDurationOptions}
                value={data.sessionDuration}
              />
            </div>
            <span>minut</span>
          </li>
          <li className={styles.listItem}>
            <ListStyleIcon />
            odpowiedź w przeciągu
            <div className={styles.selectBox}>
              <Select
                label={selectedResponseTimeOptions.label}
                id="responseTime"
                name="responseTime"
                options={responseTimeOptions}
                value={data.responseTime}
                classes={styles.select}
              />
            </div>
          </li>
          {data?.additional.map((item, ind) => (
            // TODO - key
            <li className={styles.listItem} key={ind}>
              <ListStyleIcon />
              <textarea
                name={(ind + 1).toString()}
                className={styles.description}
                value={item}
              />
            </li>
          ))}
        </ul>
        <button className={styles.addNew}>
          <Add />
          Dodaj kolejny punkt
        </button>
      </div>
    </Container>
  );
};
