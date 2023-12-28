import {FormControl, FormLabel, Grid, MenuItem, Select, Slider, TextField,} from '@mui/material';
import {useState} from "react";
import HeroHeader from "../../../component/HeroHeader";
import AppLayout from "../../../component/AppLayout";

function valuetext(value) {
    return `${value}°C`;
}

const minDistance = 10;

const CreateMentorPlan = (props) => {
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
        <AppLayout>
            <HeroHeader
                title='Stwórz plan mentoringu'
            />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormLabel id='localization' className='field__label'>
                        Wybierz lokalizację PP
                    </FormLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId='localization'
                            id='localization__field'
                            required
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                            value={props.projectLocalization}
                            onChange={props.handleProjectLocalization}>
                            <MenuItem value={0} disabled>
                                Lokalizacja
                            </MenuItem>
                            <MenuItem value={'CRACOW'}>KRAKÓW</MenuItem>
                            <MenuItem value={'GDYNIA'}>GDYNIA</MenuItem>
                            <MenuItem value={'WARSAW'}>WARSZAWA</MenuItem>
                            <MenuItem value={'WROCLAW'}>WROCLAW</MenuItem>
                            <MenuItem value={'ZAKOPANE'}>ZAKOPANE</MenuItem>
                            <MenuItem value={'POLAND'}>CAŁA POLSKA</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormLabel id='industry' className='field__label'>
                        Wybierz Branżę
                    </FormLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId='industry'
                            id='industry__field'
                            required
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                            value={props.projectIndustry}
                            onChange={props.handleProjectIndustry}>
                            <MenuItem value={0} disabled>
                                Branża
                            </MenuItem>
                            <MenuItem value={'GASTRONOMY'}>Gastronomia</MenuItem>
                            <MenuItem value={'IT'}>IT</MenuItem>
                            <MenuItem value={'REAL_ESTATE'}>NIERUCHOMOŚCI</MenuItem>
                            <MenuItem value={'AUTOMOTIVE'}>MOTORYZACJA</MenuItem>
                            <MenuItem value={'INDUSTRY'}>PRZEMYSŁ</MenuItem>
                            <MenuItem value={'FARMING'}>ROLNICTWO</MenuItem>
                            <MenuItem value={'TRANSPORT'}>TRANSPORT</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormLabel id='rent-form__field' className='field__label'>
                        Jakim typem inwestora/wspólnika chcesz zostać?
                    </FormLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId='rent-form'
                            id='rent-form__field'
                            required
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                            value={props.typeOfInvestor}
                            onChange={props.handleTypeOfInvestor}>
                            <MenuItem value={'PASSIVE'}>Inwestor (pasywny)</MenuItem>
                            <MenuItem value={'ACTIVE'}>Wspólnik (aktywny)</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormLabel id='start-data' className='field__label'>
                        W jakim przedziale czasowym szukasz inwestycji?
                    </FormLabel>
                    <TextField
                        autoComplete='given-name'
                        name='start-data'
                        required
                        fullWidth
                        id='start-data'
                        placeholder='12.02.2022'
                        type={'date'}
                        autoFocus
                        value={props.startDate}
                        onChange={props.handleStartDate}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormLabel id='rent-form__field' className='field__label'>
                        Jakiego projektu szukasz?
                    </FormLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId='rent-form'
                            id='rent-form__field'
                            required
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                            value={props.projectStage}
                            onChange={props.handleProjectStage}>
                            <MenuItem value={0} disabled>
                                Wybierz na jakim etapie inwestycji jesteś
                            </MenuItem>
                            <MenuItem value={'EXISTING_BUSINESS'}>
                                Szukam gotowego biznesu, chce go rozbudować, doinwestować
                            </MenuItem>
                            <MenuItem value={'NEW_BUSINESS'}>
                                Mam kapitał, chce zainwestować, wejść jako inwestor.
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormLabel id='time__field' className='field__label'>
                        Interesuje mnie ROI na poziomie?
                    </FormLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId='time'
                            id='time__field'
                            required
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                            value={props.roi}
                            onChange={props.handleRoi}>
                            <MenuItem value={0} disabled>
                                Szacowany czas zwrotu
                            </MenuItem>
                            <MenuItem value={1}>1% - 2%</MenuItem>
                            <MenuItem value={2}>2% - 3%</MenuItem>
                            <MenuItem value={3}>3% - 5%</MenuItem>
                            <MenuItem value={4}>5% - 8%</MenuItem>
                            <MenuItem value={5}>8% - 13%</MenuItem>
                            <MenuItem value={6}>13% - 21%</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormLabel id='time__field' className='field__label'>
                        Interesuje mnie czas zwrotu na poziomie?
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
                            <MenuItem value={1}>do 1 roku</MenuItem>
                            <MenuItem value={2}>do 2 lat</MenuItem>
                            <MenuItem value={3}>do 3 lat</MenuItem>
                            <MenuItem value={4}>do 4 lat</MenuItem>
                            <MenuItem value={5}>do 5 lat</MenuItem>
                            <MenuItem value={6}>do 6 lat</MenuItem>
                            <MenuItem value={7}>do 7 lat</MenuItem>
                            <MenuItem value={8}>do 8 lat</MenuItem>
                            <MenuItem value={9}>do 9 lat</MenuItem>
                            <MenuItem value={10}>do 10 lat</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormLabel id='rent-form__field' className='field__label'>
                        Forma organizacyjno prawna
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
                            <MenuItem value={0} disabled>
                                Wybierz typ działalności
                            </MenuItem>
                            <MenuItem value={0}>SPÓŁKA CICHA</MenuItem>
                            <MenuItem value={1}>SPÓŁKA JAWNA</MenuItem>
                            <MenuItem value={2}>SPÓŁKA KOMANDYTOWA</MenuItem>
                            <MenuItem value={3}>SPÓŁKA KOMANDYTOWO AKCYJNA</MenuItem>
                            <MenuItem value={4}>SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</MenuItem>
                            <MenuItem value={5}>SPÓŁKA AKCYJNA</MenuItem>
                            <MenuItem value={6}>PROSTA SPÓŁKA AKCYJNA</MenuItem>
                            <MenuItem value={7}>KONSORCJUM</MenuItem>
                            <MenuItem value={5}>TERAZ NIE DOTYCZY</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormLabel id='rent-form__field' className='field__label'>
                        Forma powiadomień o dopasowanych ofertach
                    </FormLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId='rent-form'
                            id='rent-form__field'
                            required
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                            value={props.typeOfNotification}
                            onChange={props.handleTypeOfNotification}>
                            <MenuItem value={0} disabled>
                                Wybierz formę powiadomień
                            </MenuItem>
                            <MenuItem value={1}>EMAIL</MenuItem>
                            <MenuItem value={2}>APLIKACJA</MenuItem>
                            <MenuItem value={3}>SMS</MenuItem>
                            <MenuItem value={4}>WSZYSTKO</MenuItem>
                            <MenuItem value={5}>WYŁĄCZONE</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormLabel id='rent-form__field' className='field__label'>
                        Częstotliwość powiadomień o nowych dopasowaniach
                    </FormLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId='rent-form'
                            id='rent-form__field'
                            required
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                            value={props.frequencyOfNotification}
                            onChange={props.handleFrequencyOfNotification}>
                            <MenuItem value={0} disabled>
                                Wybierz częstotliwość powiadomień
                            </MenuItem>
                            <MenuItem value={1}>Powiadom przy najwyższym dopasowaniu</MenuItem>
                            <MenuItem value={2}>Powiadom przy dopasowaniu</MenuItem>
                            <MenuItem value={3}>Powiadom co 12 godzin</MenuItem>
                            <MenuItem value={4}>Powiadom co 24 godzin</MenuItem>
                            <MenuItem value={5}>Powiadom raz w tygodniu</MenuItem>
                            <MenuItem value={6}>Wyłącz powiadomienia</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
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
                            value={props.businessInsurance}
                            onChange={props.handleBusinessInsurance}>
                            <MenuItem value={0} disabled>
                                Wybierz typ działalności
                            </MenuItem>
                            <MenuItem value={1}>UMOWA</MenuItem>
                            <MenuItem value={2}>UMOWA NOTARIALNA</MenuItem>
                            <MenuItem value={3}>NIERUCHOMOŚĆ</MenuItem>
                            <MenuItem value={4}>WEKSEL</MenuItem>
                            <MenuItem value={5}>TERAZ NIE DOTYCZY</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2} marginTop={3} marginBottom={5}>
                <Grid item xs={12} md={6}>
                    <FormLabel id='pratner-description' className='field__label'>
                        Jakim kapitałem dysponujesz?
                    </FormLabel>
                    <div className='pitchdeck__budget'>{props.companyAssetMinMax} zł</div>
                    <div className='d-flex align-items-center'>
                        <p className='slider__description'>1000 zł</p>
                        <Slider
                            getAriaLabel={() => 'Minimum distance'}
                            value={props.companyAssetMinMax}
                            onChange={props.handleCompanyAssetMinMax}
                            valueLabelDisplay='auto'
                            getAriaValueText={valuetext}
                            disableSwap
                            min={1000}
                            max={100000}
                            step={1000}
                        />
                        <p className='slider__description'>100 000PLN</p>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormLabel id='pratner-description' className='field__label'>
                        Minimalny próg wejścia
                    </FormLabel>
                    <div className='pitchdeck__budget'>{props.minimumCompanyAsset} zł</div>
                    <div className='d-flex align-items-center'>
                        <p className='slider__description'>1000 zł</p>
                        <Slider
                            getAriaLabel={() => 'Minimum distance'}
                            value={props.minimumCompanyAsset}
                            onChange={props.handleMinimumCompanyAsset}
                            valueLabelDisplay='auto'
                            getAriaValueText={valuetext}
                            disableSwap
                            min={1000}
                            max={props.companyAssetMinMax}
                            step={1000}
                        />
                        <p className='slider__description'>{props.companyAssetMinMax}PLN</p>
                    </div>
                </Grid>


            </Grid>

        </AppLayout>
    );
};

export default CreateMentorPlan;
