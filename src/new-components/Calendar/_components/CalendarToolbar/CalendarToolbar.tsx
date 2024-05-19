import React, {type FC, useCallback} from "react";
import type {ToolbarProps} from 'react-big-calendar';
import {Box, ButtonBase, ButtonProps, Typography} from "@mui/material";
import {format} from "date-fns";
import {ReactComponent as ArrowLeft} from '@icons/svg/arrow-left.svg';
import {ReactComponent as ArrowRight} from '@icons/svg/arrow-right.svg';

type Props = ToolbarProps<Event>;

const buttonProps: ButtonProps = {
    variant: 'outlined',
    size: 'small',
    sx: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'base.40',
        borderRadius: '8px',
        padding: '8px 12px'
    }
}

const CalendarToolbar: FC<Props> = ({date, onNavigate}) => {

    const onPrev = useCallback(() => onNavigate('PREV'), [onNavigate]);
    const onNext = useCallback(() => onNavigate('NEXT'), [onNavigate]);

    return (
        <Box sx={{pb: 3, display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant='body1' fontWeight={600}>{format(date, 'MMMM yyyy')}</Typography>
            <Box sx={{display: 'flex', gap: 1.5}}>
                <ButtonBase {...buttonProps} onClick={onPrev}>
                    <ArrowLeft />
                </ButtonBase>
                <ButtonBase {...buttonProps} onClick={onNext}>
                    <ArrowRight />
                </ButtonBase>
            </Box>
        </Box>
    )
};

export default CalendarToolbar;