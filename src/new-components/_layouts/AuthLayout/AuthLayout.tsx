import React, {FC, ReactNode} from "react";
import {StyledContainer, StyledLogo, StyledCard} from "@newComponents/_layouts/AuthLayout/AuthLayout.styles";
import {ReactComponent as SkillGuruLogo} from '@icons/svg/logo_skillguru-dark.svg';


type Props = {
    children: ReactNode
}

const AuthLayout: FC<Props> = ({children}) => {


    return (
        <StyledContainer>
            <StyledLogo as={SkillGuruLogo}/>
            <StyledCard>
                {children}
            </StyledCard>
        </StyledContainer>
    );
}

export default AuthLayout;