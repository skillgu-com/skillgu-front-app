import React from "react";
import {LinkProps} from "react-router-dom";
import {PathValue} from "../../paths";
import StyledTextLink from "@newComponents/TextLink/TextLink.styles";
import Typography, {TypographyProps} from "@mui/material/Typography";

type Props = {
    linkProps: Omit<LinkProps, 'children'> & {
        to: PathValue
    },
    typographyProps?: TypographyProps,
    children: React.ReactNode,
}

const TextLink: React.FC<Props> = ({children, linkProps, typographyProps = {}}) => {
    return (
        <Typography component='span' {...typographyProps}>
            <StyledTextLink {...linkProps}>
                {children}
            </StyledTextLink>
        </Typography>
    )
}

export default TextLink;