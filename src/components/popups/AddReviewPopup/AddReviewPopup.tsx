import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import Button, { ButtonVariant } from "src/components/Button/Button";
import Modal from "src/components/Modal/Modal";
import { Text } from "src/components/typography";
import { TextareaField } from "../TextareaField/TextareaField";
import { Loader } from "src/components/_grouped/loader";
import { StarsRadioField } from "../StarsRadio/StarsRadio";

import styles from "./AddReviewPopup.module.scss";

import { resolver } from "./resolver";
import { sendReview } from "@services/mentor/fetchMentorServices.service";

type AddReviewPopupTypes = {
  isOpen: boolean;
  handleClose: () => void;
  user?: string;
};
export type AddReviewFormTypes = {
  rating: number;
  message: string;
};

export const AddReviewPopup = ({
  user,
  isOpen,
  handleClose,
}: AddReviewPopupTypes) => {
  const { username } = useParams();
  const [isPending, setIsPending] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm<AddReviewFormTypes>({
    resolver,
    defaultValues: {
      rating: 5,
      message: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setIsPending(true);
    if (username && user) {
      try {
        await sendReview({
          createdAt: new Date().toDateString(),
          mentor: username,
          rate: Number(data.rating),
          content: data.message,
          // TODO
          authorName: user,
        });
        setIsPending(false);
      } catch (err) {
        console.log(err);
      }
      handleClose();
    }
  });

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const {
    name: inputRadioName,
    onChange: onInputRadioChange,
    ref: inputRef,
  } = register("rating");

  const {
    name: messageTextareaName,
    onChange: onMessageTextareaChange,
    ref: textareaRef,
  } = register("message");

  if (!isOpen) return null;

  return (
    <Modal
      className={styles.modal}
      classNameContent={styles.modalContent}
      title="Napisz opinię"
      closeHandler={handleClose}
    >
      {/* TODO */}
      <Text classes={styles.info}>Jak oceniasz współpracę z mentorem?</Text>
      <form onSubmit={onSubmit}>
        <StarsRadioField
          name={inputRadioName}
          inputRef={inputRef}
          onChange={onInputRadioChange}
        />
        <TextareaField
          name={messageTextareaName}
          id="message"
          label="Opinia"
          onChange={onMessageTextareaChange}
          textareaRef={textareaRef}
          error={errors?.message?.message}
        />
        <div className={styles.flexContainer}>
          <Button
            fullWidth={true}
            variant={ButtonVariant.Primary}
            classes={styles.btnPrimary}
            type="submit"
            disableButton={isPending}
          >
            Wyślij
          </Button>
          <Button
            fullWidth={true}
            onClick={handleClose}
            classes={styles.btn}
            variant={ButtonVariant.Light}
            type="button"
          >
            Anuluj
          </Button>
        </div>
      </form>
      {isPending && (
        <p className={styles.loading} aria-busy="true">
          <Loader spinner />
        </p>
      )}
    </Modal>
  );
};
