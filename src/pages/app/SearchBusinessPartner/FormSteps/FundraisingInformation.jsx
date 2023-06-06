import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import {
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    FormControl,
    MenuItem,
    Grid,
    Slider,
    TextareaAutosize,
} from '@mui/material';

function valuetext(value) {
    return `${value}°C`;
}

const minDistance = 10;

const FundraisingInformation = (props) => {

    const [value1, setValue1] = useState([0, 10000000]);

    const handleChange1 = (_event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };

    return (
        <Grid>
            <Grid item xs={12} md={6}>
                <FormLabel id='rent-form__field' className='field__label'>
                    Forma zabezpieczenia
                </FormLabel>
                <FormControl fullWidth>
                    <Select
                        labelId='rent-form'
                        id='rent-form__field'
                        required
                        displayEmpty
                        inputProps={{'aria-label': 'Without label'}}
                        value={props.financialProtection}
                        onChange={props.handleFinancialProtection}>
                        <MenuItem value={""} disabled>Wybierz formę zabezpieczenia</MenuItem>
                        <MenuItem value={"UDZIALY_W_DZIALALNOSCI"}>Udziały w działalności</MenuItem>
                        <MenuItem value={"NIERUCHOMOSCI"}>Nieruchomość</MenuItem>
                        <MenuItem value={"WEKSEL"}>Weksel</MenuItem>
                        <MenuItem value={"UMOWA_NOTARIALNA"}>Umowa notarialna</MenuItem>
                        <MenuItem value={"OTHER_SECURED"}>Inne zabezpieczenie</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormLabel id='rent-form__field' className='field__label'>
                    Typ działalności
                </FormLabel>
                <FormControl fullWidth>
                    <Select
                        labelId='rent-form'
                        id='rent-form__field'
                        required
                        displayEmpty
                        inputProps={{'aria-label': 'Without label'}}
                        value={props.businessType}
                        onChange={props.handleBusinessType}>
                        <MenuItem value={0} disabled>Wybierz typ działalności
                        </MenuItem>
                        <MenuItem value={0}>SPÓŁKA CICHA</MenuItem>
                        <MenuItem value={1}>SPÓŁKA JAWNA</MenuItem>
                        <MenuItem value={2}>SPÓŁKA KOMANDYTOWA</MenuItem>
                        <MenuItem value={3}>SPÓŁKA KOMANDYTOWO AKCYJNA</MenuItem>
                        <MenuItem value={4}>SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</MenuItem>
                        <MenuItem value={5}>SPÓŁKA AKCYJNA</MenuItem>
                        <MenuItem value={6}>PROSTA SPÓŁKA AKCYJNA</MenuItem>
                        <MenuItem value={7}>KONSORCJUM</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormLabel id='rate-of-return' className='field__label'>
                    Szacowany procent zwrotu
                </FormLabel>
                <TextField
                    autoComplete='given-name'
                    name='rate-of-return'
                    required
                    fullWidth
                    id='rate-of-return'
                    placeholder='10%'
                    autoFocus
                    value={props.roi}
                    onChange={props.handleRoi}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormLabel id='time__field' className='field__label'>
                    Czas zwrotu
                </FormLabel>
                <FormControl fullWidth>
                    <Select
                        labelId='time'
                        id='time__field'
                        required
                        displayEmpty
                        inputProps={{'aria-label': 'Without label'}}
                        value={props.paybackTime}
                        onChange={props.handlePaybackTime}>
                        <MenuItem value={0} disabled>
                            Szacowany czas zwrotu
                        </MenuItem>
                        <MenuItem value={1}>1 rok</MenuItem>
                        <MenuItem value={2}>2 lata</MenuItem>
                        <MenuItem value={3}>3 lata</MenuItem>
                        <MenuItem value={4}>4 lata</MenuItem>
                        <MenuItem value={5}>5 lata</MenuItem>
                        <MenuItem value={6}>6 lata</MenuItem>
                        <MenuItem value={7}>7 lata</MenuItem>
                        <MenuItem value={8}>8 lata</MenuItem>
                        <MenuItem value={9}>9 lata</MenuItem>
                        <MenuItem value={10}>10 lata</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default FundraisingInformation;
