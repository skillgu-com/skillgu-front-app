import mentorRegisterInitialState from "./constants";
import {MentorRegisterReducerAction, MentorRegisterReducerState} from "./types";
import exhaustiveGuard from "../../helpers/exhaustiveGuard";

const mentorRegisterReducer = (
    state = mentorRegisterInitialState,
    action: MentorRegisterReducerAction
): MentorRegisterReducerState => {
    switch (action.type) {
        case 'COMMIT_REGISTER_INFO':
            return {
                ...state,
                step: 1,
                formData: {...state.formData, ...action.payload},
            };
        case 'COMMIT_ABOUT_INFO':
            return {
                ...state,
                step: 2,
                formData: {...state.formData, ...action.payload},
            };
        case 'COMMIT_PROFILE_INFO':
            return {
                ...state,
                step: 3,
                formData: {...state.formData, ...action.payload},
            };
        case 'COMMIT_PORTFOLIO_INFO':
            return {
                ...state,
                step: 4,
                formData: {...state.formData, ...action.payload},
            };
        case 'SET_USER_ID':
            return {
                ...state,
                userId: action.payload,
            };
        case 'FLUSH_STATE': {
            return mentorRegisterInitialState;
        }
        default:
            return exhaustiveGuard(action);
    }
}

export default mentorRegisterReducer;