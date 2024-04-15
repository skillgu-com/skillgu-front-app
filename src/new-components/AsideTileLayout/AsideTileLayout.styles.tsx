import { styled as muiStyled } from '@mui/material/styles';

export const StyledContainer = muiStyled('div')(({ theme }) => ({
    display: 'grid',
    gap: theme.spacing(3),
    gridTemplateColumns: 'minmax(320px, 526px) 1fr',
    padding: theme.spacing(3, 0),
    height: '100vh'
}));

export const StyledAside = muiStyled('aside')(({ theme }) => ({
    background: theme.palette.secondary.main,
    borderRadius: 20,
    padding: theme.spacing(7),
}));

export const StyledMain = muiStyled('main')(({ theme }) => ({
    padding: theme.spacing(7),
}));