// Libraries
import React, {useEffect, useRef} from "react";
// Components
import TopBar from "./components/Topbar/TopBar";
// Types
import {Common} from "../../types/main";
// Styles
import styles from "./AppLayout.module.scss";
import {Sidebar} from "./components/Sidebar/Sidebar";
import clx from "classnames";
import {useLayoutReducer} from "src/reducers/layout";
import {useViewportSize} from "src/hooks/useViewportSize";
import UserInfoTopBar from "./components/UserInfoTopBar/UserInfoTopBar";
import useResolveAppMessages from "../../hooks/useResolveAppMessages/useResolveAppMessages";
import {useUserMessages} from "../../reducers/userMessages/useUserMessages";

const AppLayout = (props: Common) => {
    const {children} = props;
    const {layoutState, handleOpen, handleClose} = useLayoutReducer()
    const {width} = useViewportSize()
    const widthRef = useRef<number>(0)

    useEffect(() => {
        if (width && widthRef.current !== width) {
            if (width > 1200) {
                handleOpen()
            } else {
                handleClose()
            }
            widthRef.current = width
        }
    }, [width, handleOpen, handleClose])

    useResolveAppMessages();
    const [userMessage] = useUserMessages();

    return (
        <div data-sidebar-open={layoutState.isSidebarOpen ? "1" : "0"}>
            <Sidebar/>
            <div
                className={clx(styles.content, {
                    [styles.contentWithUserTopInfo]: !!userMessage.currentMessage,
                    [styles.isSidebarOpen]: layoutState.isSidebarOpen,
                })}
            >
                <TopBar/>
                <UserInfoTopBar  />
                {children}
            </div>
        </div>
    );
};

export default AppLayout;
