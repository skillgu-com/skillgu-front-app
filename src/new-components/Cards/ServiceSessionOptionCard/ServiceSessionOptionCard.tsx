import React, { useRef } from "react";
import { ServiceSession } from "@customTypes/order";
import Camera from "@icons/Camera";
import People from "@icons/People";
import styles from "./ServiceSessionOptionCard.module.scss";
import clx from "classnames";
import { RadioInputIcon } from "@icons/RadioInput";
import { ClockSolidCircleIcon } from "@icons/ClockSolidCircleIcon";
import { DollarCircleIcon } from "@icons/DollarCircleIcon";

type Props = ServiceSession & {
  name?: string;
  value?: string;
  selected?: boolean;
  handleSelect?: React.MouseEventHandler<HTMLButtonElement>;
  handleDetails?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ServiceSessionOptionCard = ({
  name,
  value,
  title,
  price,
  durationMinutes,
  selected,
  handleDetails,
  handleSelect,
}: Props) => {
  const detailsRef = useRef<HTMLButtonElement>(null);
  const _handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement;
    if (detailsRef.current && target === detailsRef.current) {
      return;
    }
    handleSelect && handleSelect(e);
  };

  return (
    <button
      className={clx(styles.card, {
        [styles.selected]: selected,
      })}
      onClick={_handleSelect}
      name={name}
      value={value}
    >
      <div className={styles.rowTitle}>
        <RadioInputIcon filled={selected} />
        <h5 className={styles.title}>{title}</h5>
      </div>
      <div className={styles.rowInfo}>
        {price ? (
          <div className={styles.infoCell}>
            <DollarCircleIcon />
            {Math.ceil(price / 100)} zł/h
          </div>
        ) : null}
        {durationMinutes ? (
          <div className={styles.infoCell}>
            <ClockSolidCircleIcon />
            {durationMinutes} min
          </div>
        ) : null}
      </div>
      <div className={styles.rowActions}>
        <button
          ref={detailsRef}
          className={styles.detailsBtn}
          onClick={handleDetails}
        >
          Więcej informacji
        </button>
      </div>
    </button>
  );
};
