import { BinIcon } from "@icons/BinIcon";
import Button, { ButtonVariant } from "@newComponents/Button/Button";
import React from "react";
import styles from './styles.module.scss'
import { Typography } from "@mui/material";

export const MentorEditFooter = () => {
    return (
        <div className={styles.Footer}>
        <Button
            classes={styles.Btn}
            variant={ButtonVariant.DangerText}
        >
            <BinIcon />
            <Typography variant='buttonMd'>Usuń swoje konto</Typography>
        </Button>
        </div>
    )
}
