import {
    Controller,
    Path,
    FieldValues, Control, ControllerProps, FormState
} from "react-hook-form"
import TextField, {TextFieldProps} from '@mui/material/TextField';
import React, {useMemo} from "react";
import {Collapse} from "@mui/material";
import exhaustiveGuard from "../../../helpers/exhaustiveGuard";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {
    StyledFeedback,
    StyledFeedbackWrapper,
    StyledInputWrapper
} from "@newComponents/_form/FormInputText/FormInputText.styles";
import Typography from "@mui/material/Typography";
import InputFeedback from "@newComponents/_form/InputFeedback/InputFeedback";

export type Feedback = {
    message: string;
    severity: 'error' | 'success';
}

interface Props<T extends FieldValues> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    formState: FormState<T>;
    customFeedback?: Feedback[];
    inputProps?: TextFieldProps;
    controllerProps?: Omit<ControllerProps<T>, 'name' | 'control' | 'render'>;
}

const FormInputText = <T extends FieldValues>({
  control,
  name,
  customFeedback,
  inputProps,
  controllerProps,
  label,
  formState
}: Props<T>) => {

    const feedback: Feedback[] = useMemo(() => {
        if(customFeedback) return customFeedback;
        const error = formState.errors[name]
        if(!error) return [];
        return [{ message: error.message as string, severity: 'error' }];
    }, [formState, customFeedback, name]);

    return (
        <StyledInputWrapper>
            <Typography variant='caption'>{label}</Typography>
            <Controller
                name={name}
                control={control}
                render={({field}) => <TextField {...field} {...inputProps} />}
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

export default FormInputText;