// rootReducer.js
import {combineReducers} from 'redux';
import connectionProcessReducer from "./connectionProcessReducer";
import userSettingReducer from "./userSettingReducer";
import bookSessionReducer from "./bookSessionProcessReducer";
import sessionIDReducer from "./calendarProcessReducer";
import { termsReducer } from './terms';
import { mentorsReducer } from './mentors';
import { bookingReducer } from './booking';
import { chatReducer } from './chat';
import {authReducer} from "./auth/authReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    connectionProcess: connectionProcessReducer,
    userSetting: userSettingReducer,
    book: bookSessionReducer,
    sessionIDStep: sessionIDReducer,
    terms: termsReducer,
    mentors: mentorsReducer,
    booking: bookingReducer,
    chat: chatReducer,
    // Add other reducers if you have them
});

export default rootReducer;

