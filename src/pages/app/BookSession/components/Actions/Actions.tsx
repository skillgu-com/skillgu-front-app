import React, {FC, useState} from "react";
import styles from "./Actions.module.scss";
import {useBookingReducer} from "src/reducers/booking";
import Checkbox from "../../../../../components/Checkbox/Checkbox";
import Button from "../../../../../components/Button/Button";

type Props = {
    onSubmit: () => void;
    disabled: boolean;
};

export const Actions: FC<Props> = ({onSubmit, disabled}) => {
    const [state, dispatch] = useBookingReducer();
    const [formTouched, setFormTouched] = useState(false);

    const isFormValid = (disabled || state.consents) && state.consents;

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFormTouched(true);
        if (isFormValid) {
            onSubmit();
        }
    };

    return (
        <div className={styles.wrapper}>
            <Checkbox
                id="policy"
                name="policy"
                classes={styles.checkbox}
                value={state.consents}
                errorMessage={!state.consents && formTouched ? "Musisz wyrazić zgodę" : ""}
                isValid={state.consents}
                valueChangeHandler={() => {
                    dispatch({type: "SWITCH_CONSENTS"});
                }}
                label="Wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie [tutaj zakres przetwarzania danych] przez [dane administratora danych osobowych: nazwa, imię, nazwisko, adres] w celu [cel przetwarzania danych osobowych]."
            />

            {!state.consents && formTouched && (
                <span className={styles.error}>Zgoda jest wymagana.</span>
            )}

            <Button
                onClick={handleSubmit}
                size="lg"
                type="submit"
                classes={styles.button}
                fullWidth
                disabled={!isFormValid}
            >
                Przejdź do płatności tutaj
            </Button>
        </div>
    );
};
