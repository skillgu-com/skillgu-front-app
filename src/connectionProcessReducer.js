import authReducer from "./authReducer";

const initialState = {
    sessionStep: {
        mentorID: '',
        sessionName: '',
        sessionDescription: '',
        sessionPrice: '',
        sessionMinutes: '',
        sessionTypeID: ''
    }

}

const connectionProcessReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEXT_STEP_IN_SESSION_CREATION':
            return {
                ...state,
                sessionStep: {
                    mentorID: action.payload.mentorID,
                    sessionName: action.payload.sessionName,
                    sessionDescription: action.payload.sessionDescription,
                    sessionPrice: action.payload.sessionPrice,
                    sessionMinutes: action.payload.sessionMinutes,
                    sessionTypeID: action.payload.sessionTypeID
                },
            };
        case 'SESSION_DETAILS_STEP_IN_SESSION_CREATION':
            return {
                ...state,
                sessionStep: {
                    // ...state.sessionStep,
                    // sessionDescription: action.payload.sessionDescription,
                    // sessionPrice: action.payload.sessionPrice,
                    // sessionMinutes: action.payload.sessionMinutes
                }
            }

        default:
            return state;
    }
};


export default connectionProcessReducer;

