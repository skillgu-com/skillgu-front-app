import React, { useEffect, useState } from 'react';

import {
    FormLabel,
    TextField,
    Grid,
    FormControlLabel,
    Checkbox,
    FormControl,
    Select,
    MenuItem,
} from '@mui/material';

import { getUserProfile, settingUser } from '../../../services/UserProfileService';
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '../../../component/AppLayout';
import HeroHeader from '../../../component/HeroHeader';
import ProfileImage from './ProfileImage';
import CustomButton, { buttonTypes, buttonColors } from '../../../component/CustomButton';

// Images
import forest from '../../../assets/img/forest.png';
import {MuiChipsInput} from "mui-chips-input";

const Settings = () => {
    const userSetting = useSelector((state) => state.userSetting.userSettingStep);
    const userFromRedux = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const userData = ({
        userID: userFromRedux.id,
        role: userFromRedux?.role[0],
        email: userFromRedux.email
    })

    const [firstName, setFirstName] = useState("");
    const [image, setImage] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [industry, setIndustry] = useState([]);
    const [hobby, setHobby] = useState([]);
    const [lastName, setLastName] = useState("");
    const [id, setId] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [jobPosition, setJobPosition] = useState([]);
    const [location, setLocation] = useState("");
    const [descriptionAboutMe, setDescriptionAboutMe] = useState("");
    const [phone, setPhone] = useState("");
    const [facebookURL, setFacebookURL] = useState("");
    const [instagramURL, setInstagramURL] = useState("");
    const [twitterURL, setTwitterURL] = useState("");
    const [linkedInURL, setLinkedInURL] = useState("");
    const [youtubeURL, setYoutubeURL] = useState("");
    const [timeZone, setTimeZone] = useState("");
    const [user, setUser] = useState([]);

    useEffect(() => {
        dispatch({
            type: 'STEP_FIRST_USER_SETTING',
            payload: {
                profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                industry: industry,
                hobby: hobby,
                firstName: firstName,
                lastName: lastName,
                id: userData.userID,
                oldEmail: userData.email,
                newEmail: newEmail,
                jobPosition: jobPosition,
                location: location,
                descriptionAboutMe: descriptionAboutMe,
                phone: phone,
                facebookURL: facebookURL,
                instagramURL: instagramURL,
                twitterURL: twitterURL,
                linkedInURL: linkedInURL,
                youtubeURL: youtubeURL,
                timeZone: timeZone
            }
        });
    }, [industry, hobby, firstName, lastName, userData.userID, userData.email, newEmail, jobPosition, location,
        descriptionAboutMe, phone, facebookURL, instagramURL, twitterURL, linkedInURL, youtubeURL, timeZone])


    const handleSubmit = (event) => {
        event.preventDefault();
        settingUser(userSetting).then((res) => {
        });
    };


    useEffect(() => {
        getUserProfile(userData).then((response) => {
            // setUser(response.data);
        });
    }, []);

    const handleFirstName = (event) => {
        event.preventDefault();
        setFirstName(event.target.value)
    }

    const handleImage = (event) => {
        event.preventDefault();
        setImage(event.target.value);
    }

    const handleProfileImage = (event) => {
        event.preventDefault();
        setProfileImage(event.target.value);
    }

    const handleIndustry = (event) => {
        event.preventDefault();
        setIndustry(event.target.value);
    }

    const handleHobby = (event) => {
        event.preventDefault();
        setHobby(event.target.value);
    }

    const handleLastName = (event) => {
        event.preventDefault();
        setLastName(event.target.value);
    }

    const handleId = (event) => {
        event.preventDefault();
        setId(event.target.value);
    }

    const handleOldEmail = (event) => {
        event.preventDefault();
        setOldEmail(event.target.value);
    }

    const handleNewEmail = (event) => {
        event.preventDefault();
        setNewEmail(event.target.value);
    }

    const handleJobPosition = (event) => {
        event.preventDefault();
        setJobPosition(event.target.value);
    }

    const handleLocation = (event) => {
        event.preventDefault();
        setLocation(event.target.value);
    }

    const handleDescriptionAboutMe = (event) => {
        event.preventDefault();
        setDescriptionAboutMe(event.target.value);
    }

    const handlePhone = (event) => {
        event.preventDefault();
        setPhone(event.target.value);
    }

    const handleFacebookURL = (event) => {
        event.preventDefault();
        setFacebookURL(event.target.value);
    }

    const handleInstagramURL = (event) => {
        event.preventDefault();
        setInstagramURL(event.target.value);
    }

    const handleTwitterURL = (event) => {
        event.preventDefault();
        setTwitterURL(event.target.value);
    }

    const handleLinkedInURL = (event) => {
        event.preventDefault();
        setLinkedInURL(event.target.value);
    }

    const handleYoutubeURL = (event) => {
        event.preventDefault();
        setYoutubeURL(event.target.value);
    }

    const handleTimeZone = (event) => {
        event.preventDefault();
        setTimeZone(event.target.value);
    }

    const handleUser = (event) => {
        event.preventDefault();
        setUser(event.target.value);
    }


    return (
        <AppLayout>
            <HeroHeader
                title='Twoje dane osobowe'
                image={<img src={forest} alt='las'/>}
            />
            <form className='app-settings' onSubmit={handleSubmit}>
                <h3 className='app__title'>Twoje zdjęcie</h3>
                <ProfileImage src={profileImage} changeHandler={handleImage}/>
                <hr className='line-separator'/>
                <h3 className='app__title'>Twoje dane</h3>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='name' className='field__label'>
                            Imię
                        </FormLabel>
                        <TextField
                            autoComplete='name'
                            name='name'
                            required
                            fullWidth
                            id='name'
                            placeholder='Podaj imię'
                            autoFocus
                            value={firstName}
                            onChange={handleFirstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='lastName' className='field__label'>
                            Nazwisko
                        </FormLabel>
                        <TextField
                            autoComplete='lastName'
                            name='lastName'
                            required
                            fullWidth
                            id='lastName'
                            placeholder='Podaj nazwisko'
                            autoFocus
                            value={lastName}
                            onChange={handleLastName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='newEmail' className='field__label'>
                            E-mail
                        </FormLabel>
                        <TextField
                            autoComplete='newEmail'
                            name='newEmail'
                            required
                            fullWidth
                            id='newEmail'
                            type='email'
                            placeholder='Podaj adres e-mail'
                            autoFocus
                            value={newEmail}
                            onChange={handleNewEmail}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='phone' className='field__label'>
                            Numer telefonu
                        </FormLabel>
                        <TextField
                            autoComplete='phone'
                            name='phone'
                            required
                            fullWidth
                            id='phone'
                            type='tel'
                            placeholder='Podaj numer telefonu '
                            autoFocus
                            value={phone}
                            onChange={handlePhone}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='hobby' className='field__label'>
                            Stanowisko
                        </FormLabel>
                        <FormControl fullWidth>
                            <MuiChipsInput
                                clearInputOnBlur
                                value={jobPosition}
                                onChange={handleJobPosition}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='city' className='field__label'>
                            Lokalizacja
                        </FormLabel>
                        <TextField
                            autoComplete='city'
                            name='city'
                            required
                            fullWidth
                            id='city'
                            placeholder='Wpisz miasto'
                            autoFocus
                            value={location}
                            onChange={handleLocation}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel id="about" className="field__label">
                            O mnie
                        </FormLabel>
                        <TextField
                            autoComplete="about"
                            name="about"
                            required
                            fullWidth
                            id="about"
                            placeholder="Napisz coś o sobie"
                            multiline
                            rows={2}
                            autoFocus
                            value={descriptionAboutMe}
                            onChange={handleDescriptionAboutMe}
                        />
                    </Grid>

                    {/*        <Grid item xs={12} sm={6}>*/}
                    {/*            <FormLabel id='industry' className='field__label'>*/}
                    {/*                Wybierz Branżę*/}
                    {/*            </FormLabel>*/}
                    {/*            <FormControl fullWidth>*/}
                    {/*                <MuiChipsInput value={industry} onChange={handleIndustry}/>*/}
                    {/*            </FormControl>*/}
                    {/*        </Grid>*/}
                    {/*        <Grid item xs={12} sm={6}>*/}
                    {/*            <FormLabel id='hobby' className='field__label'>*/}
                    {/*                Twoje zainteresowania*/}
                    {/*            </FormLabel>*/}
                    {/*            <FormControl fullWidth>*/}
                    {/*                <MuiChipsInput value={hobby} onChange={handleHobby}/>*/}
                    {/*            </FormControl>*/}
                    {/*        </Grid>*/}
                    <Grid item xs={12} md={6}>
                        <FormLabel id='localization' className='field__label'>
                            Strefa czasowa
                        </FormLabel>
                        <FormControl fullWidth>
                            <Select
                                labelId='localization'
                                id='localization__field'
                                required
                                displayEmpty
                                inputProps={{'aria-label': 'Without label'}}
                                value={timeZone}
                                onChange={handleTimeZone}>
                                <MenuItem value={0} disabled>
                                    Wybierz strefe czasową
                                </MenuItem>
                                <MenuItem value={'Europe/Warsaw'}>Europe/Warsaw</MenuItem>
                                <MenuItem value={'Europe/Rome'}>Europe/Rome</MenuItem>
                                <MenuItem value={'Europe/Riga'}>Europe/Riga</MenuItem>
                                <MenuItem value={'Europe/Berlin'}>Europe/Berlin</MenuItem>
                                <MenuItem value={'Europe/Amsterdam'}>Europe/Amsterdam</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox lue='isInvestor' color='primary'/>}
                            label='Chcę być promowany +.'
                        />
                    </Grid>
                </Grid>
                <hr className='line-separator'/>
                <h3 className='app__title'>Social media</h3>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='facebook' className='field__label'>
                            Facebook
                        </FormLabel>
                        <TextField
                            autoComplete='facebook'
                            name='facebook'
                            required
                            fullWidth
                            id='facebook'
                            placeholder="Podaj link do Facebook'a"
                            autoFocus
                            value={facebookURL}
                            onChange={handleFacebookURL}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='instagram' className='field__label'>
                            Instagram
                        </FormLabel>
                        <TextField
                            autoComplete='instagram'
                            name='instagram'
                            required
                            fullWidth
                            id='instagram'
                            placeholder="Podaj link do Instagram'a"
                            autoFocus
                            value={instagramURL}
                            onChange={handleInstagramURL}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='linkedin' className='field__label'>
                            LinkedIn
                        </FormLabel>
                        <TextField
                            autoComplete='linkedin'
                            name='linkedin'
                            required
                            fullWidth
                            id='linkedin'
                            placeholder="Podaj link do LinkedIn'a"
                            autoFocus
                            value={linkedInURL}
                            onChange={handleLinkedInURL}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='twitter' className='field__label'>
                            Twitter
                        </FormLabel>
                        <TextField
                            autoComplete='twitter'
                            name='twitter'
                            required
                            fullWidth
                            id='twitter'
                            placeholder="Podaj link do Twitter'a"
                            autoFocus
                            value={twitterURL}
                            onChange={handleTwitterURL}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='youtube' className='field__label'>
                            Youtube
                        </FormLabel>
                        <TextField
                            autoComplete='youtube'
                            name='youtube'
                            required
                            fullWidth
                            id='youtube'
                            placeholder="Podaj link do Yotube'a"
                            autoFocus
                            value={youtubeURL}
                            onChange={handleYoutubeURL}
                        />
                    </Grid>
                </Grid>
                <hr className='line-separator'/>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox lue='allowVisibility' color='primary'/>}
                        label='Ukryj mnie przed innymi mentorami.'
                    />
                </Grid>
                <Grid container justifyContent='flex-end' className='app-settings__btns'>
                    <CustomButton as={buttonTypes.button} color={buttonColors.transparent}>
                        Anuluj
                    </CustomButton>
                    <CustomButton as={buttonTypes.submit} color={buttonColors.primary}>
                        Zapisz zmiany
                    </CustomButton>
                </Grid>
            </form>
        </AppLayout>
    );
};

export default Settings;
