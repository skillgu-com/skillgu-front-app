const initialState = {
    calendarStep: {
        eventName: '',
        location: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        timeZone: ''

    }
}

const calendarProcessReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CALENDAR_GOOGLE_CREATION':
            return {
                ...state,
                calendarStep: {
                    eventName: action.payload.eventName,
                    location: action.payload.location,
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate,
                    startTime: action.payload.startTime,
                    endTime: action.payload.endTime,
                    timeZone: action.payload.timeZone

                },
            };

        default:
            return state;
    }
};


export default calendarProcessReducer;

