import React from "react";
import styles from "./Pricing.module.scss";
import { Pro } from "@icons/Pro";
import { Basic } from "@icons/Basic";
import { CheckCircle } from "@icons/CheckCircle";

type PricingPropsType = {
  planTitle: string;
  price: number;
  values: string[];
  selectedPlan: string;
  handleSelectPlan: (plan: string) => void;
};

export const Pricing = ({
                          planTitle,
                          values,
                          price,
                          selectedPlan,
                          handleSelectPlan,
                        }: PricingPropsType) => {
  const isActive = selectedPlan === planTitle; // Sprawdzamy, czy plan jest aktywny

  return (
      <button
          className={`${styles.pricingCard} ${isActive ? styles.selected : styles.inactive}`} // Dodajemy klasę inactive, gdy plan nie jest aktywny
          onClick={() => handleSelectPlan(planTitle)}
          disabled={isActive} // Wyłącz kliknięcie dla aktywnego planu
      >
        <div className={styles.planHeader}>
          {planTitle !== "Free" ? (
              <div className={styles.iconBox}>
                {planTitle === "Mid" && <Basic />}
                {planTitle === "Pro" && <Pro />}
              </div>
          ) : null}
          <h4 className={styles.title}>{planTitle}</h4>
        </div>
        <p className={styles.price}>
          {`${price} zł `}
          <span className={styles.priceDetails}>/miesiąc</span>
        </p>
        <button
            className={`${styles.btn} ${isActive ? styles.btnSelected : styles.btnInactive}`}
        >
          {isActive ? "Twój aktualny plan" : "Wybierz ten plan"}
        </button>

        <ul className={styles.list}>
          <h5 className={styles.planSubtitle}>Co zawiera ten plan?</h5>
          {values.map((item) => (
              <li key={item.replace(" ", "")} className={styles.listItem}>
            <span className={styles.icon}>
              <CheckCircle />
            </span>
                <p className={styles.value}>{item}</p>
              </li>
          ))}
        </ul>
      </button>
  );
};

export default Pricing;
