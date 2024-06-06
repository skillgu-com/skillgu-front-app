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
import {addHours, addMinutes } from "date-fns";
import InputFeedback from "@newComponents/_form/InputFeedback/InputFeedback";
import ScheduleTimePicker from "../ScheduleTimePicker/ScheduleTimePicker";
import {ScheduleDateFieldT} from "../../_types/ScheduleDateField";

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

    const { errors: formErrors } = useFormState({ control: formControl });

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
        <Box sx={{display: 'grid', gap: 1, gridTemplateColumns: '70px 1fr'}}>
            <Box sx={{pt: 2}}>
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
            <Box sx={{display: 'grid', gap: 2}}>
                {fields.map((item, idx) => {
                    const error = getErrorMessage(idx);

                    return (
                        <div key={item.id}>
                            <Box sx={{display: 'grid', gridTemplateColumns: '60px auto auto 60px', gap: 2}}>
                                <Fade in={fields.length !== 1}>
                                    <IconButton disabled={fields.length === 1} size='small' onClick={onRemoveFactory(idx)}>
                                        <Trash/>
                                    </IconButton>
                                </Fade>
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

export default memo(WeekTime);

