import React from "react";
import {Container, ThemeProvider} from "@mui/material";
import AsideTileLayout from "@newComponents/AsideTileLayout/AsideTileLayout";
import theme from "../../../styles/theme";
import useUrlStepper from "../../../hooks/useUrlStepper";
import RegisterMentorStepperNavigation
    from "@newComponents/_registerMentor/RegisterMentorStepperNavigation/RegisterMentorStepperNavigation";
import RegisterMentorStep1 from "@newComponents/_registerMentor/RegisterMentorStep1/RegisterMentorStep1";
import RegisterMentorStep2 from "@newComponents/_registerMentor/RegisterMentorStep2/RegisterMentorStep2";
import RegisterMentorStep3 from "@newComponents/_registerMentor/RegisterMentorStep3/RegisterMentorStep3";
import RegisterMentorStep4 from "@newComponents/_registerMentor/RegisterMentorStep4/RegisterMentorStep4";
import RegisterMentorStep5 from "@newComponents/_registerMentor/RegisterMentorStep5/RegisterMentorStep5";

const resolveStepView = (step: number) => {
    switch (step) {
        case 1:
            return <RegisterMentorStep1/>;
        case 2:
            return <RegisterMentorStep2/>;
        case 3:
            return <RegisterMentorStep3/>;
        case 4:
            return <RegisterMentorStep4/>;
        case 5:
            return <RegisterMentorStep5/>;
        default:
            return <RegisterMentorStep1/>;
    }
}

const RegisterMentorView = () => {
    const {step} = useUrlStepper({stepLimit: 3});

    // TODO move ThemeProvider higher in components tree
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth={'xl'} >
                <AsideTileLayout asideContent={<RegisterMentorStepperNavigation/>}>
                    {resolveStepView(step)}
                </AsideTileLayout>
            </Container>
        </ThemeProvider>
    );
};

export default RegisterMentorView;