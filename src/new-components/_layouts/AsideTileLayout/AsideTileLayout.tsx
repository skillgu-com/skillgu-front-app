import React from "react";
import {StyledMain, StyledContainer, StyledAside} from "@newComponents/_layouts/AsideTileLayout/AsideTileLayout.styles";
import {Container, Theme, useMediaQuery} from "@mui/material";

type Props = {
    asideContent: React.ReactNode;
    children: React.ReactNode;
}

const AsideTileLayout: React.FC<Props> = ({asideContent, children}) => {
    const isMD = useMediaQuery((theme) => (theme as Theme).breakpoints.down('md'));

    return (
        <Container maxWidth='xl' disableGutters={isMD} >
            <StyledContainer>
                <StyledAside>{asideContent}</StyledAside>
                <StyledMain>{children}</StyledMain>
            </StyledContainer>
        </Container>
    )
}

export default AsideTileLayout;