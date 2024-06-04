import {
    Controller,
    Path,
    FieldValues, Control, ControllerProps, FormState
} from "react-hook-form"
import React, {useMemo} from "react";
import {Collapse} from "@mui/material";
import {StyledInputWrapper, StyledFeedbackWrapper} from "@newComponents/_form/_common/FormInput.styles";
import Typography from "@mui/material/Typography";
import InputFeedback, {InputFeedbackProps} from "@newComponents/_form/InputFeedback/InputFeedback";
import {DatePickerProps} from "@mui/x-date-pickers";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    formState: FormState<T>;
    label?: string;
    customFeedback?: InputFeedbackProps[];
    inputProps?: DatePickerProps<any>;
    controllerProps?: Omit<ControllerProps<T>, 'name' | 'control' | 'render'>;
}

const FormDatePicker = <T extends FieldValues>({
                                                   control,
                                                   name,
                                                   customFeedback,
                                                   inputProps,
                                                   controllerProps,
                                                   label,
                                                   formState
                                               }: Props<T>) => {

    const feedback: InputFeedbackProps[] = useMemo(() => {
        if (customFeedback) return customFeedback;
        const error = formState.errors[name]
        if (!error) return [];
        return [{message: error.message as string, severity: 'error'}];
    }, [formState, customFeedback, name]);

    return (
        <StyledInputWrapper>
            {label && <Typography variant='body2'>{label}</Typography>}
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <DatePicker
                        {...field}
                        {...inputProps}
                    />
                )}
                {...controllerProps}
            />
            <Collapse in={feedback && !!feedback.length}>
                <StyledFeedbackWrapper>
                    {feedback && feedback.map(({message, severity}, index) => {
                        return <InputFeedback key={`${message}_${index}`} message={message} severity={severity}/>
                    })}
                </StyledFeedbackWrapper>
            </Collapse>
        </StyledInputWrapper>
    )
}

export default FormDatePicker;