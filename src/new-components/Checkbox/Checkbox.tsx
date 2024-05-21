// Libraries
import React, { ChangeEvent } from "react";
import classNames from "classnames";
// Helpers
import validation from "../../helpers/improovedValidation";
// Styles
import styles from "./Checkbox.module.scss";

export type CheckboxValueCb = {
  value: boolean;
  errorMessage?: string;
  isValid: boolean;
};

export type CheckboxValueChangeHandler = (
  name: string,
  value: CheckboxValueCb
) => void;

interface CheckboxProps {
  id: string;
  name: string;
  label: React.ReactNode;
  type?: "checkbox" | "radio";
  required?: boolean;
  value: boolean;
  errorMessage?: string;
  isValid?: boolean;
  valueChangeHandler: CheckboxValueChangeHandler;
  classes?: string;
  slide?: boolean;
}

const Checkbox = (props: CheckboxProps) => {
  const {
    id,
    name,
    label,
    type = "checkbox",
    required = false,
    value,
    errorMessage,
    valueChangeHandler,
    classes,
    slide,
  } = props;

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const errorMessage = validation(true, e.target.checked, name, required);
    valueChangeHandler(name, {
      value: e.target.checked,
      errorMessage,
      isValid: errorMessage === "",
    });
  };

  return (
    <label
      className={classNames(styles.checkbox, classes, {
        [styles.slide]: slide,
      })}
      data-is-error={!!errorMessage}
      data-is-radio={type === "radio"}
    >
      <input
        id={id}
        name={name}
        className={styles.checkboxField}
        type={type}
        onChange={changeHandler}
        checked={value}
        required={required}
      />
      <span className={styles.checkboxLabel}>
        {slide && <span className={styles.slideField} />}
        {label}
        {required && " *"}
      </span>
    </label>
  );
};

export default Checkbox;
