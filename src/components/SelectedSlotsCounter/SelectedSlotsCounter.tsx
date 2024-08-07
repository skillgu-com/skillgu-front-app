import React, {FC, useMemo} from 'react';
import Box from "@mui/material/Box";
import {format} from "date-fns";
import Typography from "@mui/material/Typography";
import {alpha, Chip, ChipProps, styled as styledMui, useTheme} from "@mui/material";

type Props = {
    slotsToSelect: number;
    selectedSlots: Date[];
};

const extractDate = (date: Date) => {
    const day = format(date, 'dd.MM.yyyy');
    const time = format(date, 'HH:mm');

    return {day, time}
}

const SelectedSlotsCounter: FC<Props> = ({selectedSlots, slotsToSelect}) => {
    const theme = useTheme();
    const chipProps: ChipProps = useMemo(() => ({
        sx: {backgroundColor: alpha(theme.palette.primary.main, .09)},
        variant: 'outlined',
        color: 'primary',
    }), [theme]);

    return (
        <Box sx={{
            padding: 2,
            border: `1px solid ${theme.palette.base[40]}`,
            borderRadius: theme.shape.borderRadius,
        }}>
            <Typography variant='buttonLg'>Wybrane terminy</Typography>
            <Box sx={{display: 'grid', gap: 1.5, mt: 1.5 }}>
                {Array(slotsToSelect).fill('').map((_, idx) => {
                    const selectedSlot = selectedSlots[idx];
                    if (selectedSlot) {
                        const {day, time} = extractDate(selectedSlot);
                        return (
                            <Box sx={{display: 'flex', gap: 2}}>
                                <Chip label={day}  {...chipProps} />
                                <Chip label={time} {...chipProps} />
                            </Box>
                        )
                    }
                    return <Box sx={{ opacity: 0.55 }}><Chip label='Wybierz termin' {...chipProps} /></Box>
                })}
            </Box>
        </Box>
    )
}

export default SelectedSlotsCounter;