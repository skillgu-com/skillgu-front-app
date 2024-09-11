import React, { MouseEvent, ReactNode, TouchEvent } from "react";
import styles from "./OverflowMenu.module.scss";
import clx from "classnames";

type Props = {
  children?: ReactNode;
  className?: string;
  onClickOutside?: (
    e: TouchEvent<HTMLElement> | MouseEvent<HTMLElement>
  ) => void;
  onMouseEnter?: (e: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void;
};

export const OverflowMenu = ({
  onClickOutside,
  onMouseEnter,
  onMouseLeave,
  children,
  className,
}: Props) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clx(styles.wrapper, className)}
    >
      {children}
    </div>
  );
};
