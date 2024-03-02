const initialState = {
    bookSessionState: {
        sessionID: null,
        name: null,
        time: null,
        sessionPrice: null,
        description: null,
        mentorID: null,
        calendarEventId: null,
        term: null,
    }
}


const bookSessionReducer = (state = initialState, action) => {
        switch (action.type) {
            case 'SET_SESSION_IN_FORM':
                return {
                    ...state,
                    bookSessionState: {
                        sessionID: action.payload.sessionID,
                        name: action.payload.name,
                        time: action.payload.time,
                        sessionPrice: action.payload.sessionPrice,
                        description: action.payload.description,
                        mentorID: action.payload.mentorID,

                    }
                }
            case 'UPDATE_BOOK_FORM':
                return {
                    ...state,
                    bookSessionState: {
                        ...state.bookSessionState,
                        calendarEventId: action.payload.calendarEventId,
                        term: action.payload.term,
                    }
                }

            default:
                return state;
        }
    };

export default bookSessionReducer;

