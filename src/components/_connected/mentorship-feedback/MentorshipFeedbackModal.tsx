import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type Config, type Feedback } from "./types";
import Modal from "src/components/Modal/Modal";
import { ClientPortal } from "src/components/portal";
import { sendMentorshipFeedback } from "@services/mentorship/mentorshipFeedback";
import styles from "./style.module.scss";
import { Text, Title } from "src/components/typography";
import Button, { ButtonVariant } from "src/components/Button/Button";
import { TitleTag, TitleVariant } from "src/components/typography/Title/Title";
import Select from "src/components/Select/Select";

type Props = {
  mentorshipId: number;
  handleClose: () => void;
};

export const MentorshipFeedbackModal = ({
  mentorshipId,
  handleClose,
}: Props) => {
  return (
    <Modal
      className={styles.modal}
      classNameContent={styles.wrapper}
      title=""
      closeHandler={handleClose}
    >
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

  const [subscriptionEndReasons, setSubscriptionEndReasons] = useState("");
  const subscriptionEndReasonsOptions = useMemo(() => {
    return config?.subscriptionEndReasons.options.map((item) => ({
      value: item,
      label: item,
    }));
  }, [config?.subscriptionEndReasons]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const feedback: Feedback = {
      goalAchievement: formData.get("goalAchievement") as string,
      subscriptionEndReason: subscriptionEndReasons,
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
        <Title
          tag={TitleTag.h3}
          variant={TitleVariant.sectionConst}
          classes={styles.title}
        >
          Poczekaj! A tak między nami...
        </Title>
        <Text classes={styles.info}>
          Jak oceniasz współpracę z Mentorem? Ta opinia nie zostanie mu
          udostępniona.
        </Text>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>{config.goalAchievement.question}</legend>
            {config.goalAchievement.options.map((o, i) => (
              <label className={styles.radio} key={`${o}-${i}`}>
                <input type="radio" name="goalAchievement" value={o} />
                <span></span>
                <span>{o}</span>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>{config.subscriptionEndReasons.question}</legend>
            <Select
              name="subscriptionEndReasons"
              id="subscriptionEndReasons"
              value={subscriptionEndReasons}
              valueChangeHandler={(_: string, value: string) => {
                setSubscriptionEndReasons(value);
              }}
              options={subscriptionEndReasonsOptions}
              label={subscriptionEndReasons}
            />
          </fieldset>
          <fieldset>
            <legend>{config.serviceDescription.question}</legend>
            {config.serviceDescription.options.map((o, i) => (
              <label className={styles.radio} key={`${o}-${i}`}>
                <input type="radio" name="serviceDescription" value={o} />
                <span></span>
                <span>{o}</span>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>{config.additional.question}</legend>
            <textarea name="additional"></textarea>
          </fieldset>
          <div className={styles.btnBox}>
            <Button variant={ButtonVariant.Light} type="button" fullWidth>
              Anuluj
            </Button>
            <Button variant={ButtonVariant.Primary} type="submit" fullWidth>
              Wyślij
            </Button>
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
