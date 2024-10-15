import React from "react";
import ReactCountryFlag from "react-country-flag";
import styles from "./Languages.module.scss";

type LangOptionValue = "1" | "2" | "3" | "4" | "5" | "6";

export type LangOption = { value: LangOptionValue; label: string };

type Props = {
  langs: LangOption[];
};

const renderFlag = (opt: LangOption) => {
  let countryCode = "";
  switch (opt.value) {
    case "1":
      countryCode = "PL";
      break;
    case "2":
      countryCode = "US";
      break;

    case "3":
      countryCode = "DE";
      break;

    case "4":
      countryCode = "UA";
      break;

    case "5":
      countryCode = "FR";
      break;
    case "6":
      countryCode = "IT";
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
      alt={`${countryCode} flag`}
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
