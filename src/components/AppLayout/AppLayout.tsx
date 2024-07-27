// Libraries
import React from "react";
// Context
import { LayoutProvider, useLayout } from "src/context/LayoutContext";
// Components
import TopBar from "./components/Topbar/TopBar";
// Types
import { Common } from "../../types/main";
// Styles
import styles from "./AppLayout.module.scss";
import { Sidebar } from "./components/Sidebar/Sidebar";
import clx from "classnames";

const AppLayoutContent = (props: Common) => {
  const { children } = props;
  const { isSidebarOpen, isInitialized } = useLayout();

  return isInitialized ? (
    <div data-sidebar-open={isSidebarOpen ? "1" : "0"}>
      <TopBar />
      <Sidebar />
      <div
        className={clx(styles.content, {
          [styles.isSidebarOpen]: isSidebarOpen,
        })}
      >
        {children}
      </div>
    </div>
  ) : null;
};

const AppLayout = (props: Common) => {
  return (
    <LayoutProvider>
      <AppLayoutContent {...props} />
    </LayoutProvider>
  );
};

export default AppLayout;
