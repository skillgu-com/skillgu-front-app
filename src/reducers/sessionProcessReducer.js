const initialState = {
    sessionState: {
        mentorID: null,
        sessionID: null,
        name: null,
        time: null,
        sessionPrice: null,
    }
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SESSIONS_MENTOR_ID':
            return {
                ...state,
                sessionState: {
                    mentorID: action.payload.mentorID,
                    sessionID: action.payload.sessionID,
                    name: action.payload.name,
                    time: action.payload.time,
                    sessionPrice: action.payload.sessionPrice,
                    description: action.payload.description,
                }
            }
        case 'SET_SESSIONS_UPDATE':
            return {
                ...state,
                sessionState: {
                    ...state.sessionState,
                    sessionID: action.payload.sessionID,
                    name: action.payload.name,
                    time: action.payload.time,
                    sessionPrice: action.payload.sessionPrice,
                    description: action.payload.description,
                }
            }
        default:
            return state;
    }
};

export default sessionReducer;
