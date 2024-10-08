import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

const PasswordResetLinkSentView = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/auth/login');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Box sx={{display: 'grid', gap: 2}}>
            <Typography variant='h2' textAlign='center'>E-mail wysłany</Typography>
            <Typography variant='body1' textAlign='center'>
                Wysłaliśmy Ci wiadomość z linkiem do zresetowania hasła.
            </Typography>
            <Typography variant='caption' textAlign='center'>
                Sprawdź swoją skrzynkę mailową zajrzyj też do folderu ze spamem. Jeśli nie otrzymałeś maila, spróbuj
                ponownie.
            </Typography>
        </Box>
    )
}

export default PasswordResetLinkSentView;