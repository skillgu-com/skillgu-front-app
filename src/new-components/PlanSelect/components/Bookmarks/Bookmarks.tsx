// Libraries
import React from 'react';
import classNames from 'classnames';
// Styles
import styles from './Bookmarks.module.scss'
// Types
import {PlanTypes} from '../../PlanSelect';

interface BookmarksProps {
	changeTypeHandler: (type: PlanTypes) => void;
  currentType: PlanTypes
}

const Bookmarks = (props: BookmarksProps) => {
	const {changeTypeHandler, currentType} = props;

	return (
		<div className={styles.wrapper}>
			<button
				className={classNames(styles.button, {
					[styles.buttonSelected]: currentType === PlanTypes.Mentoring,
				})}
				onClick={() => changeTypeHandler(PlanTypes.Mentoring)}>
				Mentoring
			</button>
			<button
				className={classNames(styles.button, {
					[styles.buttonSelected]: currentType === PlanTypes.Session,
				})}
				onClick={() => changeTypeHandler(PlanTypes.Session)}>
				Sesje
			</button>
		</div>
	);
};

export default Bookmarks;
