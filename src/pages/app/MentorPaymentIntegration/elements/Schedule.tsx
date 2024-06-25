import React, { useEffect, useMemo, useRef, useState } from "react";
import clx from "classnames";

import { Dropdown } from "src/components/_grouped/dropdown";

import styles from "./../styles.module.scss";

import { fetchPaymentSchedule } from "@services/stripe/stripeService";
import DropdownIcon from "@icons/DropdownIcon";

type ScheduleType = {
  options: { label: string; value: string }[];
  selected: string;
  nextPayment: string;
};
export const Schedule = () => {
  const [paymentSchedule, setPaymentSchedule] = useState<ScheduleType>();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [error, setError] = useState("");

  const toggleRef = useRef<HTMLButtonElement>(null);
  const toogleOpenDropdown = () => setOpenDropdown((state) => !state);

  const selectedPayment = useMemo(
    () =>
      paymentSchedule?.options.find(
        (option) => option.value === paymentSchedule.selected
      ),
    [paymentSchedule]
  );

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const schedule = await fetchPaymentSchedule();
        setPaymentSchedule(schedule);
      } catch (error) {
        setError("Error occurred while getting payment schedule.");
        console.error("Error fetching payment schedule", error);
      }
    };

    fetchSchedule();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement;
    const value = target instanceof HTMLButtonElement ? target.value : "1/w";

    console.log(value);
    toogleOpenDropdown();
  };

  return (
    <>
      <p className={styles.scheduleLabel}>Harmonogram wypłat</p>

      <Dropdown className={styles.dropdown}>
        <Dropdown.Toggle
          onClick={handleClick}
          className={clx(styles.btn, styles.toogle)}
          toggleRef={toggleRef}
        >
          <p>{selectedPayment?.label}</p>
          <DropdownIcon />
        </Dropdown.Toggle>
        {openDropdown ? (
          <Dropdown.Menu
            toggleRef={toggleRef}
            onClickOutside={toogleOpenDropdown}
            className={styles.menu}
          >
            {paymentSchedule?.options.map((option) => (
              <Dropdown.Option
                value={option.value}
                onClick={handleClick}
                className={clx(styles.btn, styles.option)}
              >
                <p className={styles.text}>
                  {option.label}
                  <span>{` (następna ${paymentSchedule.nextPayment})`}</span>
                </p>
              </Dropdown.Option>
            ))}
          </Dropdown.Menu>
        ) : null}
      </Dropdown>
    </>
  );
};
