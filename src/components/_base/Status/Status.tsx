import React from "react";
import clx from "classnames";
import styles from "./Status.module.scss";

type StatusVariant = "danger" | "warning" | "success";

type Props = {
  variant: StatusVariant;
  text: string;
};

export const Status = ({ variant, text }: Props) => {
  return (
    <div
      className={clx(styles.status, {
        [styles.active]: variant === "success",
        [styles.warning]: variant === "warning",
        [styles.inactive]: variant === "danger",
      })}
    >
      {text}
    </div>
  );
};
