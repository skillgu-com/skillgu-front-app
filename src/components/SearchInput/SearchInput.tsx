import SearchSvg from "@icons/SearchSvg";
import React, { ChangeEventHandler } from "react";

import styles from "./SearchInput.module.scss";

type SearchInputProps = {
  placeholder?: string;
  name: string;
  value?: string;
  onChangePhrase?: ChangeEventHandler<HTMLInputElement>;
};

export const SearchInput = ({
  placeholder,
  name,
  value,
  onChangePhrase,
}: SearchInputProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        onChange={onChangePhrase}
      />
      <label className={styles.ghost} htmlFor={name} aria-labelledby={name}>
      </label>
      <SearchSvg className={styles.icon} />
    </div>
  );
};
