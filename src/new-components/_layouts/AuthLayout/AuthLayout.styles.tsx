import {styled as muiStyled} from "@mui/material";

export const StyledContainer = muiStyled('div')(({theme}) => ({
    padding: theme.spacing(15, 0),
    position: 'relative',
    minHeight: ['100vh', '100dvh'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.base['10'],

    [theme.breakpoints.down('sm')]: {
        background: theme.palette.base['0'],
    },
}))

export const StyledLogo = muiStyled('div')(({theme}) => ({
    position: 'absolute',
    top: theme.spacing(5),
    left: '50%',
    transform: 'translateX(-50%)',
}));

export const StyledCard = muiStyled('div')(({theme}) => ({
    width: '100%',
    maxWidth: '462px',
    background: 'red',
    padding: theme.spacing(4, 3),
    border: `1px solid ${theme.palette.base['20']}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.base['0'],

    [theme.breakpoints.down('sm')]: {
        border: 'none',
    },
}));