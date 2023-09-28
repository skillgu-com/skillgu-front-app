import * as React from 'react';
import TextField from '@mui/material/TextField';
import Copyright from '../../component/Copyrigth';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import CustomButton, {
    buttonTypes,
    buttonColors,
} from '../../component/CustomButton';
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContextProvider";
import {Form} from "react-bootstrap";

const LoginPage = () => {
    Form.propTypes = {children: PropTypes.node};
    const context = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        context.login(email, password);
    };

    const handlePassword = (event) => {
        event.preventDefault();
        setPassword(event.target.value)
    }

    const handleEmail = (event) => {
        event.preventDefault();
        setEmail(event.target.value)
    }



    return (
        <section className='join'>
            <div className='container d-flex align-items-center justify-content-center w-100'>
                <div className='form'>
                    <h2 className='form__title'>Zaloguj się</h2>
                    <h3 className='form__subtitle'>Zaloguj się do swojego konta.</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            type='email'
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Adres email'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            value={email}
                            onChange={handleEmail}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Hasło'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            value={password}
                            onChange={handlePassword}
                        />
                        <CustomButton
                            as={buttonTypes.submit}
                            color={buttonColors.primary}
                            classes='form__submit'>
                            Zaloguj
                        </CustomButton>
                    </form>

                    <Link className='form__link' to='/'>
                        Zapomniałeś hasła?
                    </Link>
                    <h4 className='form__cta'>Chcesz dołączyć do grona mentorów?</h4>
                    <Link className='form__link' to='/register'>
                        Utwórz konto już teraz.
                    </Link>
                    <Copyright sx={{mt: 5, mb: 4}}/>
                </div>
            </div>
        </section>
    );
};
export default LoginPage;