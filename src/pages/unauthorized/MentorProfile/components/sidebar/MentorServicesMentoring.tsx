import React, { useEffect } from "react";
import clx from "classnames";
import styles from "./Sidebar.module.scss";
import { ServiceMentoringOptionCard } from "../../../../../components/Cards/ServiceMentoringOptionCard";
import { ServiceInfoBox } from "../../../../../components/_grouped";
import { MentorshipPlanDTO } from "@services/mentor/fetchMentorServices.service";
import { useCurrentUser } from "src/hooks/useCurrentUser";
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
  const user = useCurrentUser();
  return services?.length ? (
    <>
      <div className={clx(styles.cards, { [styles.disabled]: !user })}>
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
        <div className={styles.tooltipContainer}>
          <div className={styles.btnDisabeldBox}>
            <button
              onClick={selected ? () => handleSubmit(selected) : undefined}
              className={styles.submitBtn}
              disabled={!selected || !user}
            >
              Zarezerwuj termin
            </button>
          </div>

          <span className={!user ? styles.tooltip : styles.hidden}>
            Aby zapisać się na menotring trzeba się zalogować
          </span>
        </div>
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
