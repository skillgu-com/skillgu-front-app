import React, { MouseEventHandler, ReactNode } from "react";
import styles from "./OverflowMenu.module.scss";
import clx from "classnames";
import { MoreVerticalIcon } from "@icons/MoreVerticalIcon";

type Props = {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const OverflowMenuToggle = ({ children, className, onClick }: Props) => {
  return (
    <button onClick={onClick} className={clx(styles.toggle, className)}>
      {children} <MoreVerticalIcon className={styles.dots} />
    </button>
  );
};
