import BlockedScreen from "../../../../component/BlockedScreen";
import {Button, FormLabel, Grid, TextField} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {validation} from "../../../../helpers/validation";
import {updateFifthStep, updateThirdStep} from "../../../../services/PitchDeckCreationService";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import {sliderConfig} from "../../../../config/slider";
import Card from "../../../../component/Card";


const StepFifth = ({pitchDeckUniqueToken, unlockedStep5,setUnlockedStep6}) => {

    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [ytMovieUrl, setYtMovieUrl] = useState("");
    const [file, setFile] = useState(null);
    const [presentation, setPresentation] = useState(null);
    const [presentationFiles, setPresentationFiles] = useState([]);
    const [files, setFiles] = useState([]);
    const [changeValueHandler, setChangeValueHandler] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeePosition, setEmployeePosition] = useState('');
    const [employeePicture, setEmployeePicture] = useState(null);


    // funkcjonalnosc ktora przechowuje nam wartosci miedzy cyklami renderowania
    const fifthStepLastData = useRef({
        pitchDeckUniqueToken,
        email,
        phoneNumber,
        ytMovieUrl
    });

    const fifthStepChanged = () => {
        return fifthStepLastData.current.pitchDeckUniqueToken !== pitchDeckUniqueToken
            || fifthStepLastData.current.email !== email
            || fifthStepLastData.current.phoneNumber !== phoneNumber
            || fifthStepLastData.current.ytMovieUrl !== ytMovieUrl

    }

    const emailChange = (event) => {
        setEmail(event.target.value);
    }

    const phoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const ytMovieUrlChange = (event) => {
        setYtMovieUrl(event.target.value);
    }

    const _validateStep5 = () => {
        return validation('email', email) && validation('phoneNumber', phoneNumber) && validation('ytMovieUrl', ytMovieUrl)
    }

    const _validateAndUpdateStep5 = () => {
        if (_validateStep5() && fifthStepChanged()) {
            fifthStepLastData.current = {
                email: email,
                phoneNumber: phoneNumber,
                ytMovieUrl: ytMovieUrl
            }
            updateFifthStep(pitchDeckUniqueToken.value, email, phoneNumber, ytMovieUrl)
                .then(response => {
                })
                .catch()
        }
    }

    // const addPresentationHandler = (presentation) => {
    //     changeValueHandler({
    //         target: {
    //             name: 'presentationFiles',
    //             value: [...presentationFiles, presentation],
    //         },
    //     });
    //     setPresentation(null)
    // };

    // useEffect(() => {
    //     !!file && addFileHandler(file);
    // }, [file]);
    //
    // useEffect(() => {
    //     !!presentation && addPresentationHandler(presentation);
    // }, [presentation]);

    // const onBlur = () => {
    //     _validateAndUpdateStep5();
    // }

    // const handleAddEmployee = (e) => {
    //     e.preventDefault();
    //     changeValueHandler({
    //         target: {
    //             name: 'employees',
    //             value: [
    //                 ...employees,
    //                 {name: employeeName, position: employeePosition, picture: employeePicture},
    //             ],
    //         },
    //     });
    //
    //     setEmployeeName('');
    //     setEmployeePosition('');
    //     setEmployeePicture(null);
    // };


    const addFileHandler = (file) => {
        changeValueHandler({
            target: {
                name: 'files',
                value: [...files, file],
            },
        });
        setFile(null)
    };

    useEffect(() => {
        _validateAndUpdateStep5()
        if (phoneNumber && email && ytMovieUrl) {
            setUnlockedStep6(true);
        } else {
            setUnlockedStep6(false);
        }
    }, [phoneNumber , email, ytMovieUrl]);


    return <Grid position={'relative'} container spacing={2}>
        {!unlockedStep5 && <BlockedScreen/>}
        <Grid item xs={12} sm={6}>
            <FormLabel id='personal-data' className='field__label'>
                Telefon
            </FormLabel>
            <TextField
                autoComplete='given-name'
                name='phoneNumber'
                required
                fullWidth
                id='personal-data'
                placeholder='+48 123 456 789'
                autoFocus
                value={phoneNumber}
                onChange={phoneNumberChange}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormLabel id='position' className='field__label'>
                E-mail
            </FormLabel>
            <TextField
                autoComplete='given-name'
                name='email'
                required
                fullWidth
                id='position'
                placeholder='email@email.com'
                autoFocus
                value={email}
                onChange={emailChange}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormLabel id='model' className='field__label'>
                Dodaj link do filmu promocyjnego
            </FormLabel>
            <TextField
                autoComplete='given-name'
                name='movie'
                fullWidth
                id='movie'
                value={ytMovieUrl}
                onChange={ytMovieUrlChange}
                placeholder='https://www.youtube.com/'
                autoFocus
            />
        </Grid>

        <Grid item xs={12}>
            <FormLabel id='docs' className='field__label'>
                Dodaj dokumenty projektowe
            </FormLabel>
            <Button variant='contained' component='label' className='bg--primary'>
                Upload File
                <input type='file' hidden onChange={(e) => setFile(e.target.files[0])}/>
            </Button>
        </Grid>

        {!!files.length && (
            <Grid item xs={12}>
                <Splide options={sliderConfig} className='app-slider'>
                    {files?.map((file) => (
                        <SplideSlide>
                            <Card
                                type='download'
                                title={file.name}
                                subtitle={Math.floor(file.size * 0.0009765625, -3) + 'MB'}
                                image='https://icon-library.com/images/free-icon-file/free-icon-file-29.jpg'
                                classes='col-12 col-sm-6 col-lg-4'
                            />
                        </SplideSlide>
                    ))}
                </Splide>F
            </Grid>
        )}

        <Grid item xs={12}>
            <FormLabel id='presentation' className='field__label' disabled={true}>
                Dodaj zdjęcia do prezentacji
            </FormLabel>
            <Button variant='contained' component='label' className='bg--primary'>
                Upload File
                <input type='file' hidden onChange={e => setPresentation(e.target.files[0])}/>
            </Button>
        </Grid>
        <Grid item xs={12}>
            {!!presentationFiles.length && (
                <Grid item xs={12}>
                    <Splide options={sliderConfig} className='app-slider'>
                        {presentationFiles?.map((file) => (
                            <SplideSlide>
                                <Card
                                    type='download'
                                    title={file.name}
                                    subtitle={Math.floor(file.size * 0.0009765625, -3) + 'MB'}
                                    image='https://icon-library.com/images/free-icon-file/free-icon-file-29.jpg'
                                    classes='col-12 col-sm-6 col-lg-4'
                                />
                            </SplideSlide>
                        ))}
                    </Splide>
                </Grid>
            )}
        </Grid>
    </Grid>
}

export default StepFifth;