import React from 'react';
import {useMemo} from 'react';

import {Control, Controller, ControllerProps, FieldValues, FormState, Path} from 'react-hook-form';

import UploadFileInput from './_components/UploadFileInput';
import {Collapse,} from "@mui/material";
import {StyledFeedbackWrapper, StyledInputWrapper} from "@newComponents/_form/FormInputText/FormInputText.styles";
import Typography from "@mui/material/Typography";
import InputFeedback, {InputFeedbackProps} from "@newComponents/_form/InputFeedback/InputFeedback";

interface Props<T extends FieldValues> {
    label?: string;
    name: Path<T>;
    control: Control<T>;
    formState: FormState<T>;
    controllerProps?: Omit<ControllerProps<T>, 'name' | 'control' | 'render'>;
    customFeedback?: InputFeedbackProps[];
    disabled?: boolean;
}

const FormInputFile = <T extends FieldValues>({
    control,
    label,
    name,
    customFeedback,
    formState,
    controllerProps = {},
    disabled,
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
                control={control}
                name={name}
                {...controllerProps}
                render={({field, fieldState}) => (
                    <UploadFileInput disabled={disabled} {...field} />
                )}
            />
            <Collapse in={feedback && !!feedback.length}>
                <StyledFeedbackWrapper>
                    {feedback && feedback.map(({message, severity}, index) => {
                        return <InputFeedback key={`${message}_${index}`} message={message} severity={severity}/>
                    })}
                </StyledFeedbackWrapper>
            </Collapse>
        </StyledInputWrapper>
    );
};

export default FormInputFile;
