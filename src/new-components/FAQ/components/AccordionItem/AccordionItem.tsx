// Libraries
import React, {useMemo} from 'react';
// Styles
import styles from './AccordionItem.module.scss';

export interface AccordionItemModel {
	id: string;
	title: string;
	description: string;
}

export interface AccordionItemProps extends AccordionItemModel {
	currentId: string | undefined;
	changeIdHandler: (id: string | undefined) => void;
}

const AccordionItem = (props: AccordionItemProps) => {
	const {id, title, description, currentId, changeIdHandler} = props;

	const isCurrent = useMemo(() => id === currentId, [id, currentId]);

	const clickHandler = () => changeIdHandler(isCurrent ? undefined : id);

	return (
		<li className={styles.wrapper} data-is-current={isCurrent}>
			<button onClick={clickHandler} className={styles.title}>
				{title} <span className={styles.expander}></span>
			</button>
			{isCurrent && <p className={styles.description}>{description}</p>}
		</li>
	);
};

export default AccordionItem;
