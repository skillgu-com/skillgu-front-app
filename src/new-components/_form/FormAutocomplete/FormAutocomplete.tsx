import {
    Controller,
    Path,
    FieldValues, Control, ControllerProps, FormState
} from "react-hook-form"
import TextField, {TextFieldProps} from '@mui/material/TextField';
import React, {useMemo} from "react";
import {Collapse} from "@mui/material";
import {StyledFeedbackWrapper, StyledInputWrapper } from "@newComponents/_form/FormInputText/FormInputText.styles";
import Typography from "@mui/material/Typography";
import InputFeedback, {InputFeedbackProps} from "@newComponents/_form/InputFeedback/InputFeedback";

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    formState: FormState<T>;
    label?: string;
    customFeedback?: InputFeedbackProps[];
    inputProps?: TextFieldProps;
    controllerProps?: Omit<ControllerProps<T>, 'name' | 'control' | 'render'>;
}

const FormAutocomplete = <T extends FieldValues>({
  control,
  name,
  customFeedback,
  inputProps,
  controllerProps,
  label,
  formState
}: Props<T>) => {

    const feedback: InputFeedbackProps[] = useMemo(() => {
        if(customFeedback) return customFeedback;
        const error = formState.errors[name]
        if(!error) return [];
        return [{ message: error.message as string, severity: 'error' }];
    }, [formState, customFeedback, name]);

    return (
        <StyledInputWrapper>
            {label && <Typography variant='body2'>{label}</Typography>}
            <Controller
                name={name}
                control={control}
                render={({field: {ref, ...field}}) => <TextField {...field} {...inputProps} inputRef={ref} />}
                {...controllerProps}
            />
            <Collapse in={feedback && !!feedback.length}>
                <StyledFeedbackWrapper>
                    {feedback && feedback.map(({message, severity}, index) => {
                       return <InputFeedback key={`${message}_${index}`} message={message} severity={severity} />
                    })}
                </StyledFeedbackWrapper>
            </Collapse>
        </StyledInputWrapper>
    )
}

export default FormAutocomplete;