import React, { ReactNode } from "react";
import clx from "classnames";
import styles from "./Loader.module.scss";
import { Spinner, SpinnerSize } from "src/components/_base/Spinner";
import { ClientPortal } from "src/components/portal";

type Props = {
  className?: string;
  children?: ReactNode;
  spinner?: boolean;
  spinnerSize?: SpinnerSize;
  shadow?: boolean;
  overflow?: boolean;
};

export const Loader = ({
  children,
  className,
  shadow,
  overflow,
  spinner,
  spinnerSize,
}: Props) => {

  const child = (
    <div
      className={clx(
        styles.loader,
        {
          [styles.shadow]: !!shadow,
          [styles.overflow]: !!overflow,
        },
        className
      )}
    >
      {children}
      {spinner ? <Spinner 
      light={overflow}
       size={spinnerSize || "md"} /> : null}
    </div>
  );

  if(overflow){
    return <ClientPortal selector="loader-root">{child}</ClientPortal>
  }

  return child
};
