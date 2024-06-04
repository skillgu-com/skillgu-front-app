import React, {FC} from 'react';
// Components
import Checkbox from '@newComponents/Checkbox/Checkbox';
// Icons
import Add from '@icons/Add';
import Trash from '../icons/Trash';
// Styles
import styles from './WeekTime.module.scss';
import {Controller, get, useFieldArray, UseFormClearErrors, UseFormReturn} from "react-hook-form";
import {Box, Collapse, Fade, IconButton, InputAdornment} from "@mui/material";
import {TimePicker, TimePickerProps} from "@mui/x-date-pickers/TimePicker";
import {addHours, addMinutes, areIntervalsOverlapping, differenceInMinutes, isAfter} from "date-fns";
import InputFeedback from "@newComponents/_form/InputFeedback/InputFeedback";
import {TextFieldProps} from "@mui/material/TextField";
import {ScheduleFormInput} from "../../screens/ScheduleForm/ScheduleForm";

type CustomTimePickerProps = {
    pickerProps?: TimePickerProps<any>;
    label: string;
    inputProps?: TextFieldProps['InputProps'];
}

const CustomTimePicker: FC<CustomTimePickerProps> = ({pickerProps = {}, label, inputProps = {}}) => {

    return (
        <TimePicker
            slotProps={{
                textField: {
                    InputProps: {
                        startAdornment: <InputAdornment position="start">{label}</InputAdornment>,
                        classes: {input: styles.customTimePickerInput},
                        ...inputProps,
                    },
                },
            }}
            autoFocus
            {...pickerProps}
        />
    )
}

type Props = {
    label: string;
    baseName: string;
    form: UseFormReturn<any>
}

type DateField = { dateFrom: Date, dateTo: Date, id: string }

const slotsOverlapping = (rowValues: DateField[]): boolean => {
    return rowValues.some((slot, index) => (
        rowValues.slice(index + 1).some((slotToCompare) => (
            areIntervalsOverlapping(
                {start: slot.dateFrom, end: slot.dateTo},
                {start: slotToCompare.dateFrom, end: slotToCompare.dateTo}
            )
        ))
    ));
};

const slotShorterThanMeetingTime = (value: DateField, meetingLength: number): boolean => {
    if (isAfter(value.dateFrom, value.dateTo)) return false;
    return meetingLength - 1 > differenceInMinutes(value.dateTo, value.dateFrom);
};

type CustomValidationArgs = {
    formValues: ScheduleFormInput,
    baseName: string,
    idx: number,
    clearErrors: UseFormClearErrors<any>
}
const customValidation = ({formValues, idx, baseName, clearErrors}: CustomValidationArgs): true | string => {

    // variables
    const meetingLength = formValues.meetingLength;
    const rowValues = get(formValues, `${baseName}.slots`)
    const slotValues = rowValues[idx];

    // reset errors
    const base  = `${baseName}.slots.${idx}`
    clearErrors([ `${base}.dateTo`, `${base}.dateFrom` ]);

    if (slotsOverlapping(rowValues)) return 'Przedziały czasowe pokrywają się'

    if (slotShorterThanMeetingTime(slotValues, meetingLength)) return 'Przedział czasowy nie może być krótszy niż czas trwania spotkania';

    return true;
}


const WeekTime = ({baseName, label, form}: Props) => {
    const rowFormName = `${baseName}.isActivated`;
    const getFormDateFromName = (idx: number) => `${baseName}.slots.${idx}.dateFrom`;
    const getFormDateToName = (idx: number) => `${baseName}.slots.${idx}.dateTo`;

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: `${baseName}.slots`
    })

    const onAdd = () => {
        const previousSlotEndDate = (fields[fields.length - 1] as DateField).dateTo;
        const slotLength = form.getValues('meetingLength');
        const newDateFrom = addHours(previousSlotEndDate, 1)
        append({dateFrom: newDateFrom, dateTo: addMinutes(new Date(newDateFrom), +slotLength * 3)})
    };

    const isRowActivated = form.watch(rowFormName);

    const getErrorMessage = (index: number): null | string => {
        const errors = get(form.formState.errors, `${baseName}.slots`);

        if (!errors || !errors.length) return null;

        const row = errors[index];
        if (!row) return null;

        const errorsArray = [];
        if (row.dateFrom) errorsArray.push(row.dateFrom.message);
        if (row.dateTo) errorsArray.push(row.dateTo.message);
        return [...new Set(errorsArray)].filter(v => !!v).join(', ');
    }


    return (
        <Box sx={{display: 'grid', gap: 1, gridTemplateColumns: '70px 1fr'}}>
            <Box sx={{pt: 2}}>
                <Controller
                    control={form.control}
                    render={({field}) => {
                        return (
                            <Checkbox
                                classes={styles.checkbox}
                                id={rowFormName}
                                name={rowFormName}
                                value={!!field.value}
                                valueChangeHandler={(_, {value}) => field.onChange(value)}
                                slide
                                label={label}
                            />
                        )
                    }}
                    name={rowFormName}
                />
            </Box>
            <Box sx={{display: 'grid', gap: 2}}>
                {fields.map((item, idx) => {
                    const error = getErrorMessage(idx);

                    return (
                        <div key={item.id}>
                            <Box

                                sx={{display: 'grid', gridTemplateColumns: '60px auto auto 60px', gap: 2}}
                            >
                                <Fade in={fields.length !== 1}>
                                    <IconButton disabled={fields.length === 1} size='small' onClick={() => remove(idx)}>
                                        <Trash/>
                                    </IconButton>
                                </Fade>
                                <Controller
                                    render={({field}) => (
                                        <CustomTimePicker
                                            label={'Od'}
                                            inputProps={{error: !!error}}
                                            pickerProps={{
                                                disabled: !isRowActivated,
                                                ...field
                                            }}
                                        />
                                    )}
                                    name={getFormDateFromName(idx)}
                                    control={form.control}
                                    rules={{
                                        required: 'Pole wymagane',
                                        validate: (_, formValues) => {
                                            return customValidation({
                                                formValues,
                                                baseName,
                                                idx,
                                                clearErrors: form.clearErrors
                                            })
                                        }
                                    }}
                                />
                                <Controller
                                    render={({field}) => (
                                        <CustomTimePicker
                                            label={'Do'}
                                            inputProps={{error: !!error}}
                                            pickerProps={{
                                                disabled: !isRowActivated,
                                                ...field
                                            }}
                                        />
                                    )}
                                    name={getFormDateToName(idx)}
                                    control={form.control}
                                    rules={{
                                        required: 'Pole wymagane',
                                        validate: (_, formValues) => {
                                            return customValidation({
                                                formValues,
                                                baseName,
                                                idx,
                                                clearErrors: form.clearErrors
                                            })
                                        }
                                    }}
                                />
                                <Fade in={idx === fields.length - 1}>
                                    <IconButton
                                        onClick={onAdd}
                                        disabled={!isRowActivated}
                                        sx={{opacity: isRowActivated ? 1 : 0.6}}
                                        size='small'
                                    >
                                        <Add/>
                                    </IconButton>
                                </Fade>
                                {error && (
                                    <Box sx={{gridColumn: '2/4'}}>
                                        <Collapse in={!!error}>
                                            <InputFeedback message={error} severity='error'/>
                                        </Collapse>
                                    </Box>
                                )}
                            </Box>
                        </div>
                    )
                })}
            </Box>
        </Box>
    )
}

export default WeekTime;

