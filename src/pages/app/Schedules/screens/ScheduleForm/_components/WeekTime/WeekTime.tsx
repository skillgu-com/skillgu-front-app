import React, {useCallback, memo} from 'react';
// Components
import Checkbox from '@newComponents/Checkbox/Checkbox';
// Icons
import Add from '@icons/Add';
import Trash from '../../../../components/icons/Trash';
// Styles
import styles from './WeekTime.module.scss';
import {
    Control,
    Controller,
    get,
    useFieldArray,
    UseFormClearErrors,
    UseFormGetValues, useFormState,
} from "react-hook-form";
import {Box, Collapse, Fade, IconButton} from "@mui/material";
import {addHours, addMinutes} from "date-fns";
import InputFeedback from "@newComponents/_form/InputFeedback/InputFeedback";
import ScheduleTimePicker from "../ScheduleTimePicker/ScheduleTimePicker";
import {ScheduleDateFieldT} from "../../_types/ScheduleDateField";
import {StyledScheduleDay, StyledScheduleDayRow} from "./WeekTime.styles";

type Props = {
    label: string;
    baseName: string;
    formControl: Control<any>,
    formGetValues: UseFormGetValues<any>,
    formClearErrors: UseFormClearErrors<any>,
    isRowActivated: boolean,
}


const WeekTime = ({baseName, label, formControl, formClearErrors, formGetValues, isRowActivated}: Props) => {
    const rowFormName = `${baseName}.isActivated`;

    const {errors: formErrors} = useFormState({control: formControl});

    const {fields, append, remove} = useFieldArray({
        control: formControl,
        name: `${baseName}.slots`
    })

    const onAdd = useCallback(() => {
        const previousSlotEndDate = (fields[fields.length - 1] as ScheduleDateFieldT).dateTo;
        const slotLength = formGetValues('meetingLength');
        const newDateFrom = addHours(previousSlotEndDate, 1)
        append({dateFrom: newDateFrom, dateTo: addMinutes(new Date(newDateFrom), +slotLength * 3)})
    }, [fields]);

    const onRemoveFactory = useCallback((idx: number) => () => remove(idx), []);

    const getErrorMessage = useCallback((index: number): null | string => {
        const errors = get(formErrors, `${baseName}.slots`);

        if (!errors || !errors.length) return null;

        const row = errors[index];
        if (!row) return null;

        const errorsSet = new Set();
        if (row.dateFrom) errorsSet.add(row.dateFrom.message);
        if (row.dateTo) errorsSet.add(row.dateTo.message);
        return [...errorsSet].filter(v => !!v).join(', ');
    }, [formErrors]);


    return (
        <StyledScheduleDay>
            <Box sx={{pt: {md: 2}, gridArea: 'switch'}}>
                <Controller
                    control={formControl}
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
            <Box sx={{display: 'grid', gap: 2, gridArea: 'row'}}>
                {fields.map((item, idx) => {
                    const error = getErrorMessage(idx);

                    return (
                        <StyledScheduleDayRow key={item.id}>
                            <Box sx={{gridArea: 'remove'}}>
                                <Fade in={fields.length !== 1}>
                                    <IconButton disabled={fields.length === 1} size='small'
                                                onClick={onRemoveFactory(idx)}>
                                        <Trash/>
                                    </IconButton>
                                </Fade>
                            </Box>
                            <Box sx={{display: 'grid', gap: 2, gridTemplateColumns: 'auto auto', gridArea: 'inputs'}}>
                                <ScheduleTimePicker
                                    inputProps={{error: !!error}}
                                    nameSuffix={'dateFrom'}
                                    isRowActivated={isRowActivated}
                                    label={'Od'}
                                    formControl={formControl}
                                    baseName={baseName}
                                    formClearErrors={formClearErrors}
                                    idx={idx}
                                />
                                <ScheduleTimePicker
                                    inputProps={{error: !!error}}
                                    nameSuffix={'dateTo'}
                                    isRowActivated={isRowActivated}
                                    label={'Do'}
                                    formControl={formControl}
                                    baseName={baseName}
                                    formClearErrors={formClearErrors}
                                    idx={idx}
                                />
                            </Box>
                            {idx === fields.length - 1 && isRowActivated && (
                                <Box
                                    sx={{
                                        gridArea: 'add',
                                        justifySelf: {xs: 'flex-start', sm: 'flex-start', md: 'center'},
                                        mt: {xs: 1, sm: 1, md: 0}
                                    }}
                                >
                                    <IconButton
                                        onClick={onAdd}
                                        disabled={!isRowActivated}
                                        size='small'
                                    >
                                        <Add/>
                                    </IconButton>
                                </Box>
                            )}
                            {error && (
                                <Box sx={{gridColumn: '2/4', gridArea: 'error'}}>
                                    <Collapse in={!!error}>
                                        <InputFeedback message={error} severity='error'/>
                                    </Collapse>
                                </Box>
                            )}
                        </StyledScheduleDayRow>
                    )
                })}
            </Box>
        </StyledScheduleDay>
    )
}

export default memo(WeekTime);
