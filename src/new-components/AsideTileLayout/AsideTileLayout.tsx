import React from "react";
import {StyledMain, StyledContainer, StyledAside} from "@newComponents/AsideTileLayout/AsideTileLayout.styles";

type Props = {
    asideContent: React.ReactNode;
    children: React.ReactNode;
}

const AsideTileLayout: React.FC<Props> = ({ asideContent,  children}) => {

    return <StyledContainer>
        <StyledAside>{asideContent}</StyledAside>
        <StyledMain>{children}</StyledMain>
    </StyledContainer>
}

export default AsideTileLayout;