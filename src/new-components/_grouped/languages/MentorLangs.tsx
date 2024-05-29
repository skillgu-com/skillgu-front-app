import React from "react";
import ReactCountryFlag from "react-country-flag";
import styles from "./Languages.module.scss";

type LangOptionValue = "pl" | "en" | "ja";

type LangOption = { value: LangOptionValue; label: string };

type Props = {
  langs: LangOption[];
};

const renderFlag = (opt: LangOption) => {
  let countryCode = "";
  switch (opt.value) {
    case "pl":
      countryCode = "PL";
      break;
    case "en":
      countryCode = "US";
      break;

    case "ja":
      countryCode = "JA";
      break;

    default:
      break;
  }
  return (
    <ReactCountryFlag
      style={{ height: "18px", width: "18px" }}
      className={styles.flag}
      countryCode={countryCode}
      svg
    />
  );
};

export const MentorLangs = ({ langs }: Props) => {
  return (
    <div className={styles.langs}>
      {langs.map((l) => (
        <div className={styles.item} key={l.value}>
          {renderFlag(l)}
        </div>
      ))}
    </div>
  );
};
