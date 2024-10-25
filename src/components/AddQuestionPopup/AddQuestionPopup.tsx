import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button, { ButtonVariant } from "src/components/Button/Button";
import Modal from "src/components/Modal/Modal";
import { Text } from "src/components/typography";
import { InputField } from "./InputField/InputField";
import { TextareaField } from "./TextareaField/TextareaField";

import styles from "./AddQuestionPopup.module.scss";
import { resolver } from "./resolver";
import { contactService } from "@services/contact/contact.service";
import { Loader } from "../_grouped/loader";

type AddQuestionPopupTypes = {
  isOpen: boolean;
  handleClose: () => void;
  setIsMsgSent?: Dispatch<SetStateAction<boolean>>;
};
export type AddQuestionFormTypes = {
  email: string;
  message: string;
};

export const AddQuestionPopup = ({
  isOpen,
  handleClose,
  setIsMsgSent,
}: AddQuestionPopupTypes) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm<AddQuestionFormTypes>({
    resolver,
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsPending(true);
    try {
      const response = await contactService({
        senderEmail: data.email,
        message: data.message,
      }); //TODO
      if (response?.success && setIsMsgSent) setIsMsgSent(true);
      setIsPending(false);
    } catch (err) {
      console.log(err); //TODO
    }

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
            disableButton={isPending}
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
      {isPending && (
        <p className={styles.loading} aria-busy="true">
          <Loader spinner />
        </p>
      )}
    </Modal>
  );
};
