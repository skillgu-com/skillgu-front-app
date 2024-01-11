import React, {useEffect, useState} from 'react';

import {
    FormLabel,
    TextField,
    Grid,
    FormControlLabel,
    Checkbox,
    FormControl,
    Select,
    MenuItem, FormGroup,
} from '@mui/material';

import {getUserProfile, settingUser} from '../../../services/UserProfileService';
import {useDispatch, useSelector} from 'react-redux';

import AppLayout from '../../../component/AppLayout';
import HeroHeader from '../../../component/HeroHeader';
import ProfileImage from './ProfileImage';
import CustomButton, {buttonTypes, buttonColors} from '../../../component/CustomButton';

// Images
import forest from '../../../assets/img/forest.png';
import {MuiChipsInput} from "mui-chips-input";
import {getAllMentorCategories} from "../../../services/MentorViewService";

const Settings = () => {
    const userSetting = useSelector((state) => state.userSetting.userSettingStep);
    const userFromRedux = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);

    const userData = ({
        userID: userFromRedux.id,
        role: userFromRedux?.role,
        email: userFromRedux.email
    })


    useState(() => {
        getAllMentorCategories().then((res) => {
            setCategory(res.data)
        })
    })

    const [selectedCategories, setSelectedCategories] = useState([]);


    const [formValues, setFormValues] = useState({
        firstName: '',
        image: '',
        profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        category: [],
        hobby: [],
        lastName: '',
        id: '',
        oldEmail: '',
        newEmail: '',
        jobPosition: [],
        location: '',
        descriptionAboutMe: '',
        phone: '',
        facebookURL: '',
        instagramURL: '',
        twitterURL: '',
        linkedInURL: '',
        youtubeURL: '',
        timeZone: '',
        user: [],
        skill: []
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormValues((element) => ({
            ...element,
            [name]: value,
        }));
    };

    const handleHobbyChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleIndustryChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleJobPositionChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleSkillChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleCategories = (event) => {
        const selectedCategory = event.target.name;
        if (event.target.checked) {
            if (selectedCategories.length < 5) {
                const newSelectedCategories = [...selectedCategories, selectedCategory];
                setSelectedCategories(newSelectedCategories);

                setFormValues(prevState => ({
                    ...prevState,
                    category: newSelectedCategories
                }));
            }
        } else {
            const newSelectedCategories = selectedCategories.filter(category => category !== selectedCategory);
            setSelectedCategories(newSelectedCategories);

            setFormValues(prevState => ({
                ...prevState,
                category: newSelectedCategories
            }));
        }
    };


    useEffect(() => {
        dispatch({
            type: 'STEP_FIRST_USER_SETTING',
            payload: formValues,
        });
    }, [formValues]);

    const handleSubmit = (event) => {
        event.preventDefault();
        settingUser(userSetting).then((res) => {
        });
    };


    return (
        <AppLayout>
            <HeroHeader
                title='Twoje dane osobowe'
                image={<img src={forest} alt='las'/>}
            />
            <form className='app-settings' onSubmit={handleSubmit}>
                <h3 className='app__title'>Twoje zdjęcie</h3>
                {/* <ProfileImage src={profileImage} changeHandler={handleImage}/> */}
                <hr className='line-separator'/>
                <h3 className='app__title'>Twoje dane</h3>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='firstName' className='field__label'>
                            Imię
                        </FormLabel>
                        <TextField
                            autoComplete='name'
                            name='firstName'
                            required
                            fullWidth
                            id='firstName'
                            placeholder='Podaj imię'
                            autoFocus
                            value={formValues.firstName.value}
                            onChange={handleChange}
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
                            value={formValues.lastName.value}
                            onChange={handleChange}
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
                            value={formValues.newEmail.value}
                            onChange={handleChange}
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
                            value={formValues.phone.value}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='jobPosition' className='field__label'>
                            Twoje Stanowisko
                        </FormLabel>
                        <FormControl fullWidth>
                            <MuiChipsInput value={formValues.jobPosition}
                                           onChange={(value) => handleJobPositionChange('jobPosition', value)}
                                           placeholder={'np. Software Architect / Senior Java Developer'}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='location' className='field__label'>
                            Lokalizacja
                        </FormLabel>
                        <TextField
                            autoComplete='location'
                            name='location'
                            required
                            fullWidth
                            id='location'
                            placeholder='Wpisz miasto'
                            autoFocus
                            value={formValues.location.value}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel id="descriptionAboutMe" className="field__label">
                            O mnie
                        </FormLabel>
                        <TextField
                            autoComplete="descriptionAboutMe"
                            name="descriptionAboutMe"
                            required
                            fullWidth
                            id="descriptionAboutMe"
                            placeholder="Opisz profil"
                            multiline
                            rows={2}
                            autoFocus
                            value={formValues.descriptionAboutMe.value}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset">
                            <FormLabel id='category'>Tematy Mentoringu</FormLabel>
                            <FormGroup>
                                {category?.map((element) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedCategories.includes(element)}
                                                onChange={handleCategories}
                                                name={element}
                                                disabled={!selectedCategories.includes(element) && selectedCategories.length >= 5}
                                            />
                                        }
                                        label={element}
                                        key={element}
                                    />
                                ))}
                            </FormGroup>
                        </FormControl>
                        {/*<FormLabel id='industry' className='field__label'>*/}
                        {/*    Kategorie*/}
                        {/*</FormLabel>*/}
                        {/*<FormControl fullWidth>*/}
                        {/*    <MuiChipsInput value={formValues.industry}*/}
                        {/*                   onChange={(value) => handleIndustryChange('industry', value)}*/}
                        {/*    placeholder={'np.Przygotowanie do rozmowy rekrutacyjnej, Konsultacja ekspercka, '}/>*/}
                        {/*</FormControl>*/}
                    </Grid>
                    {/*<Grid item xs={12} sm={6}>*/}
                    {/*    <FormLabel id='hobby' className='field__label'>*/}
                    {/*        Twoje zainteresowania*/}
                    {/*    </FormLabel>*/}
                    {/*    <FormControl fullWidth>*/}
                    {/*        <MuiChipsInput clearInputOnBlur value={formValues.hobby}*/}
                    {/*                       onChange={(value) => handleHobbyChange('hobby', value)}/>*/}
                    {/*    </FormControl>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='skill' className='field__label'>
                            Umiejętności
                        </FormLabel>
                        <FormControl fullWidth>
                            <MuiChipsInput clearInputOnBlur value={formValues.skill}
                                           onChange={(value) => handleSkillChange('skill', value)}
                                           placeholder={'np. Java, JavaScript, Programowanie, Coaching'}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormLabel id='timeZone' className='field__label'>
                            Strefa czasowa
                        </FormLabel>
                        <FormControl fullWidth>
                            <Select
                                labelId='timeZone'
                                id='timeZone'
                                required
                                displayEmpty
                                inputProps={{'aria-label': 'Without label'}}
                                value={formValues.timeZone.value}
                                onChange={handleChange}>
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
                        <FormLabel id='facebookURL' className='field__label'>
                            Facebook
                        </FormLabel>
                        <TextField
                            autoComplete='facebook'
                            name='facebookURL'
                            required
                            fullWidth
                            id='facebookURL'
                            placeholder="Podaj link do Facebook'a"
                            autoFocus
                            value={formValues.facebookURL.value}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='instagramURL' className='field__label'>
                            Instagram
                        </FormLabel>
                        <TextField
                            autoComplete='instagram'
                            name='instagramURL'
                            required
                            fullWidth
                            id='instagramURL'
                            placeholder="Podaj link do Instagram'a"
                            autoFocus
                            value={formValues.instagramURL.value}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='linkedInURL' className='field__label'>
                            LinkedIn
                        </FormLabel>
                        <TextField
                            autoComplete='linkedin'
                            name='linkedInURL'
                            required
                            fullWidth
                            id='linkedInURL'
                            placeholder="Podaj link do LinkedIn'a"
                            autoFocus
                            value={formValues.linkedInURL.value}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='twitterURL' className='field__label'>
                            Twitter
                        </FormLabel>
                        <TextField
                            autoComplete='twitter'
                            name='twitterURL'
                            required
                            fullWidth
                            id='twitterURL'
                            placeholder="Podaj link do Twitter'a"
                            autoFocus
                            value={formValues.twitterURL.value}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel id='youtubeURL' className='field__label'>
                            Youtube
                        </FormLabel>
                        <TextField
                            autoComplete='youtube'
                            name='youtubeURL'
                            required
                            fullWidth
                            id='youtubeURL'
                            placeholder="Podaj link do Yotube'a"
                            autoFocus
                            value={formValues.youtubeURL.value}
                            onChange={handleChange}
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
