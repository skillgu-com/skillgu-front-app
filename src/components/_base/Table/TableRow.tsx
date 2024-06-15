import React from "react";
import clx from "classnames";
import styles from "./styles.module.scss";
import { ReactNode, forwardRef, ForwardedRef, CSSProperties } from "react";

interface TableListRowProps {
  children?: ReactNode;
  className?: string;
  heading?: boolean;
  sticky?: boolean;
  index?: number;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const TableRow = forwardRef(
  (
    {
      children,
      className,
      heading,
      sticky,
      index,
      style,
      onClick,
    }: TableListRowProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        style={style}
        data-index={index}
        onClick={onClick}
        className={clx(
          styles.Row,
          {
            [styles.RowHeading]: heading,
            [styles.RowSticky]: sticky,
            [styles.Clickable]: !!onClick,
          },
          className
        )}
      >
        {children}
      </div>
    );
  }
);

TableRow.displayName = "TableListRow";
