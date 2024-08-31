import React, {ReactNode, useState} from 'react';
import {FaCheckCircle} from 'react-icons/fa';
import styles from "./Pricing.module.scss";
import {SectionTemplate} from 'src/components/SectionTemplate';
import {ReactComponent as KingIcon} from 'src/assets/icons/svg/king.svg';
import {StarIcon} from "@icons/StarIcon";

type Props = {
    title?: string;
    subtitle?: ReactNode;
};

export const Pricing = ({title, subtitle}: Props) => {
    const [selectedPlan, setSelectedPlan] = useState<string | null>('Free'); // Default to 'Free'

    const handleSelectPlan = (plan: string) => {
        setSelectedPlan(plan);
    };

    return (
        <SectionTemplate title={title || 'Twoje Plany'} description={subtitle}>
            <section className={styles.pricingSection}>
                <div className={styles.flex}>
                    <div
                        className={`${styles.pricingCard} ${selectedPlan === 'Free' ? styles.selected : ''}`}
                        onClick={() => handleSelectPlan('Free')}>
                        <div className={styles.planHeader}>
                            <span className={styles.iconPlaceholder}></span>
                            <h4>Free</h4>
                        </div>
                        <p className={styles.price}>0 zł <span className={styles.priceDetails}>/ miesiąc</span></p>
                        <button className={`${styles.btn} ${selectedPlan === 'Free' ? styles.selectedBtn : ''}`}>
                            {selectedPlan === 'Free' ? 'Twój aktualny plan' : 'Wybierz ten plan'}
                        </button>
                        <h5>Co zawiera ten plan?</h5>
                        <ul>
                            <li><FaCheckCircle className={styles.icon}/>Pełny dostęp do aplikacji</li>
                            <li><FaCheckCircle className={styles.icon}/>Nieograniczona liczba mentee</li>
                            <li><FaCheckCircle className={styles.icon}/>18% prowizji od spotkania</li>
                            <li><FaCheckCircle className={styles.icon}/> Brak darmowych spotkań</li>
                        </ul>
                    </div>

                    <div
                        className={`${styles.pricingCard} ${selectedPlan === 'Mid' ? styles.selected : ''}`}
                        onClick={() => handleSelectPlan('Mid')}
                    >
                        <div className={styles.planHeader}>
                            <StarIcon className={styles.icon}/>
                            <h4>Basic</h4>
                        </div>
                        <p className={styles.price}>89 zł <span className={styles.priceDetails}>/ miesiąc</span></p>
                        <button className={`${styles.btn} ${selectedPlan === 'Mid' ? styles.selectedBtn : ''}`}>
                            {selectedPlan === 'Mid' ? 'Twój aktualny plan' : 'Wybierz ten plan'}
                        </button>
                        <h5>Co zawiera ten plan?</h5>
                        <ul>
                            <li><FaCheckCircle className={styles.icon}/>5 darmowych spotkań w miesiącu</li>
                            <li><FaCheckCircle className={styles.icon}/>Gwarancja stałej opłaty miesięcznej</li>
                            <li><FaCheckCircle className={styles.icon}/>Niższa prowizja: 10%</li>
                            <li><FaCheckCircle className={styles.icon}/>Pełny dostęp do aplikacji</li>
                            <li><FaCheckCircle className={styles.icon}/>Nieograniczona liczba mentee</li>
                        </ul>
                    </div>

                    <div
                        className={`${styles.pricingCard} ${selectedPlan === 'Pro' ? styles.selected : ''}`}
                        onClick={() => handleSelectPlan('Pro')}
                    >
                        <div className={styles.planHeader}>
                            <KingIcon className={styles.icon}/>
                            <h4>Pro</h4>
                        </div>
                        <p className={styles.price}>190 zł <span className={styles.priceDetails}>/ miesiąc</span></p>
                        <button className={`${styles.btn} ${selectedPlan === 'Pro' ? styles.selectedBtn : ''}`}>
                            {selectedPlan === 'Pro' ? 'Twój aktualny plan' : 'Wybierz ten plan'}
                        </button>
                        <h5>Co zawiera ten plan?</h5>
                        <ul>
                            <li><FaCheckCircle className={styles.icon}/>Darmowe spotkania bez limitu</li>
                            <li><FaCheckCircle className={styles.icon}/>Gwarancja stałej opłaty miesięcznej</li>
                            <li><FaCheckCircle className={styles.icon}/>Brak prowizji</li>
                            <li><FaCheckCircle className={styles.icon}/>Nieograniczona liczba mentee</li>
                        </ul>
                    </div>
                </div>
            </section>
        </SectionTemplate>
    );
};

export default Pricing;
