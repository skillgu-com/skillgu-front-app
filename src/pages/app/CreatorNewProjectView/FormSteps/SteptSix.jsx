import BlockedScreen from "../../../../component/BlockedScreen";
import {Button, FormControl, FormLabel, Grid, MenuItem, Select, TextField} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {validation} from "../../../../helpers/validation";
import {updateFourStep, updateSecondStep, updateSixStep} from "../../../../services/PitchDeckCreationService";
import CustomButton, {buttonColors} from "../../../../component/CustomButton";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import {sliderConfig} from "../../../../config/slider";
import Card from "../../../../component/Card";

const StepTwo = ({pitchDeckUniqueToken, unlockedStep6}) => {

    const [employeeName, setEmployeeName] = useState('');
    const [employeePosition, setEmployeePosition] = useState('');
    const [employeePicture, setEmployeePicture] = useState(null);
    const [employees, setEmployees] = useState([]);

    const sixStepLastData = useRef({

    });

    const sixStepChanged = () => {
        return sixStepLastData.current.employeeName !== employeeName
            || sixStepLastData.current.employeePosition !== employeePosition
            || sixStepLastData.current.employeePicture !== employeePicture

    }


    const handleAddEmployee = (event) => {
        setEmployees(event.target.value);
    }

    const handleEmployeeName = (event) => {
        setEmployeeName(event.target.value);
    }

    const handleEmployeePosition = (event) => {
        setEmployeePosition(event.target.value);
    }


    const _validateStep6 = () => {
        if (validation('employeeName', employeeName) &&
            validation('employeePosition', employeePosition) &&
            validation('employeePicture', employeePicture)) {
            return true;
        }
        return false;
    }

    const _validateAndUpdateStep6 = () => {
        // if (_validateStep6() && sixStepChanged()) {
        //     sixStepLastData.current = {
        //         pitchDeckUniqueToken: pitchDeckUniqueToken,
        //         employeeName:employeeName,
        //         employeePosition:employeePosition,
        //         employeePicture:employeePicture
        //     }
        //     updateSixStep(pitchDeckUniqueToken.value, employeeName,employeePosition,employeePicture)
        //         .then(response => {
        //         })
        //         .catch()
        // }
    }

    useEffect(() => {
        if (_validateStep6()) {
            _validateAndUpdateStep6()
        } else {

        }
    }, [employeeName,employeePosition]);


    return   <Grid position={'relative'} container spacing={2}>
        {!unlockedStep6 && <BlockedScreen/>}
        <Grid item xs={12}>
            <h3>Dodaj pracowników</h3>
        </Grid>
        <Grid item xs={12} marginTop={3}>
            <FormLabel id='presentation' className='field__label'>
                Zdjęcie
            </FormLabel>
            <Button variant='contained' component='label' className='bg--primary'>
                Upload File
                <input
                    type='file'
                    hidden
                    onChange={(e) => setEmployeePicture(e.target.files[0])}
                />
            </Button>
            <p style={{marginTop: '10px'}}>{employeePicture?.name}</p>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormLabel id='personal-data' className='field__label'>
                Imię i Nazwisko
            </FormLabel>
            <TextField
                autoComplete='given-name'
                name='employeeName'
                required
                fullWidth
                id='personal-data'
                placeholder='Jan
					Kowalski'
                autoFocus
                value={employeeName}
                onChange={handleEmployeeName}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormLabel id='position' className='field__label'>
                Stanowisko
            </FormLabel>
            <TextField
                autoComplete='given-name'
                name='role'
                required
                fullWidth
                id='employeePosition'
                placeholder='Programista'
                autoFocus
                value={employeePosition}
                onChange={handleEmployeePosition}
            />
        </Grid>
        <CustomButton
            classes='pitchdeck__form-btn'
            color={buttonColors.transparent}
            _onClick={handleAddEmployee}
            as={'button'}
            disabled={!employeeName && !employeePosition}>
            Dodaj następnego
        </CustomButton>
        <Grid item xs={12}>
            {!!employees.length && (
                <Splide options={sliderConfig} className='app-slider'>
                    {employees.map(({name, position, picture}) => (
                        <SplideSlide>
                            <Card
                                type='employee'
                                // title={pitchDeck.businessModelDescription}
                                title={name}
                                subtitle={position}
                                image={
                                    picture
                                        ? URL.createObjectURL(picture)
                                        : 'https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg'
                                }
                                classes='col-12 col-sm-6 col-lg-4'
                            />
                        </SplideSlide>
                    ))}
                </Splide>
            )}
        </Grid>
    </Grid>
}


export default StepTwo;