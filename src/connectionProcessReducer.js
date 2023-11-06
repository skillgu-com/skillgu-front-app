import authReducer from "./authReducer";

const initialState = {
    sessionStep: {
        mentorID: '',
        sessionName: '',
        sessionDescription: ''
    }

}

const connectionProcessReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEXT_STEP_IN_SESSION_CREATION':
            console.log(action)
            return {
                ...state,
                sessionStep: {
                    mentorID: action.payload.mentorID,
                    sessionName: action.payload.sessionName
                },
            };
        case 'SESSION_DETAILS_STEP_IN_SESSION_CREATION':
            console.log(action)
            return {
                ...state,
                sessionStep: {
                    ...state.sessionStep,
                    sessionDescription: action.payload.sessionDescription
                }
            }

        default:
            return state;
    }
};


export default connectionProcessReducer;
