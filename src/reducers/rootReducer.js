// rootReducer.js
import {combineReducers} from 'redux';
import authReducer from "./authReducer";
import connectionProcessReducer from "./connectionProcessReducer";
import userSettingReducer from "./userSettingReducer";
import bookSessionReducer from "./bookSessionProcessReducer";
import sessionIDReducer from "./calendarProcessReducer";
import { termsReducer } from './terms';
import { mentorsReducer } from './mentors';
import { bookingReducer } from './booking';
import { chatReducer } from './chat';

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

