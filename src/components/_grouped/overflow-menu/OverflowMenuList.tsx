import React, { ReactNode } from "react";
import styles from './OverflowMenu.module.scss'
import clx from 'classnames'

type Props = {
    children?: ReactNode
    className?: string
}

export const OverflowMenuList = ({ children, className } : Props) => {
    return (
        <div className={clx(styles.list, className)}>{children}</div>
    )
} 
