import React from "react";
import clx from "classnames";
import styles from "./HamburgerButton.module.scss";
import { useLayout } from "src/context/LayoutContext";

type Props = {
  className?: string;
};

export const HamburgerButton = ({ className }: Props) => {
  const { isSidebarOpen, handleSwitch } = useLayout();

  return (
    <button
      onClick={handleSwitch}
      className={clx(
        styles.navbarButton,
        {
          [styles.navbarButtonOpen]: isSidebarOpen,
        },
        className
      )}
      aria-label="menu"
    >
      <span></span>
      <span></span>
    </button>
  );
};
