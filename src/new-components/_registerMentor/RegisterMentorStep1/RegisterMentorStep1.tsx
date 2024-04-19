import React from 'react';
import StepContentWrapper from "@newComponents/_registerMentor/StepContentWrapper/StepContentWrapper";
import Typography from "@mui/material/Typography";
import TextLink from "@newComponents/TextLink/TextLink";
import paths from "../../../paths";

const GoToLogin = () => (
    <Typography textAlign='center' variant='body2'>Masz już konto?{' '}
        <TextLink typographyProps={{variant: 'body2'}} linkProps={{to: paths.login}}>Zaloguj się</TextLink>
    </Typography>
);

const RegisterMentorStep1 = () => {

    const goToNextStep = () => {
        console.log('goToNextStep')
    }

    return (
        <StepContentWrapper
            ctaProps={{onClick: goToNextStep}}
            title={'Zarejestruj sie jako mentor'}
            additionalActionComponent={<GoToLogin/>}
        >
            RegisterMentorStep_1
        </StepContentWrapper>
    )
}

export default RegisterMentorStep1;