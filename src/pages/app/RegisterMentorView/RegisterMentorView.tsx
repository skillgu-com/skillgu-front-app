import React from "react";
import {ThemeProvider} from "@mui/material";
import theme from "../../../styles/theme";
import {RegisterMentorProvider} from "../../../context/RegisterMentorContext";


const RegisterMentorView = () => {
    // TODO move ThemeProvider higher in components tree
    return (
        <ThemeProvider theme={theme}>
            <RegisterMentorProvider />
        </ThemeProvider>
    );
};

export default RegisterMentorView;