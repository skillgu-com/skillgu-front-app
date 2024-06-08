import React from "react";
import { ServiceMentoring } from "@customTypes/order";
import styles from "./ServiceMentoringOptionCard.module.scss";
import clx from "classnames";
import { RadioInputIcon } from "@icons/RadioInput";
import { CrownIcon } from "@icons/CrownIcon";
import { CheckCircleSolidIcon } from "@icons/CheckCircleSolidIcon";

type Props = ServiceMentoring & {
  name?: string;
  value?: string;
  selected?: boolean;
  handleSelect?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ServiceMentoringOptionCard = ({
  name,
  value,
  title,
  price,
  id,
  subtitle,
  variant,
  descriptionRows,
  selected,
  handleSelect,
}: Props) => {
  return (
    <button
      className={clx(styles.card, {
        [styles.selected]: selected,
      })}
      onClick={handleSelect}
      name={name}
      value={value}
    >
      <div className={styles.rowTitle}>
        {handleSelect ? <RadioInputIcon filled={selected} /> : null}
        <h5 className={styles.title}>{title}</h5>
        {variant === "pro" ? <CrownIcon /> : null}
      </div>
      {subtitle ? <p className={styles.subtitle}> {subtitle}</p> : null}

      <div className={styles.priceRow}>
        <strong>{Math.ceil(price / 100)} zł</strong>
        <span>miesięcznie</span>
      </div>

      {descriptionRows && descriptionRows.length > 0 ? (
        <div className={styles.listRow}>
          <h6>Plan obejmuje</h6>
          <ul>
            {descriptionRows.map((r) => (
              <li>
                <CheckCircleSolidIcon />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </button>
  );
};
