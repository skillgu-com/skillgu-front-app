import React from "react";
import clx from "classnames";
import styles from "./Sidebar.module.scss";
import {FC, useState} from "react";
import {SidebarButtonProps} from "./types";
import {getMenuItems} from "../../config";
import {useSelector} from "react-redux";
import {getRole} from "src/redux/selectors/authSelectors";
import {Link, useLocation} from "react-router-dom";
import {HamburgerButton} from "../../elements";
import Logo from "@icons/Logo";
import Help from "@icons/Help";
import Logout from "@icons/Logout";
import {useLogout} from "./hooks";
import Notifications from "../Notifications/Notifications";
import {useLayoutReducer} from "src/reducers/layout";
import {Tooltip, TooltipProps, useMediaQuery} from "@mui/material";

type Props = {
    defaultOpen?: boolean
}

const commonTooltipProps: Partial<TooltipProps> = {
    placement: 'left',
    arrow: true,
    classes: {
        tooltip: styles.tooltip,
        arrow: styles.tooltipArrow,
    },
    slotProps: {
        popper: {
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 10],
                    },
                },
            ],
        },
    }
}

export const Sidebar = () => {
    // const { isSidebarOpen, handleClose } = useLayout();
    const userFromRedux = useSelector((state: any) => state.auth.user);
    const role: "M" | "S" | "" = useSelector(getRole) || "";
    const {pathname} = useLocation();
    const handleLogout = useLogout();
    const {layoutState, handleSwitch} = useLayoutReducer();
    const isMobile = useMediaQuery("(max-width: 575px)");

    const menuItems = getMenuItems({
        username: userFromRedux.username,
        role,
    }).filter((item) => item.link !== "");

    return (
        <>
            <div
                className={clx(styles.fullSidebar, {
                    [styles.fullSidebarOpen]: layoutState.isSidebarOpen,
                })}
            >
                <div className={styles.logo}>
                    <div onClick={isMobile ? undefined : handleSwitch}>
                        <Logo
                            collapsed={!layoutState.isSidebarOpen}
                            width="108"
                            className={styles.navbarLogoIcon}
                        />
                    </div>
                    {isMobile && <HamburgerButton className={styles.hamburger}/>}
                </div>
                <div className={clx(styles.list, styles.topItems)}>
                    {menuItems.map(({Icon, ...item}) => (
                        <Tooltip title={layoutState.isSidebarOpen ? '' : item.label} {...commonTooltipProps}>
                            <Link
                                key={item.id}
                                className={styles.btn}
                                data-is-current={pathname.includes(item.link)}
                                to={item.link}
                                title={item.label}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        </Tooltip>
                    ))}
                </div>

                <div className={styles.list}>
                    <Tooltip title={layoutState.isSidebarOpen ? '' : 'Pomoc'} {...commonTooltipProps}>
                        <Link className={styles.btn} to="/help">
                            <Help/>
                            <span>Pomoc</span>
                        </Link>
                    </Tooltip>
                    {!!userFromRedux ? (
                        <Tooltip title={layoutState.isSidebarOpen ? '' : 'Wyloguj się'} {...commonTooltipProps} >
                            <button
                                className={styles.btn}
                                onClick={handleLogout}
                                title="Wyloguj się"
                            >
                                <Logout/>
                                <span>Wyloguj się</span>
                            </button>
                        </Tooltip>
                    ) : null}
                </div>
            </div>
        </>
    );
};
