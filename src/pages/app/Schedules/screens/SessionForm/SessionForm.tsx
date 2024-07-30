import React, {useEffect, useMemo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
// Components
// Types
import {Tag} from '@customTypes/tags';
// Styles
import styles from './SessionForm.module.scss';
import {fetchAllSchedules} from "@services/scheduleService";
import Container from "../../../../../components/Container/Container";
import NavTitle from "../../../../../components/typography/NavTitle/NavTitle";
import {
    createSession,
    SessionFormInput, getSingleSession
} from "@services/session/sessionService";
import {useForm} from "react-hook-form";
import {Button, Tooltip} from "@mui/material";
import FormInputText from "../../../../../components/_form/FormInputText/FormInputText";
import FormInputSelect from "../../../../../components/_form/FormInputSelect/FormInputSelect";
import {DropdownOption} from "@customTypes/dropdownOption";
import Typography from "@mui/material/Typography";
import resolvePolishNumeralFactory from "../../../../../helpers/resolvePolishNumeralFactory";
import {useSnackbar} from "notistack";
import {useQuery} from "@tanstack/react-query";
import getSessionTypesDictionary from "@services/dictionaries/sessionTypesDictionary/sessionTypesDictionary";
import getSessionCategoriesDictionary
    from "@services/dictionaries/sessionCategoriesDictionary/sessionCategoriesDictionary";
import {MentorCategoryT} from "@services/dictionaries/sessionCategoriesDictionary/sessionCategoriesDictionary.data";
import getSessionDescriptionTemplatesDictionary
    from "@services/dictionaries/sessionDescriptionTemplatesDictionary/sessionDescriptionTemplatesDictionary";

interface DirtySessionFormInput {
    name: string;
    price: string | number;
    type: string;
    category: MentorCategoryT | '';
    scheduleId: string | number;
    description: string;
}

const defaultValues: DirtySessionFormInput = {
    name: '',
    price: '',
    type: '',
    category: '',
    scheduleId: '',
    description: ''
};

const maxDescriptionCharacters = 1000;
const minDescriptionCharacters = 30;


const getScheduleNamesQuery = async (): Promise<DropdownOption[]> => {
    const {data} = await fetchAllSchedules();
    return data.map((element) => ({
        value: element.id,
        label: element.scheduleName
    }));
}

export const getSingleSessionQueryOptions = (sessionId: string) => ({
    queryKey: ['single-session', sessionId],
    queryFn: async (): Promise<SessionFormInput> => {
        const sessionData = await getSingleSession(sessionId)
        return {
            name: sessionData.sessionName,
            price: sessionData.sessionPrice,
            type: sessionData.sessionType,
            category: sessionData.sessionCategory,
            scheduleId: sessionData.scheduleID,
            description: sessionData.sessionDescription
        }
    },
})

const SessionForm = () => {
    const {sessionId} = useParams<{ sessionId: string }>();
    const navigate = useNavigate();

    const {data: initialData} = useQuery({
        ...getSingleSessionQueryOptions(sessionId as string),
        enabled: !!sessionId
    });

    const {enqueueSnackbar} = useSnackbar()
    const isEdit = useMemo(() => !!sessionId, [sessionId]);

    const onSubmit = async (data: SessionFormInput) => {
        try {
            if (isEdit) {
                alert('ACTION on EDIT');
                enqueueSnackbar('Sesja została zaktualizowana', {variant: 'success'});
                navigate('/schedules');
            } else {
                await createSession(data);
                enqueueSnackbar('Sesja została utworzona', {variant: 'success'});
                navigate('/schedules');
            }
        } catch (error) {
            enqueueSnackbar('Wystąpił błąd podczas zapisywania sesji', {variant: 'error'});
        }
    }

    const {
        control,
        handleSubmit,
        formState,
        watch,
        reset,
        setValue,
        getValues
    } = useForm<DirtySessionFormInput, void, SessionFormInput>({
        defaultValues,
    });
    const selectedCategory = watch('category');
    const selectedType = watch('type');
    useEffect(() => {
        // Clear type when Category changes
        setValue('type', '');
    }, [selectedCategory]);

    useEffect(() => {
        // Set description template when selected Type changes
        const shouldOverrideDescription = !formState.dirtyFields.description || getValues('description') === '';
        console.log(shouldOverrideDescription)
        console.log(selectedType)
        if (selectedType && shouldOverrideDescription) {
            setValue('description', getSessionDescriptionTemplatesDictionary(selectedType));
        }
    }, [selectedType, formState.dirtyFields.description]);

    useEffect(() => {
        if (initialData) reset(initialData);
    }, [initialData]);

    const description = watch('description');
    const descriptionFeedback = useMemo(() => {
        const descriptionLength = description.length;
        const getPolishNumeral = resolvePolishNumeralFactory('znak', 'znaki', 'znaków');

        if (descriptionLength === 0) {
            return `Opis powinien mieć między ${minDescriptionCharacters} a ${maxDescriptionCharacters} ${getPolishNumeral(maxDescriptionCharacters)}`;
        }

        if (descriptionLength < minDescriptionCharacters) {
            const count = minDescriptionCharacters - descriptionLength;
            return `Brakuje jeszcze ${count} ${getPolishNumeral(count)}`;
        }

        if (descriptionLength > maxDescriptionCharacters) {
            const count = descriptionLength - maxDescriptionCharacters;
            return `Przekroczyłeś limit znaków o ${count}`;
        }

        const count = maxDescriptionCharacters - descriptionLength;
        return `Pozostało ${count} ${getPolishNumeral(count)}`;
    }, [description])

    return (
        <Container as={Tag.Section} classes={styles.wrapper}>
            <NavTitle>{isEdit ? 'Edytuj sesję' : 'Utwórz nową sesję'}</NavTitle>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <FormInputText<DirtySessionFormInput>
                    name='name'
                    control={control}
                    formState={formState}
                    label='Nazwa'
                    inputProps={{placeholder: 'nazwa sesji'}}
                    controllerProps={{rules: {required: 'Nazwa jest wymagana'}}}
                />
                <FormInputText<DirtySessionFormInput>
                    name='price'
                    control={control}
                    formState={formState}
                    inputProps={{type: 'number', placeholder: '100'}}
                    label='Cena za sesję [zł]'
                    controllerProps={{
                        rules: {
                            required: 'Cena jest wymagana',
                            min: {value: 0, message: 'Cena nie może być ujemna'}
                        }
                    }}
                />
                <FormInputSelect
                    label='Kategoria spotkania'
                    name='category'
                    control={control}
                    formState={formState}
                    getOptions={getSessionCategoriesDictionary}
                    inputProps={{placeholder: 'Wybierz kategorie spotkania'}}
                    controllerProps={{rules: {required: 'Kategoria spotkania jest wymagany'}}}
                />
                <Tooltip title={!selectedCategory ? 'Wybierz kategorię, aby określić typ spoktania.' : ''}>
                    <span>
                        <FormInputSelect
                            label='Typ spotkania'
                            name='type'
                            control={control}
                            formState={formState}
                            // Options are bind to selected Category value
                            getOptions={() => getSessionTypesDictionary(selectedCategory)}
                            inputProps={{placeholder: 'Wybierz typ spotkania', disabled: !selectedCategory}}
                            controllerProps={{rules: {required: 'Typ spotkania jest wymagany'}}}
                        />
                    </span>
                </Tooltip>
                <FormInputSelect
                    label='Harmonogram'
                    name='scheduleId'
                    control={control}
                    formState={formState}
                    getOptions={getScheduleNamesQuery}
                    inputProps={{placeholder: 'Wybierz harmonogram'}}
                    controllerProps={{rules: {required: 'Harmonogram jest wymagany'}}}
                />
                <FormInputText<DirtySessionFormInput>
                    name='description'
                    control={control}
                    formState={formState}
                    inputProps={{multiline: true, rows: 4, placeholder: 'Opisz sesję...'}}
                    label='Opis sesji'
                    controllerProps={{
                        rules: {
                            required: 'Opis sesji jest wymagany',
                            maxLength: {
                                value: maxDescriptionCharacters,
                                message: `Maksymalna liczba znaków to ${maxDescriptionCharacters}`
                            },
                            minLength: {
                                value: minDescriptionCharacters,
                                message: `Minimalna liczba znaków to ${minDescriptionCharacters}`
                            }
                        }
                    }}
                />
                <Typography variant='caption' color='base.60'>{descriptionFeedback}</Typography>
                <Button fullWidth type='submit' variant='contained'
                        disabled={!formState.isValid && formState.isSubmitted}>
                    {isEdit ? 'Zapisz zmiany' : 'Utwórz sesję'}
                </Button>
            </form>
        </Container>
    );
};

export default SessionForm;
