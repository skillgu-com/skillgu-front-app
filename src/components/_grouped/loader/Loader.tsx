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
  overlay?: boolean | "global";
};

export const Loader = ({
  children,
  className,
  shadow,
  overlay,
  spinner,
  spinnerSize,
}: Props) => {
  const child = (
    <div
      className={clx(
        styles.loader,
        {
          [styles.shadow]: !!shadow,
          [styles.overlay]: !!overlay,
          [styles.overlayGlobal]: overlay === "global",
        },
        className
      )}
    >
      {children}
      {spinner ? <Spinner light={shadow} size={spinnerSize || "md"} /> : null}
    </div>
  );

  if (overlay === "global") {
    return <ClientPortal selector="loader-root">{child}</ClientPortal>;
  }

  return child;
};
