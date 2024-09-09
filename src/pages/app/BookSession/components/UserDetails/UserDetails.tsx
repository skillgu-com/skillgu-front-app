import React, { useEffect } from "react";
import { useBookingReducer } from "src/reducers/booking";
import styles from "./UserDetails.module.scss";
import Input from "../../../../../components/Input/Input";

type UserDetailsProps = {
  onFilled: (filled: boolean) => void;
  isLoggedIn: boolean;
};

export const UserDetails: React.FC<UserDetailsProps> = ({
  onFilled,
  isLoggedIn,
}) => {
  const [state, dispatch] = useBookingReducer();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Walidacja tylko gdy użytkownik nie jest zalogowany
  const isEmailValid =
    !isLoggedIn &&
    !!state.customerEmail &&
    emailRegex.test(state.customerEmail);
  const isPhoneValid = !isLoggedIn && !!state.customerPhone.trim();

  useEffect(() => {
    const allFieldsFilled = isLoggedIn || (isEmailValid && isPhoneValid);
    onFilled(allFieldsFilled);
  }, [isEmailValid, isPhoneValid, isLoggedIn, onFilled]);

  return (
    <div className={styles.wrapper}>
      {!isLoggedIn && (
        <div className={styles.inputs}>
          <Input
            id="email"
            name="email"
            type="email"
            label="E-mail"
            placeholder="E-mail"
            value={state.customerEmail}
            errorMessage={
              !state.customerEmail.trim()
                ? "E-mail jest wymagany"
                : !isEmailValid
                  ? "Nieprawidłowy format e-mail"
                  : ""
            }
            isValid={isEmailValid}
            valueChangeHandler={(name, value) =>
              dispatch({
                type: "SET_EMAIL",
                payload: { customerEmail: value.value || " " },
              })
            }
          />

          <Input
            id="phone"
            name="phone"
            type="phone"
            label="Telefon"
            placeholder="Telefon"
            value={state.customerPhone}
            errorMessage={!isPhoneValid ? "Telefon jest wymagany" : ""}
            isValid={isPhoneValid}
            valueChangeHandler={(name, value) =>
              dispatch({
                type: "SET_PHONE",
                payload: { customerPhone: value.value || " " },
              })
            }
          />
        </div>
      )}
      <Input
        id="topic"
        name="topic"
        as="textarea"
        label="Temat spotkania"
        classes={styles.textarea}
        placeholder="Opisz, co chciałbyś przerobić na sesji z mentorem"
        value={state.customerMessage}
        isValid={!!state.customerMessage.trim()}
        textMaxLength={500}
        valueChangeHandler={(name, value) =>
          dispatch({
            type: "SET_MESSAGE",
            payload: { customerMessage: value.value.slice(0, 500) || " " },
          })
        }
      />
    </div>
  );
};
