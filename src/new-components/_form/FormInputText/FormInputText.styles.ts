import {styled as styledMui} from "@mui/material";

export const StyledInputWrapper = styledMui('div')(({theme}) => ({
    display: 'grid',
    gridGap: theme.spacing(1),
}))

export const StyledFeedbackWrapper = styledMui('div')(({theme}) => ({
    display: 'grid',
    gridGap: theme.spacing(1),
    marginBottom: theme.spacing(2)
}))

export const StyledFeedback = styledMui('div')(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    gridGap: theme.spacing(1),
}))

