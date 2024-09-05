import React, { ReactNode, useState } from "react";
import styles from "./Pricing.module.scss";
import { SectionTemplate } from "src/components/SectionTemplate";
import { Pro } from "@icons/Pro";
import { Basic } from "@icons/Basic";
import { CheckCircle } from "@icons/CheckCircle";

type Props = {
  title?: string;
  subtitle?: ReactNode;
};

export const Pricing = ({ title = "Twoje Plany", subtitle }: Props) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>("Free"); // Default to 'Free'

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
  };

  return (
    <SectionTemplate title={title} description={subtitle}>
      <section className={styles.pricingSection}>
        <div className={styles.flex}>
          <div
            className={`${styles.pricingCard} ${selectedPlan === "Free" ? styles.selected : ""}`}
            onClick={() => handleSelectPlan("Free")}
          >
            <div className={styles.planHeader}>
              <h4 className={styles.title}>Free</h4>
            </div>
            <p className={styles.price}>
              0 zł <span className={styles.priceDetails}>/miesiąc</span>
            </p>
            <button
              className={`${styles.btn} ${selectedPlan === "Free" ? styles.btnSelected : ""}`}
            >
              {selectedPlan === "Free"
                ? "Twój aktualny plan"
                : "Wybierz ten plan"}
            </button>

            <ul className={styles.list}>
              <h5 className={styles.planSubtitle}>Co zawiera ten plan?</h5>
              <li className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <p className={styles.value}>Pełny dostęp do aplikacji</p>
              </li>
              <li className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <p className={styles.value}>Nieograniczona liczba mentee</p>
              </li>
              <li className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <p className={styles.value}>18% prowizji od spotkania</p>
              </li>
              <li className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <p className={styles.value}>Brak darmowych spotkań</p>
              </li>
            </ul>
          </div>

          <div
            className={`${styles.pricingCard} ${selectedPlan === "Mid" ? styles.selected : ""}`}
            onClick={() => handleSelectPlan("Mid")}
          >
            <div className={styles.planHeader}>
              <div className={styles.iconBox}>
                <Basic />
              </div>
              <h4 className={styles.title}>Basic</h4>
            </div>
            <p className={styles.price}>
              89 zł <span className={styles.priceDetails}>/miesiąc</span>
            </p>
            <button
              className={`${styles.btn} ${selectedPlan === "Mid" ? styles.btnSelected : ""}`}
            >
              {selectedPlan === "Mid"
                ? "Twój aktualny plan"
                : "Wybierz ten plan"}
            </button>

            <ul className={styles.list}>
              <h5 className={styles.planSubtitle}>Co zawiera ten plan?</h5>
              <li className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <p className={styles.value}>5 darmowych spotkań w miesiącu</p>
              </li>
              <li className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <p className={styles.value}>
                  Gwarancja stałej opłaty miesięcznej
                </p>
              </li>
              <li className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <p className={styles.value}>Niższa prowizja: 10%</p>
              </li>
              <li className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <p className={styles.value}>Pełny dostęp do aplikacji</p>
              </li>
              <li className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <p className={styles.value}>Nieograniczona liczba mentee</p>
              </li>
            </ul>
          </div>

          <div
            className={`${styles.pricingCard} ${selectedPlan === "Pro" ? styles.selected : ""}`}
            onClick={() => handleSelectPlan("Pro")}
          >
            <div className={styles.planHeader}>
              <div className={styles.iconBox}>
                <Pro />
              </div>
              <h4 className={styles.title}>Pro</h4>
            </div>
            <p className={styles.price}>
              190 zł <span className={styles.priceDetails}>/miesiąc</span>
            </p>
            <button
              className={`${styles.btn} ${selectedPlan === "Pro" ? styles.btnSelected : ""}`}
            >
              {selectedPlan === "Pro"
                ? "Twój aktualny plan"
                : "Wybierz ten plan"}
            </button>

            <ul className={styles.list}>
              <h5 className={styles.planSubtitle}>Co zawiera ten plan?</h5>
              <li className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <p className={styles.value}>Darmowe spotkania bez limitu</p>
              </li>
              <li className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <p className={styles.value}>
                  Gwarancja stałej opłaty miesięcznej
                </p>
              </li>
              <li className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <p className={styles.value}>Brak prowizji</p>
              </li>
              <li className={styles.listItem}>
                <CheckCircle className={styles.icon} />
                <p className={styles.value}>Nieograniczona liczba mentee</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </SectionTemplate>
  );
};

export default Pricing;
