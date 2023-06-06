import React, {useContext, useState} from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import {GitHub} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import CustomButton, {
    buttonTypes,
    buttonColors,
} from '../../component/CustomButton';
import Copyright from '../../component/Copyrigth';
import PropTypes from "prop-types";
import {AuthContext} from "../../context/AuthContextProvider";
import {Form} from "react-bootstrap";

function RegisterPage() {

    Form.propTypes = {children: PropTypes.node};
    const context = useContext(AuthContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreement, setAgreement] = useState(false);
    const [industry, setIndustry] = useState("");

    const handleFirstName = (event) => {
        event.preventDefault();
        setFirstName(event.target.value)
    }
    const handleLastName = (event) => {
        event.preventDefault();
        setLastName(event.target.value)
    }
    const handleEmail = (event) => {
        event.preventDefault();
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        event.preventDefault();
        setPassword(event.target.value)
    }

    const handleIndustry = (event) => {
        event.preventDefault();
        setIndustry(event.target.value)
    }

    const handleAgreementConfirmation = (event) => {
        setAgreement(event.target.checked);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        context.register(firstName, lastName, industry, email, password, agreement)
    };

    return (
        <section className='join'>
            <div className='container d-flex align-items-center justify-content-center w-100'>
                <div className='form'>
                    <h2 className='form__title'>Rejestracja</h2>
                    <h3 className='form__subtitle'>
                        Utwórz darmowe konto i zacznij inwestować.
                    </h3>
                    <form className='form__container' onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='given-name'
                                    name='firstName'
                                    required
                                    fullWidth
                                    id='firstName'
                                    label='Imię'
                                    autoFocus
                                    value={firstName}
                                    onChange={handleFirstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id='lastName'
                                    label='Nazwisko'
                                    name='lastName'
                                    autoComplete='family-name'
                                    value={lastName}
                                    onChange={handleLastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email'
                                    name='email'
                                    autoComplete='email'
                                    value={email}
                                    onChange={handleEmail}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name='password'
                                    label='Hasło'
                                    type='password'
                                    id='password'
                                    autoComplete='new-password'
                                    value={password}
                                    onChange={handlePassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth name='industry' label='Branża' id='industry'
                                           value={industry}
                                           onChange={handleIndustry}/>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox
                                        value={agreement}
                                        onChange={handleAgreementConfirmation}
                                        color='primary' id="agreement"
                                    />}
                                    label='Zapoznałem się z regulaminem i go akceptuje.'
                                />
                            </Grid>

                        </Grid>
                        <CustomButton
                            as={buttonTypes.submit}
                            color={buttonColors.primary}
                            disabled={!agreement}
                            classes='form__submit'>
                            Zarejestruj się
                        </CustomButton>
                    </form>
                    <CustomButton
                        as={buttonTypes.button}
                        color={buttonColors.transparent}
                        classes='form__github-btn d-flex align-items-center justify-content-center'>
                        <GitHub sx={{mr: 1}}/> Zarejestruj się za pomocą GitHuba
                    </CustomButton>
                    <p>
                        Masz już konto ?{' '}
                        <Link className='form__link' to='/login'>
                            Zaloguj się
                        </Link>
                    </p>
                    <Copyright sx={{mt: 5, mb: 4}}/>
                </div>
            </div>
        </section>
    );
}

export default RegisterPage;