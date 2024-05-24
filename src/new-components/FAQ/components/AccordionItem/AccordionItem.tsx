// Libraries
import React, { useMemo } from "react";
// Styles
import styles from "./AccordionItem.module.scss";
import { ChevronDownIcon } from "@icons/ChevronDownIcon";
import { Expandable } from "@newComponents/_base/Expandable";

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
  const { id, title, description, currentId, changeIdHandler } = props;

  const isCurrent = useMemo(() => id === currentId, [id, currentId]);

  const clickHandler = () => changeIdHandler(isCurrent ? undefined : id);

  return (
    <li className={styles.wrapper} data-is-current={isCurrent}>
      <button onClick={clickHandler} className={styles.title}>
        {title}
        <ChevronDownIcon className={styles.expander} />
      </button>
      <Expandable isExpanded={isCurrent}>
        <p className={styles.description}>{description}</p>
      </Expandable>
    </li>
  );
};

export default AccordionItem;
