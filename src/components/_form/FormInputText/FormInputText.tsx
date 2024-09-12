import {
    Controller,
    Path,
    FieldValues, Control, ControllerProps, FormState
} from "react-hook-form"
import TextField, {TextFieldProps} from '@mui/material/TextField';
import React, {useMemo, useState} from "react";
import {Collapse, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import styles from '../styles.module.scss'
import InputFeedback, {InputFeedbackProps} from "../InputFeedback/InputFeedback";
import {StyledInputWrapper} from "../FormInputCheckbox/FormInputCheckbox.styles";
import {StyledFeedbackWrapper} from "../FormInputSwitcher/FormInputSwitcher.styles";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    formState: FormState<T>;
    label?: string;
    customFeedback?: InputFeedbackProps[];
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

    const feedback: InputFeedbackProps[] = useMemo(() => {
        if (customFeedback) return customFeedback;
        const error = formState.errors[name]
        if (!error) return [];
        return [{message: error.message as string, severity: 'error'}];
    }, [formState, customFeedback, name]);


    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword((show) => !show);

    const endAdornment = useMemo(() => {
        if (inputProps?.InputProps?.endAdornment) return inputProps.InputProps.endAdornment;
        if (inputProps?.type === 'password') {
            return (
                <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
            );
        }
        return undefined;
    }, [inputProps, showPassword])

    return (
        <StyledInputWrapper>
            {label && <Typography variant='buttonMd' color='secondary' className={styles.Label}>{label}</Typography>}
            <Controller
                name={name}
                control={control}
                render={({field: {ref, ...field}}) => <TextField
                    {...field}
                    {...inputProps}
                    type={showPassword ? 'text' : inputProps?.type}
                    inputRef={ref}
                    InputProps={{
                        endAdornment
                    }}
                />}
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

export default FormInputText;