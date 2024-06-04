import React from "react";
import { useMemo } from "react";

import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  FormState,
  Path,
} from "react-hook-form";

import UploadFileInput from "./_components/UploadFileInput";
import { Collapse } from "@mui/material";
import {StyledInputWrapper, StyledFeedbackWrapper} from "@newComponents/_form/_common/FormInput.styles";
import Typography from "@mui/material/Typography";
import InputFeedback, {
  InputFeedbackProps,
} from "@newComponents/_form/InputFeedback/InputFeedback";
import { Preview } from "./_components/Preview";
import styles from "./styles.module.scss";

interface Props<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  formState: FormState<T>;
  controllerProps?: Omit<ControllerProps<T>, "name" | "control" | "render">;
  customFeedback?: InputFeedbackProps[];
  disabled?: boolean;
  withPreview?: boolean;
}

const FormInputFile = <T extends FieldValues>({
  control,
  label,
  name,
  customFeedback,
  formState,
  controllerProps = {},
  disabled,
  withPreview,
}: Props<T>) => {
  const feedback: InputFeedbackProps[] = useMemo(() => {
    if (customFeedback) return customFeedback;
    const error = formState.errors[name];
    if (!error) return [];
    return [{ message: error.message as string, severity: "error" }];
  }, [formState, customFeedback, name]);

  return (
    <StyledInputWrapper>
      {label && <Typography variant="body2">{label}</Typography>}
      <Controller
        control={control}
        name={name}
        {...controllerProps}
        render={({ field, fieldState }) => {
          return (
            <div className={styles.controllerContentWrapper}>
              {withPreview && field.value && field.value.length ? (
                <Preview
                  value={field.value}
                  onRemove={() => {
                    field.onChange([]);
                  }}
                />
              ) : null}

              <UploadFileInput disabled={disabled} {...field} />
            </div>
          );
        }}
      />
      <Collapse in={feedback && !!feedback.length}>
        <StyledFeedbackWrapper>
          {feedback &&
            feedback.map(({ message, severity }, index) => {
              return (
                <InputFeedback
                  key={`${message}_${index}`}
                  message={message}
                  severity={severity}
                />
              );
            })}
        </StyledFeedbackWrapper>
      </Collapse>
    </StyledInputWrapper>
  );
};

export default FormInputFile;
