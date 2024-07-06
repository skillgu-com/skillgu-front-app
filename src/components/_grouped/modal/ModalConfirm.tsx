import React, { MouseEventHandler } from "react";
import Button, { ButtonVariant } from "src/components/Button/Button";
import Modal from "src/components/Modal/Modal";
import { ClientPortal } from "src/components/portal";
import styles from './ModalConfirm.module.scss'

type Props = {
  selector?: string;
  title?: string;
  description?: string;
  rejectText?: string;
  submitText?: string;
  isOpen?: boolean;
  handleClose?: () => void;
  handleReject?: MouseEventHandler<HTMLButtonElement>;
  handleSubmit?: MouseEventHandler<HTMLButtonElement>;
};

export const ModalConfirm = ({
  selector = "modal-root",
  isOpen = true,
  handleClose = () => {},
  title,
  description,
  rejectText,
  submitText,
  handleReject,
  handleSubmit,
}: Props) => {
  return (
    <ClientPortal selector={selector}>
      <Modal classNameContent={styles.wrapper} title={title} closeHandler={handleClose} isOpen={isOpen}>
        <div>
          {title ? <span>{title}</span> : null}
          {description ? <p>{description}</p> : null}
        </div>
        <div>
          {submitText && handleSubmit ? (
            <Button variant={ButtonVariant.Danger} onClick={handleSubmit}>
              {submitText}
            </Button>
          ) : null}
          {rejectText && handleReject ? (
            <Button variant={ButtonVariant.Outline} onClick={handleReject}>
              {rejectText}
            </Button>
          ) : null}
        </div>
      </Modal>
    </ClientPortal>
  );
};
