import React from "react";
import styles from "./Sidebar.module.scss";
import clx from "classnames";
import { ServiceSession } from "@customTypes/order";
import Camera from "@icons/Camera";
import People from "@icons/People";
import { ServiceSessionOptionCard } from "@newComponents/Cards/ServiceSessionOptionCard/ServiceSessionOptionCard";
import { LinkIcon } from "@icons/LinkIcon";

type Props = {
  services: ServiceSession[];
  selected?: ServiceSession | null;
  handleSelect: (opt: ServiceSession) => void;
  handleSubmit: (opt: ServiceSession) => void;
};

export const MentorServicesSession = ({
  services,
  selected,
  handleSelect,
  handleSubmit,
}: Props) => {


  return services.length ? (
    <>
      <div className={styles.cards}>
        {services.map((s) => (
          <ServiceSessionOptionCard
             key={s.id} 
             {...s} 
             handleSelect={() => handleSelect(s)}
             selected={s === selected}
          />
        ))}
      </div>
      <button
        onClick={selected ? () => handleSubmit(selected) : undefined}
        className={styles.submitBtn}
      >
        Zarezerwuj termin
      </button>
      <div className={clx(styles.infoBox, styles.border)}>
        <p className={styles.infoBox_title}>Informacje dotyczące sesji</p>
        <ul className={styles.infoBox_list}>
          <li className={styles.infoBox_row}>
            <div className={styles.infoBox__icon_wrapper}>
              <Camera />
            </div>{" "}
            <span>Spotkanie w formie video</span>
          </li>
          <li className={styles.infoBox_row}>
            <div className={styles.infoBox__icon_wrapper}>
              <People />
            </div>{" "}
            <span>Max. 5 osób z Twojego zespołu</span>
          </li>
          <li className={styles.infoBox_row}>
            <div className={styles.infoBox__icon_wrapper}>
              <LinkIcon />
            </div>{" "}
            <span>Link do spotkania dostaniesz po zatwierdzeniu terminu</span>
          </li>
        </ul>
      </div>
    </>
  ) : (
    <p>Brak usług do wyświetlenia</p>
  );
};
