import React from "react";
import clx from "classnames";
import styles from "./Status.module.scss";

type StatusVariant = "active" | "inactive";

type Props = {
  variant: StatusVariant;
  text: string;
};

export const Status = ({ variant, text }: Props) => {
  return (
    <div
      className={clx(styles.status, {
        [styles.active]: variant === "active",
        [styles.inactive]: variant === "inactive",
      })}
    >
      {text}
    </div>
  );
};
