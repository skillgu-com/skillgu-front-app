import React from "react";
import styles from "./Sidebar.module.scss";
import clx from "classnames";
import { ServiceMentoring } from "@customTypes/order";
import { ServiceMentoringOptionCard } from "@newComponents/Cards/ServiceMentoringOptionCard";
import { ServiceInfoBox } from "@newComponents/_grouped";

type Props = {
  services: ServiceMentoring[];
  selected?: ServiceMentoring | null;
  handleSelect?: (opt: ServiceMentoring) => void;
  handleSubmit?: (opt: ServiceMentoring) => void;
};

export const MentorServicesMentoring = ({
  services,
  selected,
  handleSelect,
  handleSubmit,
}: Props) => {
  return services && services.length ? (
    <>
      <div className={styles.cards}>
        {services.map((s) => (
          <ServiceMentoringOptionCard
            key={s.id}
            {...s}
            handleSelect={handleSelect ? () => handleSelect(s) : undefined}
            selected={s === selected}
          />
        ))}
      </div>
      {handleSubmit ? (
        <button
          onClick={selected ? () => handleSubmit(selected) : undefined}
          className={styles.submitBtn}
        >
          Zarezerwuj termin
        </button>
      ) : null}
      
      <ServiceInfoBox 
        meetingForm='video'
        maxAttendees={5}
        information="Link do spotkania dostaniesz po zatwierdzeniu terminu"
      /> 
    </>
  ) : (
    <p>Brak usług do wyświetlenia</p>
  );
};
