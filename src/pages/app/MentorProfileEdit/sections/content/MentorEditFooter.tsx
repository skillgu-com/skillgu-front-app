import { BinIcon } from "@icons/BinIcon";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Typography } from "@mui/material";
import Button, { ButtonVariant } from "../../../../../components/Button/Button";
import { ModalConfirm } from "src/components/_grouped/modal";
import { closeUserAccount } from "@services/user/closeUserAccount.service";
import { logout } from "src/helpers/login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "src/components/_grouped/loader";

export const MentorEditFooter = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setPending(true);
    try {
      setOpen(false);
      await closeUserAccount();
      logout(dispatch, navigate);
    } catch (e) {}
    setPending(false);
  };

  return (
    <>
      <ModalConfirm
        selector="modal-root"
        isOpen={open}
        handleClose={() => setOpen(false)}
        title="Usuń konto"
        description="Czy napewno chcesz usunąć swoje konto?"
        rejectText="Nie"
        submitText="Tak"
        handleReject={() => setOpen(false)}
        handleSubmit={handleSubmit}
      />
      {pending && (
        <Loader overlay className={styles.footerLoader} shadow spinner />
      )}
      <div className={styles.Footer}>
        <Button
          onClick={() => setOpen(true)}
          classes={styles.Btn}
          variant={ButtonVariant.DangerText}
        >
          <BinIcon />
          <Typography variant="buttonMd" color="error">
            Usuń swoje konto
          </Typography>
        </Button>
      </div>
    </>
  );
};
