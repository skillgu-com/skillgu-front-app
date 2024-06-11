import {
    Controller,
    Path,
    FieldValues, Control, ControllerProps, FormState
} from "react-hook-form"
import React, {useEffect, useMemo, useState} from "react";
import {Collapse, Select} from "@mui/material";
import Typography from "@mui/material/Typography";
import {SelectInputProps} from "@mui/material/Select/SelectInput";
import MenuItem from "@mui/material/MenuItem";
import {DropdownOption} from "@customTypes/dropdownOption";
import {StyledFeedbackWrapper, StyledInputWrapper} from "../_common/FormInput.styles";
import InputFeedback from "../InputFeedback/InputFeedback";

export type Feedback = {
    message: string;
    severity: 'error' | 'success';
}

// Typ dla propsów komponentu
interface Props<T extends FieldValues, OptionMetadataT> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    formState: FormState<T>;
    getOptions: () => Promise<DropdownOption<OptionMetadataT>[]>;
    customFeedback?: Feedback[];
    inputProps?: SelectInputProps;
    controllerProps?: Omit<ControllerProps<T>, 'name' | 'control' | 'render'>;
}

// Komponent FormInputSelect
const FormInputSelect = <T extends FieldValues, OptionMetadataT = undefined>({
                                                                                 control,
                                                                                 name,
                                                                                 customFeedback,
                                                                                 inputProps,
                                                                                 controllerProps,
                                                                                 label,
                                                                                 formState,
                                                                                 getOptions
                                                                             }: Props<T, OptionMetadataT>) => {

    const [options, setOptions] = useState<DropdownOption<OptionMetadataT>[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        getOptions().then(data => {
            if (isMounted) {
                setOptions(data);
                setLoading(false);
            }
        }).catch(error => {
            console.error('Error loading options:', error);
            setLoading(false);
        });

        return () => {
            isMounted = false;
        };
    }, [getOptions]);

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
                        {loading ? (
                            <MenuItem disabled>Loading...</MenuItem>
                        ) : (
                            options.map(({value, label}) => (
                                <MenuItem key={`${value}-${label}`} value={value}>{label}</MenuItem>
                            ))
                        )}
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