import {
    Controller,
    Path,
    FieldValues, Control, ControllerProps, FormState
} from "react-hook-form"
import React, {useMemo} from "react";
import {Collapse, Select} from "@mui/material";
import {StyledFeedbackWrapper, StyledInputWrapper} from "@newComponents/_form/FormInputText/FormInputText.styles";
import Typography from "@mui/material/Typography";
import InputFeedback from "@newComponents/_form/InputFeedback/InputFeedback";
import {SelectInputProps} from "@mui/material/Select/SelectInput";
import MenuItem from "@mui/material/MenuItem";
import {DropdownOption} from "@customTypes/dropdownOption";

export type Feedback = {
    message: string;
    severity: 'error' | 'success';
}

interface Props<T extends FieldValues, OptionMetadataT> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    formState: FormState<T>;
    options: DropdownOption<OptionMetadataT>[];
    customFeedback?: Feedback[];
    inputProps?: SelectInputProps;
    controllerProps?: Omit<ControllerProps<T>, 'name' | 'control' | 'render'>;
}

const FormInputSelect = <T extends FieldValues, OptionMetadataT = undefined>({
     control,
     name,
     customFeedback,
     inputProps,
     controllerProps,
     label,
     formState,
     options
 }: Props<T, OptionMetadataT>) => {

    const feedback: Feedback[] = useMemo(() => {
        if (customFeedback) return customFeedback;
        const error = formState.errors[name]
        if (!error) return [];
        return [{message: error.message as string, severity: 'error'}];
    }, [formState, customFeedback, name]);

    return (
        <StyledInputWrapper>
            <Typography variant='body2'>{label}</Typography>
            <Controller
                name={name}
                control={control}
                render={({field: { ref, ...field}}) => (
                    <Select {...field} {...inputProps} inputRef={ref}>
                        {options.map(({value, label}) => <MenuItem key={`${value}-${label}`} value={value}>{label}</MenuItem>)}
                    </Select>)
                }
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

export default FormInputSelect;