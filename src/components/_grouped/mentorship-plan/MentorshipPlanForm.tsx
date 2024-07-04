import React, {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import styles from "./MentorshipPlan.module.scss";
import clx from "classnames";
import { MentorhsipPlanType, SubscriptionPlan } from "@customTypes/order";
import { displayPlanName } from "src/utils/plan";
import { CrownIcon } from "@icons/CrownIcon";
import { PlusIcon } from "@icons/PlusIcon";
import { CheckCircleIcon } from "@icons/CheckCircleIcon";
import Select from "src/components/Select/Select";
import {
  ReactSelectOptionType,
  responseTimeOptions,
  sessionDurationOptions,
} from "./config";
import {
  OverflowMenu,
  OverflowMenuList,
  OverflowMenuOption,
  OverflowMenuToggle,
} from "../overflow-menu";
import { PlanName } from "src/components/_base/PlanName";
import ReactSelect, { ActionMeta, SingleValue } from "react-select";

type FieldName =
  | "description"
  | "price"
  | "sessionDuration"
  | "responseTime"
  | "sessionsPerMonth"
  | "planIncludes";

type Values = Pick<
  MentorhsipPlanType,
  | "description"
  | "price"
  | "sessionDuration"
  | "responseTime"
  | "sessionsPerMonth"
  | "planIncludes"
>;

export type MentorshipPlanFormValues = Values;

type Errors = Record<keyof Values, string>;

type Touched = Record<keyof Values, string>;

type ChangeProp =
  | { name: "description"; value: string }
  | { name: "price"; value: number }
  | { name: "sessionDuration"; value: number }
  | { name: "responseTime"; value: number }
  | { name: "sessionsPerMonth"; value: number }
  | { name: "planIncludes"; value?: string; i: number };

type Props = {
  subscriptionVariant: SubscriptionPlan;
  values: Values;
  errors?: Errors;
  touched?: Touched;
  handleBlur?: (name: string) => void;
  handleChange?: (chProps: ChangeProp) => void; //(name: string, value: string | null, index?: number) => void;
  setAdditional?: React.Dispatch<React.SetStateAction<string[]>>;
  setValues?: React.Dispatch<React.SetStateAction<MentorshipPlanFormValues>>; //(cb: (values: Values) => Values) => void;
};

const checkIcon = <CheckCircleIcon className={styles.checkIcon} />;

const regex = /^(\w+)\[(\d+)\]$/; ///planIncludes\[(\d+)\]/;

const parseNameAndIndex = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) : { fullName: string, name: FieldName, i?: number } => {
  const inp = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
  const _name = inp.name as FieldName;
  try {
    const match = _name.match(regex)
    if(match && match.length >= 3 && match[1] && match[2]){
      const name = match[1] as FieldName
      const i = Number(match[2])
      if(isNaN(i)){
        throw new Error('Wrong or missing index')
      }   
      return {
        fullName: name,
        name, 
        i,
      }
    }
  } catch (e) {}

  return { fullName: _name, name: _name }
}

export const MentorshipPlanForm = ({
  subscriptionVariant,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setValues,
}: Props) => {
  const [overflowMenuIndex, setOverflowMenuIndex] = useState<number | null>(
    null
  );

  const menuClickHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const value = Number(btn.value);
    if (isNaN(value)) {
      return;
    }
    setOverflowMenuIndex((curr) => {
      if (curr === value) {
        return null;
      }
      if (curr === null || (typeof curr === "number" && curr !== value)) {
        return value;
      }
      return null;
    });
  }, []);

  const handleAddAdditionalRow = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const i = Number(btn.value);
      if (isNaN(i)) {
        return;
      }
      handleChange && handleChange({ name: "planIncludes", value: "", i });
      setValues &&
        setValues((curr: Values) => ({
          ...curr,
          planIncludes: [...curr.planIncludes, ""],
        }));
    },
    [handleChange]
  );

  const handleRemoveAdditionalRow = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const i = Number(btn.value);
      if (isNaN(i)) {
        return;
      }
      handleChange &&
        handleChange({
          name: "planIncludes",
          i,
        });
      setValues &&
        setValues((curr: Values) => ({
          ...curr,
          planIncludes: curr.planIncludes.filter((_, j) => j !== i),
        }));
    },
    [handleChange, setValues]
  );

  const inputBlurHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inp = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
      const { name } = inp;
      handleBlur && handleBlur(name);
    },
    [handleBlur]
  );

  const inputChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inp = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
      const { name, i } = parseNameAndIndex(e)

      switch (name) {
        case "description":
          const strValue = String(inp.value);
          handleChange && handleChange({ name, value: strValue });
          setValues &&
            setValues((curr: Values) => ({
              ...curr,
              [name]: strValue,
            }));
          break;
        case "price":
        case "responseTime":
        case "sessionDuration":
        case "sessionsPerMonth":
          const numValue = Number(inp.value);
          handleChange && handleChange({ name, value: numValue });
          setValues &&
            setValues((curr: Values) => ({
              ...curr,
              [name]: numValue,
            }));
          break;
        case "planIncludes":
          if(typeof i !== 'number' || isNaN(i)){
            break;
          }
          const strValue2 = String(inp.value);
          handleChange && handleChange({ name, value: strValue2, i });
          setValues &&
            setValues((curr: Values) => ({
              ...curr,
              planIncludes: curr.planIncludes.map((c, j) =>
                j === i ? strValue2 : c
              ),
            }));
          return;
      }
    },
    [handleChange, setValues]
  );

  const inputReactSelectHandler = useCallback(
    (opt: SingleValue<{}>, actionMeta: ActionMeta<{}>) => {
      const { value } = opt as ReactSelectOptionType;
      const name = (actionMeta?.name || "") as FieldName;
      switch (name) {
        case "responseTime":
        case "sessionDuration":
          const numValue = Number(value);
          handleChange && handleChange({ name, value: numValue });
          setValues &&
            setValues((curr: Values) => ({
              ...curr,
              [name]: numValue,
            }));
          break;
      }
    },
    [handleChange, setValues]
  );

  const lastExtraRowIsEmpty = useMemo(() => {
    if (values.planIncludes.length === 0) {
      return false;
    }
    const lastElement = values.planIncludes[values.planIncludes.length - 1];
    return lastElement === "";
  }, [values.planIncludes]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.rows}>
        <PlanName
          className={styles.planName}
          plan={subscriptionVariant}
          fontVariant="subtitle-1"
          iconSize={20}
        />
        <div className={clx(styles.row, styles.priceRow)}>
          <input
            className={clx(styles.input, styles.priceInput)}
            type="number"
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            name={"price"}
            value={values.price}
          />
          <span>zł</span>
          <span>miesięcznie</span>
        </div>
        <div className={clx(styles.row)}>
          <textarea
            className={clx(styles.input, styles.textareaInput)}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            name={"description"}
            value={values.description}
            placeholder="Krótki opis planu"
          />
        </div>
        <h6 className={styles.subtitle}>Plan obejmuje</h6>
        {"sessionsPerMonth" in values ? (
          <div className={clx(styles.row)}>
            {checkIcon}
            <div>
              <input
                className={clx(styles.input)}
                type="text"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                name={"sessionsPerMonth"}
                value={values.sessionsPerMonth}
              />
              <span>sesje mentoringowe na miesiąc </span>
            </div>
          </div>
        ) : null}
        {"sessionDuration" in values ? (
          <div className={clx(styles.row)}>
            {checkIcon}
            <div>
              <span>Każda po</span>
              <ReactSelect
                options={sessionDurationOptions}
                value={
                  values.sessionDuration
                    ? sessionDurationOptions.find(
                        (v) => Number(v.value) === values.sessionDuration
                      )
                    : {}
                }
                defaultValue={
                  values.sessionDuration
                    ? sessionDurationOptions.find(
                        (v) => Number(v.value) === values.sessionDuration
                      )
                    : {}
                }
                onChange={inputReactSelectHandler}
                name="sessionDuration"
              />
              <span>minut </span>
            </div>
          </div>
        ) : null}
        {"responseTime" in values ? (
          <div className={clx(styles.row)}>
            {checkIcon}
            <div>
              <span>Odpowiedź w przeciągu</span>
              <ReactSelect
                options={responseTimeOptions}
                value={
                  values.responseTime
                    ? responseTimeOptions.find(
                        (v) => Number(v.value) === values.responseTime
                      )
                    : {}
                }
                defaultValue={
                  values.responseTime
                    ? responseTimeOptions.find(
                        (v) => Number(v.value) === values.responseTime
                      )
                    : {}
                }
                onChange={inputReactSelectHandler}
                name="responseTime"
              />
            </div>
          </div>
        ) : null}
        {values.planIncludes.map((r, i) => (
          <div className={clx(styles.row)} key={i}>
            {checkIcon}
            <div>
              <textarea
                value={r}
                name={`planIncludes[${i}]`}
                onChange={inputChangeHandler}
              />
            </div>
            <OverflowMenu
              onMouseLeave={() => setOverflowMenuIndex(null)}
              onClickOutside={() => setOverflowMenuIndex(null)}
            >
              <OverflowMenuToggle
                onClick={menuClickHandler}
                value={String(i)}
                className={styles.toggle}
              />
              {overflowMenuIndex === i ? (
                <OverflowMenuList>
                  <OverflowMenuOption
                    text="Usuń"
                    onClick={handleRemoveAdditionalRow}
                    name="suspend"
                    value={String(i)}
                  />
                </OverflowMenuList>
              ) : null}
            </OverflowMenu>
          </div>
        ))}
      </div>

      <div className={styles.action}>
        <button
          disabled={lastExtraRowIsEmpty}
          value={values.planIncludes.length}
          onClick={handleAddAdditionalRow}
        >
          <PlusIcon />
          <span>Dodaj kolejny punkt</span>
        </button>
      </div>
    </div>
  );
};
