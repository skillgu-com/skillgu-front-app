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
    canChangePlan: boolean;
    currentPlan: string;
};

const isPlanSelectable = (currentPlan: string, targetPlan: string): boolean => {
    // Logika wyboru planu
    if (currentPlan === "Free") {
        return targetPlan === "Mid" || targetPlan === "Pro";
    }
    if (currentPlan === "Mid") {
        return targetPlan === "Pro";
    }
    if (currentPlan === "Pro") {
        return false; // Nie można zmienić z Pro na inny plan
    }
    return true;
};

export const Pricing = ({
                            planTitle,
                            values,
                            price,
                            selectedPlan,
                            handleSelectPlan,
                            canChangePlan,
                            currentPlan,
                        }: PricingPropsType) => {
    const isActive = selectedPlan === planTitle;
    const selectable = isPlanSelectable(currentPlan, planTitle) && canChangePlan;

    return (
        <div
            className={`${styles.pricingCard} ${isActive ? styles.selected : ""} ${
                !selectable ? styles.inactive : ""
            }`}
        >
            <div className={styles.planHeader}>
                {planTitle !== "Free" && (
                    <div className={styles.iconBox}>
                        {planTitle === "Mid" && <Basic />}
                        {planTitle === "Pro" && <Pro />}
                    </div>
                )}
                <h4 className={styles.title}>{planTitle}</h4>
            </div>
            <p className={styles.price}>
                {`${price} zł `}
                <span className={styles.priceDetails}>/miesiąc</span>
            </p>
            <button
                className={`${styles.btn} ${
                    isActive ? styles.btnSelected : ""
                } ${!selectable ? styles.btnInactive : ""}`}
                onClick={() => handleSelectPlan(planTitle)}
                disabled={!selectable && !isActive}
            >
                {isActive ? "Twój aktualny plan" : "Wybierz ten plan"}
            </button>
            <ul className={styles.list}>
                <h5 className={styles.planSubtitle}>Co zawiera ten plan?</h5>
                {values.map((item) => (
                    <li key={item.replace(/\s+/g, "")} className={styles.listItem}>
                        <span className={styles.icon}>
                            <CheckCircle />
                        </span>
                        <p className={styles.value}>{item}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
