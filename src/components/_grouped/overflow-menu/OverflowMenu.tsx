import React, { ReactNode } from "react";
import styles from './OverflowMenu.module.scss'
import clx from 'classnames'

type Props = {
    children?: ReactNode
    className?: string
}

export const OverflowMenu = ({ children, className } : Props) => {
    return (
        <div className={clx(styles.wrapper, className)}>{children}</div>
    )
} 
