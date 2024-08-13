import React, {FC} from "react";
import styles from "./Actions.module.scss";
import {useBookingReducer} from "src/reducers/booking";
import {useNavigate} from "react-router-dom";
import Checkbox from "../../../../../components/Checkbox/Checkbox";
import Button from "../../../../../components/Button/Button";

type Props = {
    onSubmit: () => void;
}

export const Actions: FC<Props> = ({onSubmit}) => {
    const [state, dispatch] = useBookingReducer();
    const navigate = useNavigate();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        navigate(`/mentorship-book/1/payment`);
        onSubmit();
    };

    return (
        <div className={styles.wrapper}>
            <Checkbox
                id="policy"
                name="policy"
                classes={styles.checkbox}
                value={state.consents}
                errorMessage={state.consents ? "" : "Musisz wyrazić zgodę"}
                isValid={state.consents}
                valueChangeHandler={() => {
                    dispatch({type: "SWITCH_CONSENTS"});
                }}
                label="Wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie [tutaj zakres przetwarzania
						danych] przez [dane administratora danych osobowych: nazwa, imię, nazwisko, adres] w celu [cel przetwarzania danych osobowych]."
            />
            <Button
                onClick={handleSubmit}
                size="lg"
                type="submit"
                classes={styles.button}
                fullWidth
            >
                Przejdź do płatności tutaj
            </Button>
        </div>
    );
};
