const initialState = {
    bookSessionState: {
        mentorID: null,
        sessionTypeID: null,
        sessionName: null,
        sessionPrice: null,
        calendarEventId: null
    }
};


const bookSessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BOOK_SESSION':
            return {
                ...state,
                bookSessionState: {
                    mentorID: action.payload.mentorID,
                    sessionTypeID: action.payload.sessionTypeID,
                    sessionName: action.payload.sessionName,
                    sessionPrice: action.payload.sessionPrice,
                    calendarEventId: action.payload.calendarEventId

                }
            }
        case 'UPDATE_BOOK_SESSION':
            return {
                ...state,
                bookSessionState: {
                    ...state.sessionState,
                }
            }
        default:
            return state;
    }
};

export default bookSessionReducer;
