import React, {FC, ReactNode} from "react";
import {ReactComponent as SkillGuruLogo} from '@icons/svg/logo_skillguru-dark.svg';
import {StyledCard, StyledContainer, StyledLogo} from "./AuthLayout.styles";


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