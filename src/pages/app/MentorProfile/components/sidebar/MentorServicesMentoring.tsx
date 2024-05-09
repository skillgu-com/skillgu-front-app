import React from "react";
import styles from "./Sidebar.module.scss";
import clx from "classnames";
import { ServiceMentoring } from "@customTypes/order";
import { ServiceMentoringOptionCard } from "@newComponents/Cards/ServiceMentoringOptionCard";

type Props = {
  services: ServiceMentoring[];
  selected?: ServiceMentoring | null;
  handleSelect: (opt: ServiceMentoring) => void;
  handleSubmit: (opt: ServiceMentoring) => void;
};

export const MentorServicesMentoring = ({
  services,
  selected,
  handleSelect,
  handleSubmit,
}: Props) => {
  return  services && services.length ? (
    <>
      <div className={styles.cards}>
        {services.map((s) => (
          <ServiceMentoringOptionCard
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
    </>
  ) : (
    <p>Brak usług do wyświetlenia</p>
  );
};
