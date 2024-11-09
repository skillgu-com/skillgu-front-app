import React, { FormEventHandler, Ref, useState } from "react";

import StarSvg from "@icons/StarSvg";

import styles from "./StarRadio.module.scss";
import { generateTitle } from "../helper";

type Props = {
  name: string;
  onChange: FormEventHandler<HTMLLabelElement>;
  inputRef: Ref<HTMLInputElement>;
};
export const StarsRadioField = ({ name, onChange, inputRef }: Props) => {
  const [rating, setRating] = useState(5);
  const starsList = [
    { name: "first", value: 1 },
    { name: "second", value: 2 },
    { name: "third", value: 3 },
    { name: "fourth", value: 4 },
    { name: "fifth", value: 5 },
  ];

  return (
    <>
      <p className={styles.title}>{generateTitle(rating)}</p>
      <div className={styles.container}>
        {starsList.map((starsList) => (
          <label
            key={starsList.name}
            className={styles.label}
            htmlFor={starsList.name}
            aria-label={starsList.name}
            onClick={() => setRating(starsList.value)}
            onChange={(e) => onChange(e)}
          >
            <input
              className={styles.radio}
              type="radio"
              id={starsList.name}
              name={name}
              value={starsList.value}
              ref={inputRef}
            />
            <StarSvg
              size="32"
              color={`${Number(rating) > Number(starsList.value) - 1 ? "#FFC728" : "#FFC72838"}`}
            />
          </label>
        ))}
      </div>
    </>
  );
};
