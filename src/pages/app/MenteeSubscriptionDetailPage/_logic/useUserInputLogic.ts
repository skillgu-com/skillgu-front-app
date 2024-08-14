import {CalendarEvent} from "src/components/WeeklyCalendarPicker/WeeklyCalendarPicker";
import {useBookingReducer} from "src/reducers/booking";
import {useCallback, useRef} from "react";
import {useSnackbar} from "notistack";
import regexPattern from "src/helpers/regexPattern";

const useUserInputLogic = (availableSessionSlots: number) => {
    const [bookingState, dispatchBookingAction] = useBookingReducer();
    const refToScrollOrError = useRef<HTMLElement>(null);

    const isSlotsLimitReached = useCallback((selectedSlotsLength: number) => availableSessionSlots && selectedSlotsLength >= availableSessionSlots, [availableSessionSlots]);
    const {enqueueSnackbar} = useSnackbar();

    const onEventClick = (event: CalendarEvent) => {
        const prevState = bookingState.slots;
        let slots = [];

        if (prevState.some(({id}) => id === event.id)) {
            // Removing
            slots = prevState.filter(({id}) => id !== event.id);
        } else {
            if (isSlotsLimitReached(prevState.length)) {
                // Limit reached
                enqueueSnackbar('Osiągnięto limit wybranych slotów', {variant: 'warning'});
                return;
            }
            // Adding
            slots = [...prevState, {date: event.start, id: event.id}];
        }

        dispatchBookingAction({type: 'SLOTS_SELECT', payload: {slots}})
    }

    const validate = () => {
        let isValid = true;

        if (!bookingState.customerEmail) {
            dispatchBookingAction({type: 'SET_EMAIL', payload: {customerEmailError: 'Email jest wymagany'}})
            isValid = false;
        } else if (!regexPattern.email.test(bookingState.customerEmail)) {
            dispatchBookingAction({type: 'SET_EMAIL', payload: {customerEmailError: 'Email jest niepoprawny'}})
            isValid = false;
        }


        if (!bookingState.customerPhone) {
            dispatchBookingAction({type: 'SET_PHONE', payload: {customerPhoneError: 'Numer telefonu jest wymagany'}})
            isValid = false;
        } else if (!regexPattern.phone.test(bookingState.customerPhone)) {
            dispatchBookingAction({type: 'SET_PHONE', payload: {customerPhoneError: 'Numer telefonu jest niepoprawny'}})
            isValid = false;
        }

        if (!bookingState.customerMessage) {
            dispatchBookingAction({type: 'SET_MESSAGE', payload: {customerMessageError: 'Wiadomość jest wymagana'}})
            isValid = false;
        }

        if (bookingState.slots.length !== availableSessionSlots) {
            dispatchBookingAction({type: 'SLOTS_ERROR', payload: {slotsError: 'Wybierz wszystkie dostępne sloty'}})
            isValid = false;
        }

        return isValid;
    }

    const onSubmit = () => {
        const isValid = validate();
        if (isValid) {
            alert({
                email: bookingState.customerEmail,
                phone: bookingState.customerPhone,
                topic: bookingState.customerMessage
            })
        } else if (refToScrollOrError.current) {
            refToScrollOrError.current.scrollIntoView({behavior: 'smooth', inline: 'start', block: 'start'});
        }
    }

    return { onSubmit, onEventClick, refToScrollOrError }

}

export  default useUserInputLogic;