// Libraries
import React from 'react';
// Components
import {Title} from '../typography';
// Types
import {TitleTag, TitleVariant} from '../typography/Title/Title';
// Styles
import styles from './PlanScope.module.scss';

interface PlanScopeProps {
	elements: React.ReactNode[];
}

const PlanScope = (props: PlanScopeProps) => {
	const {elements} = props;

	return (
		<div className={styles.wrapper}>
			<Title
				tag={TitleTag.h4}
				variant={TitleVariant.standard}
				classes={styles.title}>
				Plan obejmuje:
			</Title>
			<ul className={styles.list}>
				{elements.map((item, index) => (
					<li key={index}><span>{item}</span></li>
				))}
			</ul>
		</div>
	);
};

export default PlanScope;
