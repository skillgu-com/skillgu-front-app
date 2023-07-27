import {FormLabel, Grid, TextField} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {validation} from "../../../../helpers/validation";
import {existValidatePitchDeckURL} from "../../../../services/ValidationService";
import {createFirstStep, updateFirstStep} from "../../../../services/PitchDeckCreationService";

const StepOne = ({
                     unlockedStep2,
                     setUnlockedStep2,
                     pitchDeckUniqueToken,
                     setFieldValue,
                     setIsNextStepDisabled,
                     setPitchDeckUrl
                 }) => {


    const [projectTitle, setProjectTitle] = useState("");
    const [uniqueProjectName, setUniqueProjectName] = useState("");
    const [loading, setLoading] = useState(false);

    const firstStepLastData = useRef({projectTitle, uniqueProjectName: uniqueProjectName});

    const isAvailablePitchDeckURL = (onSuccess, onFailure) => {
        existValidatePitchDeckURL(uniqueProjectName).then((res) => {
            if (res.data === false) {
                onSuccess();
                setIsNextStepDisabled(false);
                return true
            } else {
                onFailure();
                setIsNextStepDisabled(true);
                return false
            }
        });
    };

    const firstStepChanged = () => {
        return firstStepLastData.current.projectTitle !== projectTitle
            || firstStepLastData.current.uniqueProjectName !== uniqueProjectName;
    }

    const changeProjectTitle = (event) => {
        setProjectTitle(event.target.value);
    }

    const changeUniqueProjectName = (event) => {
        setUniqueProjectName(event.target.value);
    }

    const validateBlock = () => {
        if (validation('name', projectTitle) && validation('name', uniqueProjectName))
            return true;
        // TODO: This if needs api
        // if (validation('name', projectTitle) && isAvailablePitchDeckURL())
        // 	return true;
        return false;
    }

    const onBlurCreateFirstPart = () => {
        if (unlockedStep2 && !pitchDeckUniqueToken && firstStepChanged()) {
            firstStepLastData.current.projectTitle = projectTitle;
            firstStepLastData.current.uniqueProjectName = uniqueProjectName;
            setLoading(true);

            createFirstStep(projectTitle, uniqueProjectName)
                .then(value => {
                    //TODO dlaczego pierwszy argument jest stringiem i od czego zalezy jego nazwa. Gdy damy pierwszy argument byle jaki
                    // setter nie zadziala, zapytaj dlaczego
                    setFieldValue("pitchDeckUniqueToken", value.data.pitchDeckToken);

                    setPitchDeckUrl('uniqueProjectName',uniqueProjectName);
                    setLoading(false);
                })
                .catch(reason => {
                    setLoading(false);
                })
        } else if (unlockedStep2 && pitchDeckUniqueToken &&  firstStepChanged()) {
            firstStepLastData.current.projectTitle = projectTitle;
            firstStepLastData.current.uniqueProjectName = uniqueProjectName;
            setLoading(true);

            updateFirstStep(pitchDeckUniqueToken, projectTitle, uniqueProjectName)
                .then(value => {
                    setLoading(false);
                })
                .catch(reason => {
                    setLoading(false);
                })
        }
    }

    useEffect(() => {
        if (projectTitle && uniqueProjectName) {
            setUnlockedStep2(validateBlock());
        }
    }, [projectTitle, uniqueProjectName]);

    return <Grid container spacing={2} marginTop={4}>
        <Grid item xs={12} sm={6}>
            <FormLabel id='projectTitle' className='field__label'>
                Imię
            </FormLabel>
            <TextField
                autoComplete='given-name'
                name='projectTitle'
                required
                fullWidth
                id='projectTitle'
                placeholder='Podaj swoje imię'
                value={projectTitle}
                onChange={changeProjectTitle}
                onBlur={onBlurCreateFirstPart}
                disabled={loading}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormLabel id='projectName' className='field__label'>
               Nazwisko
            </FormLabel>
            <TextField
                autoComplete='given-name'
                name='uniqeProjectName'
                required
                fullWidth
                id='projectName'
                placeholder='Podaj swoje nazwisko'
                value={uniqueProjectName}
                onChange={changeUniqueProjectName}
                disabled={loading}
            />
        </Grid>
    </Grid>
}

export default StepOne;