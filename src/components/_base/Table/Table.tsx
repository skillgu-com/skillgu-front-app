import React from 'react';
import clx from 'classnames';
import styles from './styles.module.scss';
import { ReactNode } from 'react';

interface TableListProps {
  className?: string;
  testId?: string;
  children?: ReactNode;
}

export const Table = ({ className, children, testId }: TableListProps) => {
  return (
    <div className={clx(styles.Table, className)} data-test-id={testId}>
      {children}
    </div>
  );
};
