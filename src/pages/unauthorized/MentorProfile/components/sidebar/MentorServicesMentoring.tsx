import React, { useEffect } from "react";
import styles from "./Sidebar.module.scss";
import { ServiceMentoringOptionCard } from "../../../../../components/Cards/ServiceMentoringOptionCard";
import { ServiceInfoBox } from "../../../../../components/_grouped";
import { MentorshipPlanDTO } from "@services/mentor/fetchMentorServices.service";

type Props = {
  services: MentorshipPlanDTO[];
  selected?: MentorshipPlanDTO | null;
  displayRadioInput?: boolean;
  mentorIsLoggedUser: boolean;
  handleSelect?: (opt: MentorshipPlanDTO) => void;
  handleSubmit?: (opt: MentorshipPlanDTO) => void;
};

export const MentorServicesMentoring = ({
  services,
  selected,
  displayRadioInput,
  mentorIsLoggedUser,
  handleSelect,
  handleSubmit,
}: Props) => {
  useEffect(() => {
    if (services?.length === 1 && handleSelect && !mentorIsLoggedUser) {
      handleSelect(services[0]);
    }
  }, [services, handleSelect, mentorIsLoggedUser]);

  return services?.length ? (
    <>
      <div className={styles.cards}>
        {services.map((s) => (
          <ServiceMentoringOptionCard
            key={s.id}
            {...s}
            displayRadioInput={displayRadioInput}
            handleSelect={handleSelect ? () => handleSelect(s) : undefined}
            selected={s === selected}
          />
        ))}
      </div>
      {handleSubmit ? (
        <button
          onClick={selected ? () => handleSubmit(selected) : undefined}
          className={styles.submitBtn}
          disabled={!selected}
        >
          Zarezerwuj termin
        </button>
      ) : null}

      <ServiceInfoBox
        title="Informacje dotyczące sesji"
        meetingForm="video"
        maxAttendees={5}
        information="Link do spotkania dostaniesz po zatwierdzeniu terminu"
      />
    </>
  ) : (
    <p>Brak usług do wyświetlenia</p>
  );
};
