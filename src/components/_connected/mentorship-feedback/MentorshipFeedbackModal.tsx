import React, { FormEvent, useEffect, useState } from "react";
import { type Config, type Feedback } from "./types";
import Modal from "src/components/Modal/Modal";
import { ClientPortal } from "src/components/portal";
import { sendMentorshipFeedback } from "@services/mentorship/mentorshipFeedback";
import styles from "./style.module.scss";

type Props = {
  mentorshipId: number;
  handleClose: () => void;
};

export const MentorshipFeedbackModal = ({
  mentorshipId,
  handleClose,
}: Props) => {
  return (
    <Modal className="" classNameContent="" title="" closeHandler={handleClose}>
      <MentorshipFeedbackModalContent
        mentorshipId={mentorshipId}
        handleClose={handleClose}
      />
    </Modal>
  );
};

const MentorshipFeedbackModalContent = ({ mentorshipId }: Props) => {
  const [config, setConfig] = useState<Config | null>(null);
  const [pending, setPending] = useState<boolean>(true);
  const [done, setDone] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const feedback: Feedback = {
      goalAchievement: formData.get("goalAchievement") as string,
      subscriptionEndReason: formData.get("subscriptionEndReason") as string,
      serviceDescription: formData.get("serviceDescription") as string,
      additional: formData.get("additional") as string,
    };

    await sendMentorshipFeedback({
      mentorshipId,
      feedback,
    });
    setDone(true);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetch("/mentorship-feedback-options.json");
        const config: Config = await data.json();
        setConfig(config);
      } catch (e) {}
      setPending(false);
    };
    if (mentorshipId) {
      fetchInitialData();
    }
  }, [mentorshipId]);

  /* Thank You message */
  if (done) {
    return <>thank you</>;
  }

  /* Error status */
  if (!config && !pending) {
    return <>Error, sorry</>;
  }

  /* Options fetching */
  if (pending && !config) {
    return <>Options fetching...</>;
  }

  /* Form */
  if (!pending && config) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h3>Poczekaj! A tak między nami...</h3>
            <p>
              Jak oceniasz współpracę z Mentorem? Ta opinia nie zostanie mu
              udostępniona.
            </p>
          </div>
          <div>
            <fieldset>
              <legend>{config.goalAchievement.question}</legend>
              {config.goalAchievement.options.map((o, i) => (
                <label key={`${o}-${i}`}>
                  <input type="radio" name="goalAchievement" value={o} />
                  <span>{o}</span>
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>{config.subscriptionEndReasons.question}</legend>
              {config.subscriptionEndReasons.options.map((o, i) => (
                <label key={`${o}-${i}`}>
                  <input type="radio" name="subscriptionEndReasons" value={o} />
                  <span>{o}</span>
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>{config.serviceDescription.question}</legend>
              {config.serviceDescription.options.map((o, i) => (
                <label key={`${o}-${i}`}>
                  <input type="radio" name="serviceDescription" value={o} />
                  <span>{o}</span>
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>{config.additional.question}</legend>
              <textarea name="additional"></textarea>
            </fieldset>
          </div>
          <div>
            <button>Anuluj</button>
            <button>Wyślij</button>
          </div>
        </form>
      </div>
    );
  }

  /* Sending feedback */
  if (pending && config) {
    return <>sending feedback...</>;
  }

  return null;
};
