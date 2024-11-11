import React, {FC, useMemo} from 'react';
import Box from "@mui/material/Box";
import {format} from "date-fns";
import Typography from "@mui/material/Typography";
import {alpha, Chip, ChipProps, Collapse, useTheme} from "@mui/material";
import {StyledFeedbackWrapper} from "../_form/FormInputSwitcher/FormInputSwitcher.styles";
import InputFeedback from "../_form/InputFeedback/InputFeedback";

type Props = {
    slotsToSelect: number;
    selectedSlots: Date[];
    errorMessage?: string;
};

const extractDate = (date: Date) => {
    const day = format(date, 'dd.MM.yyyy');
    const time = format(date, 'HH:mm');

    return {day, time}
}

const SelectedSlotsCounter: FC<Props> = ({selectedSlots, slotsToSelect, errorMessage}) => {
    const theme = useTheme();
    const chipProps: ChipProps = useMemo(() => ({
        sx: {backgroundColor: alpha(theme.palette.primary.main, .09)},
        variant: 'outlined',
        color: 'primary',
    }), [theme]);

    return (
        <>
            <Box sx={{
                padding: 2,
                border: !!errorMessage ? `1px solid ${theme.palette.error.main}` : `1px solid ${theme.palette.base[40]}`,
                boxShadow: !!errorMessage ? `0px 0px 0px 1px ${theme.palette.error.main} inset` : 'none',
                borderRadius: theme.shape.borderRadius,
            }}>
                <Typography variant='buttonLg'>Wybrane terminy</Typography>
                <Box sx={{display: 'grid', gap: 1.5, mt: 1.5}}>
                    {Array(slotsToSelect).fill('').map((_, idx) => {
                        const selectedSlot = selectedSlots[idx];
                        if (selectedSlot) {
                            const {day, time} = extractDate(selectedSlot);
                            return (
                              <Box key={idx} sx={{ display: "flex", gap: 2 }}>
                                <Chip
                                  label={day}
                                  {...chipProps}
                                  style={{ width: "110px" }}
                                />
                                <Chip
                                  label={time}
                                  {...chipProps}
                                  style={{ width: "78px" }}
                                />
                              </Box>
                            );
                        }
                        return <Box sx={{opacity: 0.55}}><Chip
                            label='Wybierz termin w kalendarzu' {...chipProps} /></Box>
                    })}
                </Box>
            </Box>
            <Collapse in={!!errorMessage}>
                <StyledFeedbackWrapper>
                    {errorMessage && <InputFeedback message={errorMessage} severity='error'/>}
                </StyledFeedbackWrapper>
            </Collapse>
        </>
    )
}

export default SelectedSlotsCounter;