import React from "react";
import clx from "classnames";
import styles from "./Status.module.scss";

type StatusVariant = "success" | "danger" | "warning";

type Props = {
  variant: StatusVariant;
  text: string;
};

export const Status = ({ variant, text }: Props) => {
  return (
    <div
      className={clx(styles.status, {
        [styles.active]: variant === "success",
        [styles.inactive]: variant === "danger",
        [styles.warning]: variant === "warning",
      })}
    >
      {text}
    </div>
  );
};
