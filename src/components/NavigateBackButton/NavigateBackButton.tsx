import React, {FC, useMemo} from "react";
import {Path, useNavigate} from "react-router-dom";
import {ButtonBase} from "@mui/material";
import Arrow from "@icons/Arrow";
import {styled as styledMui} from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = {
    label?: string;
    customTarget?: string | Path;
}

const StyledButton = styledMui(ButtonBase)(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    width: 'fit-content',
    backgroundColor: theme.palette.background.default,
    borderRadius: '8px',
    border: `1px solid ${theme.palette.base[40]}`,

    '& svg': {
        transform: 'rotate(180deg)',
    },
}));

const StyledLabel = styledMui(Typography)(({theme}) => ({
    fontWeight: 500,
    color: theme.palette.base[80],
}));


const NavigateBackButton: FC<Props> = ({label, customTarget}) => {
    const navigate = useNavigate();
    const navigateBack = () => navigate(-1);
    const navigateTo = useMemo(() => {
        if (!customTarget) return null;
        return () => navigate(customTarget)
    }, [customTarget, navigate]);

    return (
        <StyledButton onClick={navigateTo || navigateBack}>
            <Arrow/>
            <StyledLabel variant='buttonMd'>
                {label || 'Powrót do poprzedniego ekranu'}
            </StyledLabel>
        </StyledButton>
    );
};

export default NavigateBackButton;