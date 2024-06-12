import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";

import Button, { ButtonVariant } from "src/components/Button/Button";
import Modal from "src/components/Modal/Modal";
import { Text } from "src/components/typography";
import { InputField } from "../InputField/InputField";
import { TextareaField } from "../TextareaField/TextareaField";

import styles from "./AddQuestionPopup.module.scss";
import { resolver } from "./resolver";

type AddQuestionPopupTypes = {
  isOpen: boolean;
  handleClose: () => void;
};
export type AddQuestionFormTypes = {
  email: string;
  message: string;
};

export const AddQuestionPopup = ({
  isOpen,
  handleClose,
}: AddQuestionPopupTypes) => {
  const [isPending, startTransition] = useTransition(); // isPending will be used leter
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm<AddQuestionFormTypes>({
    resolver,
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      console.log(data); //TODO
    });
    handleClose();
  });

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const {
    name: emailInputName,
    onChange: onEmailInputChange,
    ref: emailInputRef,
  } = register("email");
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
      title="Napisz do nas"
      closeHandler={handleClose}
    >
      <Text classes={styles.info}>Odpiszemy najszybciej jak to możliwe!</Text>
      <form onSubmit={onSubmit}>
        <InputField
          name={emailInputName}
          id="email"
          label="Twój e-mail"
          onChange={onEmailInputChange}
          inputRef={emailInputRef}
          error={errors?.email?.message}
        />
        <TextareaField
          name={messageTextareaName}
          id="message"
          label="Wiadomość"
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
          >
            Wyślij
          </Button>
          <Button
            fullWidth={true}
            onClick={handleClose}
            variant={ButtonVariant.Light}
            type="button"
          >
            Anuluj
          </Button>
        </div>
      </form>
    </Modal>
  );
};
