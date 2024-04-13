import React, { useCallback, useState } from "react";
import { Option, FilterName } from "@customTypes/mentor";
import { FILTERS_CHECKBOXES_ROWS_LIMIT } from "../../config";
import Checkbox, { type CheckboxValueCb } from "src/new-components/Checkbox/Checkbox";
import styles from './FiltersCheckboxes.module.scss'

type FiltersCheckboxesProps = {
  name: FilterName;
  options: Option[];
  selected: Option[];
  startedRows: number;
  handleChange: (name: FilterName, selected: Option[]) => void;
};

export const FiltersCheckboxes = ({
  name,
  options,
  selected,
  handleChange,
}: FiltersCheckboxesProps) => {
  const partialyHide = options.length - (FILTERS_CHECKBOXES_ROWS_LIMIT - 1);
  const displayAll = partialyHide > 0;
  const [isExpanded, setIsExpanded] = useState<boolean>(displayAll);
  const onToggle = useCallback(() => {
    setIsExpanded((s) => !s);
  }, []);

  const handleInputChange = useCallback(
    (value: string, valueOpt: CheckboxValueCb) => {
      const checked = valueOpt.value
      const newSelected = options.filter((opt) => {
        if (value === opt.value) {
          return checked;
        }
        return selected.includes(opt);
      });
      handleChange(name, newSelected);
    },
    [name, options, selected, handleChange]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.checkboxes}>
        {options.slice(0, isExpanded ? options.length : 5).map((opt, i) => (
          <Checkbox
            key={`${opt.value}-${i}`}
            id={name}
            name={opt.value}
            label={opt.label}
            type="checkbox"
            value={selected.includes(opt)}
            valueChangeHandler={handleInputChange}
            classes={styles.checkbox}
          />
        ))}
      </div>
      {!!partialyHide && (
        <button onClick={onToggle} type='button' className={styles.btnMore} >
          {isExpanded ? `- ${partialyHide} ukryj` : `+ ${partialyHide} więcej`}
        </button>
      )}
    </div>
  );
};
