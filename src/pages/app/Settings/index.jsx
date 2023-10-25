import React, {useReducer, useState} from 'react';
import {
    FormLabel,
    TextField,
    Grid,
    FormControlLabel,
    Checkbox,
    TextareaAutosize,
    FormControl,
} from '@mui/material';
import {MuiChipsInput} from 'mui-chips-input';
// Components
import AppLayout from '../../../component/AppLayout';
import HeroHeader from '../../../component/HeroHeader';
import ProfileImage from './ProfileImage';
import CustomButton, {
    buttonTypes,
    buttonColors,
} from '../../../component/CustomButton';

// Images
import forest from '../../../assets/img/forest.png';
import {settingUser, updateUser} from "../../../services/UserProfileService";
import {useSelector} from "react-redux";

const SETTING_ACTIONS = {
    CHANGE_PROFILE: 'CHANGE_PROFILE',
    CHANGE_INDUSTRY: 'CHANGE_INDUSTRY',
    CHANGE_HOBBY: 'CHANGE_HOBBY',
    CHANGE_FIRST_NAME: 'CHANGE_FIRST_NAME',
    OLD_EMAIL: 'OLD_EMAIL',
    CHANGE_LAST_NAME: 'CHANGE_LAST_NAME',
    CHANGE_JOB_POSITION: 'CHANGE_JOB_POSITION',
    CHANGE_LOCATION: 'CHANGE_LOCATION',
    CHANGE_DESCRIPTION_ABOUT_ME: 'CHANGE_DESCRIPTION_ABOUT_ME',
    CHANGE_PHONE: 'CHANGE_PHONE',
    CHANGE_FACEBOOK_URL: 'CHANGE_FACEBOOK_URL',
    CHANGE_INSTAGRAM_URL: 'CHANGE_INSTAGRAM_URL',
    CHANGE_TWITTER_URL: 'CHANGE_TWITTER_URL',
    CHANGE_LINKEDIN_URL: 'CHANGE_LINKEDIN_URL',
    CHANGE_YOUTUBE_URL: 'CHANGE_YOUTUBE_URL',

};


const reducer = (state, action) => {
    switch (action.type) {
        case SETTING_ACTIONS.CHANGE_PROFILE:
            return {...state, profileImage: action.payload};
        case SETTING_ACTIONS.CHANGE_INDUSTRY:
            return {...state, industry: action.payload};
        case SETTING_ACTIONS.CHANGE_HOBBY:
            return {...state, hobby: action.payload};
        case SETTING_ACTIONS.CHANGE_FIRST_NAME:
            return {...state, firstName: action.payload}
        case SETTING_ACTIONS.OLD_EMAIL:
            return {...state, oldEmail: action.payload}
        case SETTING_ACTIONS.CHANGE_LAST_NAME:
            return {...state, lastName: action.payload}
        case SETTING_ACTIONS.CHANGE_JOB_POSITION:
            return {...state, jobPosition: action.payload}
        case SETTING_ACTIONS.CHANGE_LOCATION:
            return {...state, location: action.payload}
        case SETTING_ACTIONS.CHANGE_DESCRIPTION_ABOUT_ME:
            return {...state, descriptionAboutMe: action.payload}
        case SETTING_ACTIONS.CHANGE_PHONE:
            return {...state, phone: action.payload}
        case SETTING_ACTIONS.CHANGE_FACEBOOK_URL:
            return {...state, facebookURL: action.payload}
        case SETTING_ACTIONS.CHANGE_INSTAGRAM_URL:
            return {...state, instagramURL: action.payload}
        case SETTING_ACTIONS.CHANGE_LINKEDIN_URL:
            return {...state, linkedInURL: action.payload}
        case SETTING_ACTIONS.CHANGE_TWITTER_URL:
            return {...state, twitterURL: action.payload}
        case SETTING_ACTIONS.CHANGE_YOUTUBE_URL:
            return {...state, youtubeURL: action.payload}

        default:
            return state;
    }
};

const Settings = () => {
    const userFromRedux = useSelector((state) => state.auth.user);


    const [userSettingState, dispatch] = useReducer(reducer, {
        profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        industry: '',
        hobby: '',
        firstName: '',
        lastName: '',
        id: userFromRedux.id,
        oldEmail: userFromRedux.email,
        newEmail: '',
        jobPosition: '',
        location: '',
        descriptionAboutMe: '',
        phone: '',
        facebookURL: '',
        instagramURL: '',
        twitterURL: '',
        linkedInURL: '',
        youtubeURL: ''
    });


    const setImage = (value) =>
        dispatch({type: SETTING_ACTIONS.CHANGE_PROFILE, payload: value});

    const changeIndustry = (value) =>
        dispatch({type: SETTING_ACTIONS.CHANGE_INDUSTRY, payload: value});

    const changeHobby = (value) =>
        dispatch({type: SETTING_ACTIONS.CHANGE_HOBBY, payload: value});

    const changeFirstName = (value) => {
        dispatch({type: SETTING_ACTIONS.CHANGE_FIRST_NAME, payload: value.target.value});
    }
    const changeNewEmail = (value) => {
        dispatch({type: SETTING_ACTIONS.CHANGE_NEW_EMAIL, payload: value.target.value});
    }
    const changeLastName = (value) => {
        dispatch({type: SETTING_ACTIONS.CHANGE_LAST_NAME, payload: value.target.value});
    }
    const changeJobPosition = (value) => {
        dispatch({type: SETTING_ACTIONS.CHANGE_JOB_POSITION, payload: value.target.value});
    }
    const changeLocation = (value) => {
        dispatch({type: SETTING_ACTIONS.CHANGE_LOCATION, payload: value.target.value});
    }
    const changeDescriptionAboutMe = (value) => {
        dispatch({type: SETTING_ACTIONS.CHANGE_DESCRIPTION_ABOUT_ME, payload: value.target.value});
    }
    const changePhone = (value) => {
        dispatch({type: SETTING_ACTIONS.CHANGE_PHONE, payload: value.target.value});
    }
    const changeFacebookURL = (value) => {
        dispatch({type: SETTING_ACTIONS.CHANGE_FACEBOOK_URL, payload: value.target.value});
    }
    const changeInstagramURL = (value) => {
        dispatch({type: SETTING_ACTIONS.CHANGE_INSTAGRAM_URL, payload: value.target.value});
    }
    const changeLinkedInURL = (value) => {
        dispatch({type: SETTING_ACTIONS.CHANGE_LINKEDIN_URL, payload: value.target.value});
    }
    const changeTwitterURL = (value) => {
        dispatch({type: SETTING_ACTIONS.CHANGE_TWITTER_URL, payload: value.target.value});
    }
    const changeYoutubeURL = (value) => {
        dispatch({type: SETTING_ACTIONS.CHANGE_YOUTUBE_URL, payload: value.target.value});
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        settingUser(userSettingState);
    };


    return (
        <AppLayout>
            <HeroHeader
                title='Twoje dane osobowe'
                image={<img src={forest} alt='las'/>}
            />
            <form className='app-settings' onSubmit={handleSubmit}>
                <h3 className='app__title'>Twoje zdjęcie</h3>
                <ProfileImage src={userSettingState.profileImage} changeHandler={setImage}/>
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
                            value={userSettingState.firstName.value}
                            onChange={changeFirstName}
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
                            value={userSettingState.lastName.value}
                            onChange={changeLastName}
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
                            value={userSettingState.newEmail.value}
                            onChange={changeNewEmail}
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
                            value={userSettingState.phone.value}
                            onChange={changePhone}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='position' className='field__label'>
                            Stanowisko
                        </FormLabel>
                        <TextField
                            autoComplete='position'
                            name='position'
                            required
                            fullWidth
                            id='position'
                            placeholder='Wpisz nazwę stanowiska np. CEO'
                            autoFocus
                            value={userSettingState.jobPosition.value}
                            onChange={changeJobPosition}
                        />
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
                            value={userSettingState.location.value}
                            onChange={changeLocation}
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
                            value={userSettingState.descriptionAboutMe.value}
                            onChange={changeDescriptionAboutMe}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormLabel id='industry' className='field__label'>
                            Wybierz Branżę
                        </FormLabel>
                        <FormControl fullWidth>
                            <MuiChipsInput value={userSettingState.industry} onChange={changeIndustry}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='hobby' className='field__label'>
                            Twoje zainteresowania
                        </FormLabel>
                        <FormControl fullWidth>
                            <MuiChipsInput value={userSettingState.hobby} onChange={changeHobby}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox lue='isInvestor' color='primary'/>}
                            label='Chcę być widoczny jako inwestor.'
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
                            value={userSettingState.facebookURL}
                            onChange={changeFacebookURL}
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
                            value={userSettingState.instagramURL}
                            onChange={changeInstagramURL}
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
                            value={userSettingState.linkedInURL}
                            onChange={changeLinkedInURL}
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
                            value={userSettingState.twitterURL}
                            onChange={changeTwitterURL}
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
                            value={userSettingState.youtubeURL}
                            onChange={changeYoutubeURL}
                        />
                    </Grid>
                </Grid>
                <hr className='line-separator'/>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox lue='allowVisibility' color='primary'/>}
                        label='Ukryj dane przed nieznajomymi.'
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
