import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Reports} from "./elements/Reports";
import {Loader} from "../../../components/_grouped/loader";
import styles from "../MentorPaymentIntegration/styles.module.scss";
import FAQ from "../../../components/FAQ/Accordion/Accordion";
import {payment} from "../../../components/FAQ/Accordion/content/payment";

export const MenteePaymentReports = () => {
    const [price, setPrice] = useState(0);

    const [initialDataPending, setInitialDataPending] = useState<boolean>(true);
    const [connectedAccountId, setConnectedAccountId] = useState<string | null>(
        null
    );
    const [accountCreatePending, setAccountCreatePending] = useState(false);
    const [accountLinkCreatePending, setAccountLinkCreatePending] =
        useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();


    return (
        <>
            <Loader
                open={accountLinkCreatePending || initialDataPending}
                spinner
                shadow
                overlay="global"
                spinnerSize="lg"
            />

            <section>
                <Reports/>
            </section>
            <section>
                <div className={styles.faqBox}>
                    <FAQ title="FAQ" elements={payment}/>
                </div>
            </section>
        </>
    );
};
export default MenteePaymentReports;