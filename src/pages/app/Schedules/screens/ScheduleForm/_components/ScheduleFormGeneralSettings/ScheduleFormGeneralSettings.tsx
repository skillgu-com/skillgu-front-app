import React, {FC, memo} from "react";
import {Box, Collapse} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import {Control, Controller, FormState, UseFormWatch} from "react-hook-form";
import StepInput from "@newComponents/StepInput/StepInput";
import MeetingType from "../../../../components/MeetingType/MeetingType";
import Checkbox from "@newComponents/Checkbox/Checkbox";
import styles from "../../ScheduleForm.module.scss";
import FormDatePicker from "@newComponents/_form/FormDatePicker/FormDatePicker";
import {isAfter, isBefore} from "date-fns";

type Props = {
    formControl: Control<any>,
    formState: FormState<any>,
    formWatch: UseFormWatch<any>,
};

const ScheduleFormGeneralSettings: FC<Props> = ({formControl, formState, formWatch}) => {
    const selectedType = formWatch('type');

    return (
        <>
            <Box sx={{display: 'grid', gap: 1}}>
                <Typography variant='buttonMd'>Nazwa</Typography>
                <FormInputText
                    name='name'
                    control={formControl}
                    formState={formState}
                    inputProps={{placeholder: 'Nazwa harmonogramu'}}
                    controllerProps={{rules: {required: 'To pole jest wymagane'}}}
                />
            </Box>

            <Controller
                control={formControl}
                name='meetingLength'
                render={({field}) => (
                    <StepInput
                        minValue={15}
                        maxValue={120}
                        step={15}
                        measure='min'
                        label='Długość spotkania'
                        {...field}
                    />
                )}
            />

            <Controller
                control={formControl}
                name='type'
                render={({field}) => (
                    <MeetingType
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />

            <Collapse in={selectedType === 'group'}>
                <Controller
                    control={formControl}
                    name='participantsNumber'
                    render={({field}) => (
                        <StepInput
                            minValue={1}
                            maxValue={5}
                            step={1}
                            label='Ilość uczestników'
                            {...field}
                        />
                    )}
                />
            </Collapse>
            <Controller
                control={formControl}
                name='cancelAvailable'
                render={({field}) => (
                    <Checkbox
                        id='cancelAvailable'
                        slide
                        label='Możliwość odwołania spotkania przez klienta'
                        name={field.name}
                        valueChangeHandler={(_, {value}) => field.onChange(value)}
                        value={field.value}

                    />
                )}
            />
            <div>
                <Typography variant='buttonMd' className={styles.fieldText}>Okres obowiązywania</Typography>
                <div className={styles.date}>
                    <FormDatePicker
                        formState={formState}
                        name='dateFrom'
                        control={formControl}
                        controllerProps={{
                            rules: {
                                required: 'To pole jest wymagane',
                                validate: (value, formValues) => {
                                    const dateTo = formValues.dateTo;
                                    if (!dateTo) return true;
                                    return isBefore(value, dateTo) || 'Data początkowa musi być wcześniejsza niż końcowa';
                                }
                            }
                        }}
                    />
                    <FormDatePicker
                        formState={formState}
                        name='dateTo'
                        control={formControl}
                        controllerProps={{
                            rules: {
                                required: 'To pole jest wymagane',
                                validate: (value, formValues) => {
                                    const dateFrom = formValues.dateFrom;
                                    if (!dateFrom) return true;
                                    return isAfter(value, dateFrom) || 'Data końcowa musi być późniejsza niż początkowa';
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </>
    )
};

export default memo(ScheduleFormGeneralSettings);